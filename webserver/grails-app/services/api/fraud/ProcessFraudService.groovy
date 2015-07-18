package api.fraud

import org.codehaus.groovy.grails.web.util.WebUtils
import api.fraud.exceptions.BadRequestException
import api.fraud.exceptions.NotFoundException
import grails.transaction.Transactional

import javax.servlet.http.HttpServletResponse
import java.text.MessageFormat

@Transactional
class ProcessFraudService {

    def maxipublicaApiService
    def maskFraudService
    def valuesFraudService
    def vehicleFraudService

    def processVehicle (def params){

        if(!params.vehicleId){
            throw new NotFoundException('You most provider the vehicleId')
        }

        def accessToken = getAccessToken()

        def dataVehicle = maxipublicaApiService.getDataVehicle(params.vehicleId,accessToken)

        if(dataVehicle.status == HttpServletResponse.SC_OK){

            searchDataInVehicle(dataVehicle.data, searchMaksFraud())


        }else{
            dataVehicle.data
        }

    }

    def searchDataInVehicle(def dataVehicle, def mask){


        Map coincidenceMap = [:]
        def coincidence = []

        String remoteAddress
        try{
            def request = WebUtils.retrieveGrailsWebRequest().getCurrentRequest()
            remoteAddress = request.getRemoteAddr()
        }catch(Exception e){
            remoteAddress = 'sin_direccion'
        }

        def name            = dataVehicle.dealer.seller_contact.name ? dataVehicle.dealer.seller_contact.name : ''
        def email           = dataVehicle.dealer.seller_contact.email ? dataVehicle.dealer.seller_contact.email : ''
        def contactPhone    = dataVehicle.dealer.seller_contact.phone.phone_number ? dataVehicle.dealer.seller_contact.phone.phone_number : ''
        //def password        = ''
        def domain          = getDomainEmail(email)
        def priceVehicle    = dataVehicle.price ? dataVehicle.price : ''
        def versionId       = dataVehicle.vehicle.version.category_id ? dataVehicle.vehicle.version.category_id : ''
        def ip              = remoteAddress
        //currencyType    = dataVehicle.attributes.currencies.id ? dataVehicle.attributes.currencies.id :''

        mask.each{
            switch (it.parameter_name){
                case Constants.PARAMETER_MASK_NAME:
                    if(searchValue(it.parameter_name, name, it.score) > 0){
                        coincidence.add(parameter_name:it.parameter_name, value:name, score:it.score)
                    }
                    break
                case Constants.PARAMETER_MASK_EMAIL:
                    if(searchValue(it.parameter_name, email, it.score) > 0 ){
                        coincidence.add(parameter_name:it.parameter_name, value:email, score:it.score)
                    }
                    break
                /*case Constants.PARAMETER_MASK_PASSWORD:
                    if(searchValue(it.parameter_name, password, it.score) > 0){
                        coincidence.add(parameter_name: it.parameter_name, value:password, score: it.score)
                    }
                    break*/
                case Constants.PARAMETER_MASK_DOMINIO:
                    if(searchValue(it.parameter_name, domain, it.score) > 0){
                        coincidence.add(parameter_name: it.parameter_name, value:domain, score:it.score)
                    }
                    break
                case Constants.PARAMETER_MASK_TELEFONO:
                    if(searchValue(it.parameter_name, contactPhone, it.score) > 0){
                        coincidence.add(parameter_name: it.parameter_name, value: contactPhone, score: it.score)
                    }
                    break
                case Constants.PARAMETER_MASK_IP:
                    if(searchValue(it.parameter_name, ip, it.score) > 0 ){
                        coincidence.add(parameter_name: it.parameter_name, value: ip, score:it.score)
                    }
                    break
                default :
                    break
            }
        }

        def difPorcentPrice = getDiffPriceGDP(versionId, priceVehicle)
        if(difPorcentPrice <= Constants.PORCENT_GDP) {  //TODO debemos agregar la diferencia de porcentaje en la configuracion
            coincidence.add(parameter_name: Constants.PARAMETER_MASK_PRECIO, value: difPorcentPrice, score:60)
        }
        int averangeFraud = getAverage(mask, coincidence)

        coincidenceMap = registrationFraud(dataVehicle.id, coincidence, averangeFraud)

        coincidenceMap

    }

    private def registrationFraud(def vehicleId, def coincidence, int averangeFraud){

        Map coincidenceMap = [:]
        coincidenceMap.vehicle_id   = vehicleId
        coincidenceMap.averange     = averangeFraud
        coincidenceMap.coincidence  = []

       coincidence.each{
            coincidenceMap.coincidence.add(
                    parameter_name: it.parameter_name,
                    value:it.value
            )
        }

        if(averangeFraud > 0) {

            def resultRegistrationFraud = vehicleFraudService.addVehicleFraud(coincidenceMap)
            resultRegistrationFraud

        }else{
            coincidenceMap
        }



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
                def priceCatalog = maxipublicaApiService.getCatalogPrice(versionId)
                if(priceCatalog.status == HttpServletResponse.SC_OK){
                    priceGDP = priceCatalog.data.version.price ?  Double.parseDouble(priceCatalog.data.version.price) : 0
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
            if(it.parameter_name == Constants.PARAMETER_MASK_PRECIO){
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

    private String getAccessToken(){

        def accessToken = ''
        def resultToken = maxipublicaApiService.getAccessTokenAdmin(Constants.EMAIL_ADMIN, Constants.PASS_ADMIN)
        if(resultToken.status == HttpServletResponse.SC_ACCEPTED){
            accessToken = resultToken.data.access_token
        }
        accessToken
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
