package api.fraud

import api.fraud.exceptions.BadRequestException
import api.fraud.exceptions.NotFoundException
import grails.transaction.Transactional

import java.text.MessageFormat

@Transactional
class VehicleFraudService {

    def getVehiclesFraud(def params){

        Map jsonResult = [:]
        def vehiclesFraudResult = []

        // TODO aqui debemos implementar un paginado

        if(!params.vehicleId){

            def vehiclesFraud = VehicleFraud.findAll()
            if(!vehiclesFraud){
                throw new NotFoundException('Not found vehicles')
            }

            vehiclesFraud.each{
                vehiclesFraudResult.add(
                        vehicle_id:it.vehicleId,
                        averange:it.averange,
                        status:it.status,
                        coincidence:it.coincidence,
                        registration_date:it.registrationDate,
                        update_date:it.updateDate,
                        update_operator:it.updateOperator
                )
            }

            jsonResult.total = vehiclesFraud.size()
            jsonResult.results = vehiclesFraudResult


        }else{

            def vehicleFraud = VehicleFraud.findByVehicleId(params.vehicleId)
            if(!vehicleFraud){
                throw new NotFoundException("The Vehicle Fraud not found with vehicleId = ${params.vehicleId}")
            }

            jsonResult.vehicle_id           = vehicleFraud.vehicleId
            jsonResult.averange             = vehicleFraud.averange
            jsonResult.status               = vehicleFraud.status
            jsonResult.coincidence          = vehicleFraud.coincidence
            jsonResult.registration_date    = vehicleFraud.registrationDate
            jsonResult.update_date          = vehicleFraud.updateDate
            jsonResult.update_operator      = vehicleFraud.updateOperator

        }


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
            fraudObteined.coincidence = jsonVehicle.coincidence

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
                    coincidence: jsonVehicle.coincidence
            )

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
