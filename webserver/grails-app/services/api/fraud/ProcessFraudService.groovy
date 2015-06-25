package api.fraud

import api.fraud.exceptions.NotFoundException
import grails.transaction.Transactional

import javax.servlet.http.HttpServletResponse

@Transactional
class ProcessFraudService {

    def maxipublicaApiService
    def maskFraudService
    def valuesFraudService

    def processVehicle (def params){

        if(!params.vehicleId){
            throw new NotFoundException('You most provider the vehicleId')
        }
        def dataVehicle = maxipublicaApiService.getDataVehicle(params.vehicleId)

        if(dataVehicle.status == HttpServletResponse.SC_OK){


            searchDataInVehicle(dataVehicle.data, searchMaksFraud())
            //dataVehicle.data

        }else{
            dataVehicle.data
        }

    }

    def searchDataInVehicle(def dataVehicle, def mask){


        Map coincidenceMap = [:]
        def coincidence = []


        def name            = dataVehicle.dealer.seller_contact.name ? dataVehicle.dealer.seller_contact.name : ''
        def email           = dataVehicle.dealer.seller_contact.email ? dataVehicle.dealer.seller_contact.email : ''
        def contactPhone    = dataVehicle.dealer.seller_contact.phone.phone_number ? dataVehicle.dealer.seller_contact.phone.phone_number : ''
        def password        = ''
        def domain          = getDomainEmail(email)
        def priceVehicle    = dataVehicle.price ? dataVehicle.price : ''
        def versionId       = dataVehicle.vehicle.version.category_id ? dataVehicle.vehicle.version.category_id : ''
        def ip              = ''
        //currencyType    = dataVehicle.attributes.currencies.id ? dataVehicle.attributes.currencies.id :''

        mask.each{
            switch (it.parameter_name){
                case 'name':
                    if(searchValue(it.parameter_name, name, it.score) > 0){
                        coincidence << [parameter_name:it.parameter_name, value:name, score:it.score]
                    }
                    break
                case 'email':
                    if(searchValue(it.parameter_name, email, it.score) > 0 ){
                        coincidence << [parameter_name:it.parameter_name, value:email, score:it.score]
                    }
                    break
                case 'password':
                    if(searchValue(it.parameter_name, password, it.score) > 0){
                        coincidence << [parameter_name: it.parameter_name, value:passsword, score: it.score]
                    }
                    break
                case 'dominio':
                    if(searchValue(it.parameter_name, domain, it.score) > 0){
                        coincidence << [parameter_name: it.parameter_name, value:domain, score:it.score]
                    }
                    break
                case 'telefono':
                    if(searchValue(it.parameter_name, contactPhone, it.score) > 0){
                        coincidence << [parameter_name: it.parameter_name, value: contactPhone, score: it.score]
                    }
                    break
                case 'ip':
                    if(searchValue(it.parameter_name, ip, it.score) > 0 ){
                        coincidence << [parameter_name: it.parameter_name, value: ip, score:it.score]
                    }
                    break
                default :
                    break
            }
        }

        def difPorcentPrice = getDiffPriceGDP(versionId, priceVehicle)
        if(difPorcentPrice <= -15) {  //TODO debemos agregar la diferencia de porcentaje en la configuracion
            coincidence << [parameter_name: 'precio', value: difPorcentPrice, score:60]
        }
        def averangeFraud = getAverage(mask, coincidence)

        coincidenceMap.vehicle_id   = dataVehicle.id
        coincidenceMap.averange     = averangeFraud
        coincidenceMap.coincidence  = []

        coincidence.each{

            coincidenceMap.coincidence << [parameter_name: it.parameter_name, value: it.value]

        }

        if(averangeFraud > 0){
            // TODO hacemos el registro del posible fraude

        }

        coincidenceMap

    }

    private def getDiffPriceGDP(def versionId, def priceVehicle){

        //TODO por el momento asumimos que todos los precios son en $(pesos mexicanos)

        double priceGDP = getPriceGDP(versionId)

        def difPorcentual

        if(priceGDP > 0) {
            difPorcentual = (priceVehicle*100/priceGDP) - 100
        }else{
            difPorcentual = 0
        }

        difPorcentual


    }

    private double getPriceGDP(def versionId){

        def priceGDP = 0

        try{
            if(versionId){
                def priceCatalog = maxipublicaApiService.getCatlogPrice(versionId)
                if(priceCatalog.status == HttpServletResponse.SC_OK){
                    priceGDP = priceCatalog.data.version.price ? priceCatalog.data.version.price : 0
                }
            }
        }catch (Exception e){
            priceGDP = 0
        }

        priceGDP

    }

    private int getAverage(def mask, def coincidence){

        def result = 0
        def maxScore = 0
        def scoreFind = 0

        mask.each{
            maxScore += it.score
        }

        coincidence.each{
            scoreFind += it.score
            if(it.parameter_name == 'precio'){
                maxScore = maxScore + it.score
            }
        }

        result = (scoreFind*100)/maxScore

        result
    }


    private int searchValue(def parameter_name, def value, def score){

        int result = 0
        def search

        def params = [
                parameter_name : parameter_name,
                value: value
        ]

        try {
            search = valuesFraudService.getValueItemFraud(params)
            if (search.results.size() > 0) {
                result = score
            }
        }catch (Exception e) {
            result = 0
        }

        result
    }

    def searchMaksFraud(){

        def maskFraudActive = []
        def result = maskFraudService.getMaskFraud()

        if(result){
            result.parameters.each{
                if(it.status == 'active'){
                    maskFraudActive << [parameter_name:it.parameter_name, score:it.score]
                }
            }
        }

        maskFraudActive
    }

    def getDomainEmail (def email){

        def domain = ''

        def valuesEmail = email.split('@')
        if(valuesEmail[1]){
            def valuesDomain = valuesEmail[1].toString().tokenize(".")
            if(valuesDomain[0]){
                domain = valuesDomain[0]
            }
        }

        domain
    }
}