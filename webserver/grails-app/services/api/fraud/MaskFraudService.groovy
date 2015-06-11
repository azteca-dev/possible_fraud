package api.fraud

import grails.transaction.Transactional
import api.fraud.exceptions.NotFoundException
import api.fraud.exceptions.ConflictException
import api.fraud.exceptions.BadRequestException
import javax.servlet.http.HttpServletResponse
import java.text.MessageFormat

@Transactional
class MaskFraudService {

    def getMaskFraud(){

        Map jsonResult = [:]
        def itemsMaskResult = []

        def maskFraud = MaskFraud.findAll()
        if(!maskFraud){
            throw new NotFoundException('Not found')
        }

        maskFraud.each{
            itemsMaskResult.add(
                    parameter_name : it.parameterName,
                    status : it.status,
                    registration : [ operator_id:it.userRegistration, date:it.dateRegistration],
                    activation : [operator_id: it.userActivation, date:it.dateActivation],
                    deactive : [operator_id: it.userDeactivation, date:it.dateDeactivation]
            )
        }

        jsonResult.parameter_total = maskFraud.size()
        jsonResult.parameters = itemsMaskResult

        jsonResult


    }

    def postItemMaksFraud(def params, def jsonItemMask){

        Map jsonResult = [:]
        def responseMessage = ''

        if(!jsonItemMask?.parameter_name){
            throw new BadRequestException('You must provider parameter_name')
        }

        if(!jsonItemMask?.operator_id){
            throw new BadRequestException('You must provider operator_id')
        }

        def newItemMaskFraud = new MaskFraud(
                parameterName:jsonItemMask?.parameter_name.toLowerCase(),
                userActivation: jsonItemMask?.operator_id
        )

        if(!newItemMaskFraud.validate()){
            newItemMaskFraud.errors.allErrors.each {
                responseMessage += MessageFormat(it.defaultMessage, it.arguments) + ' '
            }
            throw new BadRequestException(responseMessage)
        }

        newItemMaskFraud.save()

        jsonResult.parameter_name       = newItemMaskFraud.parameterName
        jsonResult.status               = newItemMaskFraud.status
        jsonResult.operator_id          = newItemMaskFraud.userActivation
        jsonResult.date_registration    = newItemMaskFraud.dateRegistration

        jsonResult
    }

    def putItemMaskFraud(def params, def jsonItemMask){

        Map jsonResult = [:]
        def responseMessage = ''

        if(!jsonItemMask?.parameter_name){
            throw new BadRequestException('You must provider parameter_name')
        }
        if(!jsonItemMask?.operator_id){
            throw new BadRequestException('You must provider operator_id')
        }
        if(!jsonItemMask?.status){
            throw new BadRequestException('You must provider status')
        }

        def obteinedItemMaskFraud = MaskFraud.findByParameterName(jsonItemMask?.parameter_name.toLowerCase())

        if(!obteinedItemMaskFraud){
            throw new NotFoundException('The parameter_name '+jsonItemMask?.parameter_name+' not found')
        }

        if(jsonItemMask?.status.toLowerCase() == 'active'){
            obteinedItemMaskFraud.dateActivation = new Date()
            obteinedItemMaskFraud.userActivation = jsonItemMask?.operator_id
        }
        if(jsonItemMask?.status.toLowerCase() == 'inactive'){
            obteinedItemMaskFraud.dateDeactivation = new Date()
            obteinedItemMaskFraud.userDeactivation = jsonItemMask?.operator_id
        }

        obteinedItemMaskFraud.status = jsonItemMask?.status.toLowerCase()

        if(!obteinedItemMaskFraud.validate()){
            obteinedItemMaskFraud.errors.allErrors.each {
                responseMessage += MessageFormat.format(it.defaultMessage, it.arguments) + ' '
            }
            throw new BadRequestException(responseMessage)
        }

        obteinedItemMaskFraud.save()

        jsonResult.parameter_name = obteinedItemMaskFraud.parameterName
        jsonResult.status =obteinedItemMaskFraud.status

        jsonResult

    }
}
