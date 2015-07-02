package api.fraud

import api.fraud.exceptions.BadRequestException
import api.fraud.exceptions.NotFoundException
import grails.transaction.Transactional
import org.joda.time.format.ISODateTimeFormat
import org.joda.time.format.DateTimeFormatter

import java.text.MessageFormat

@Transactional
class VehicleFraudService {

    def getVehiclesFraud(def params){

        Map jsonResult = [:]
        def queryMap = [:]
        def vehiclesFraudResult
        def vehicleFraudResults = []

        def registration_date_from
        def registration_date_to

        def offset  = params.offset ? Integer.parseInt(params.offset) : 0
        def limit   = params.limit ? Integer.parseInt(params.limit):Constants.DEFAULT_SEARCH_LIMIT

        limit = limit>Constants.MAX_SEARCH_LIMIT ? Constants.MAX_SEARCH_LIMIT : limit


        def SEARCH_PARAMS_MAP = [
                vehicle_id:"vehicleId",
                status:"status",
                registration_date_from:"registrationDate",
                registration_date_to : "registrationDate"
        ]

        params.each{ key , value ->
            def newKey = SEARCH_PARAMS_MAP[key]
            if(newKey){
                queryMap[newKey] = value
            }
        }

        def vehicleFraudCriteria = VehicleFraud.createCriteria()

        if(!queryMap){
            vehiclesFraudResult = vehicleFraudCriteria.list(sort:"registrationDate", order:"desc", offset:offset, max:limit){
            }
        }else{

            vehiclesFraudResult = vehicleFraudCriteria.list(sort:"registrationDate", order:"desc", offset:offset, max:limit){

                params.each{ key, value ->

                    def newKey = SEARCH_PARAMS_MAP[key]
                    if(newKey && (newKey!='registrationDate')){
                        eq(newKey, value)
                    }
                }

                if(params.registration_date_from){
                    try{
                        registration_date_from = ISODateTimeFormat.dateTimeParser().parseDateTime(params.registration_date_from).toDate()
                        ge("registrationDate", registration_date_from)

                    }catch(Exception e){
                        throw new BadRequestException("Wrong date format in registration_date_from. Must be ISO json format")
                    }
                }

                if(params.registration_date_to){
                    try{
                        registration_date_to = ISODateTimeFormat.dateTimeParser().parseDateTime(params.registration_date_to).toDate()
                        le("registrationDate", registration_date_to)
                    }catch(Exception e){
                        throw new BadRequestException("Wrong date format in regitration_date_to. Must be ISO json format")
                    }
                }

                if(params.registration_date_from && params.registration_date_to){

                    if(registration_date_to < registration_date_from){
                        throw new BadRequestException("Invalid date range, date resgitration_date_to must be greater then date registration_date_from")
                    }

                }
            }
        }

        vehiclesFraudResult.each{

            vehicleFraudResults.add(
                    vehicle_id:it.vehicleId,
                    averange:it.averange,
                    status:it.status,
                    coincidence:it.coincidence,
                    registration_date:it.registrationDate,
                    update_date:it.updateDate,
                    update_operator:it.updateOperator
            )

        }

        jsonResult.total = vehiclesFraudResult.totalCount
        jsonResult.offset = offset
        jsonResult.limit = limit
        jsonResult.results = vehicleFraudResults

        jsonResult
    }

    def addVehicleFraud (def jsonVehicle){

        Map jsonResult = [:]
        def responseMessageError = ''

        def fraudObteined = VehicleFraud.findByVehicleId(jsonVehicle.vehicle_id)

        if(fraudObteined){

            fraudObteined.averange  = jsonVehicle.averange
            fraudObteined.status    = 'open'
            fraudObteined.registrationDate = new Date()
            fraudObteined.coincidence = []
            jsonVehicle.coincidence.each{
                fraudObteined.coincidence.add(it)
            }


            if(!fraudObteined.save(flush: true)){

                fraudObteined.errors.allErrors.each{
                    responseMessageError += MessageFormat.format(it.defaultMessage, it.arguments)
                }
                throw new BadRequestException("Error:Fallo el registro del fraude - "+responseMessageError)

            }



            jsonResult.vehicle_id           = fraudObteined.vehicleId
            jsonResult.averange             = fraudObteined.averange
            jsonResult.coincidence          = fraudObteined.coincidence
            jsonResult.registration_date    = fraudObteined.registrationDate
            jsonResult.update_date          = fraudObteined.updateDate
            jsonResult.update_operator      = fraudObteined.updateOperator



        }else{

            VehicleFraud newFraud = new VehicleFraud(
                    vehicleId: jsonVehicle.vehicle_id,
                    averange: jsonVehicle.averange,
                    status: 'open',
                    coincidence: []
            )
            jsonVehicle.coincidence.each {
                newFraud.coincidence.add(it)
            }

            if(!newFraud.save(flush: true)){

                newFraud.errors.allErrors.each{
                    responseMessageError += MessageFormat.format(it.defaultMessage, it.arguments)
                }
                throw new BadRequestException("Error:Fallo el registro del fraude - "+responseMessageError)
            }

            jsonResult.vehicle_id           = newFraud.vehicleId
            jsonResult.averange             = newFraud.averange
            jsonResult.coincidence          = newFraud.coincidence
            jsonResult.registration_date    = newFraud.registrationDate
            jsonResult.update_date          = newFraud.updateDate
            jsonResult.update_operator      = newFraud.updateOperator


        }

        jsonResult

    }
}
