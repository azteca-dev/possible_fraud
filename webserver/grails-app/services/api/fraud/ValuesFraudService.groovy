package api.fraud

import grails.transaction.Transactional
import api.fraud.exceptions.NotFoundException
import api.fraud.exceptions.ConflictException
import api.fraud.exceptions.BadRequestException
import java.text.MessageFormat

@Transactional
class ValuesFraudService {

    def getValueItemFraud(def params){

        Map jsonResult = [:]
        def resultsValues = []

        if(!params.parameter_name){
            throw new BadRequestException('You must provider parameter_name')
        }
        if(!params.value){

            def offset  = params.offset ? Integer.parseInt(params.offset) : 0
            def limit   = params.limit ? Integer.parseInt(params.limit):Constants.DEFAULT_SEARCH_LIMIT

            limit = limit>Constants.MAX_SEARCH_LIMIT ? Constants.MAX_SEARCH_LIMIT : limit

            def itemValues = ValuesFraud.findAllByParameterName(params.parameter_name.toLowerCase(), [max: limit, offset: offset])
            if(!itemValues){
                throw new NotFoundException('The parameter = ' +params.parameter_name + ' not found')
            }
            itemValues.each{
                resultsValues.add(
                        parameter_name: it.parameterName,
                        value: it.value,
                        status: it.status,
                        registration: [operator_id: it.userRegistration, date: it.dateRegistration],
                        activation: [operator_id: it.userUpdate, date: it.dateActived],
                        deactivation: [operator_id: it.userDeleted, date: it.dateDeleted]
                )
            }

            jsonResult.total = resultsValues.size()
            jsonResult.offset = offset
            jsonResult.limit = limit
            jsonResult.results = resultsValues

        }else {

            def itemValue = ValuesFraud.findAllByParameterNameAndValue(params.parameter_name.toLowerCase(), params.value)

            if (!itemValue) {
                throw new NotFoundException('The parameter = ' + params.parameter_name + ' and value = ' + params.value + ' not found')
            }

            itemValue.each {
                resultsValues.add(
                        parameter_name: it.parameterName,
                        value: it.value,
                        status: it.status,
                        registration: [operator_id: it.userRegistration, date: it.dateRegistration],
                        activation: [operator_id: it.userUpdate, date: it.dateActived],
                        deactivation: [operator_id: it.userDeleted, date: it.dateDeleted]
                )
            }

            jsonResult.results = resultsValues
        }

        jsonResult
    }

    def postValueItemFraud(def params, def jsonItemValue){

        Map jsonResult = [:]
        def responseMessage = ''

        if(!jsonItemValue?.parameter_name){
            throw new BadRequestException('You must provider the parameter_name')
        }
        if(!jsonItemValue?.value){
            throw new BadRequestException('You must provider the value')
        }
        if(!jsonItemValue?.operator_id){
            throw new BadRequestException('You must provider the operator_id ')
        }

        def parameterName = MaskFraud.findByParameterName(jsonItemValue?.parameter_name.toLowerCase())

        if(!parameterName){
            throw new NotFoundException('The parameter_name = '+jsonItemValue?.parameter_name+' not found')
        }

        def parameterValue = ValuesFraud.findByParameterNameAndValue(jsonItemValue?.parameter_name.toLowerCase(), jsonItemValue?.value)

        if(parameterValue){
            throw new ConflictException('The paramater_name = '+jsonItemValue?.parameter_name+' and value = '+jsonItemValue?.value+ ' exists')
        }

        def newItemValue = new ValuesFraud(
                parameterName: jsonItemValue?.parameter_name.toLowerCase(),
                value: jsonItemValue?.value.trim(),
                userRegistration: jsonItemValue?.operator_id
        )

        if(!newItemValue.validate()){
            newItemValue.errors.allErrors.each {
                responseMessage += MessageFormat.format(it.defaultMessage, it.arguments) + ' '
            }
            throw new BadRequestException(responseMessage)
        }

        newItemValue.save()

        jsonResult.parameter_name   = newItemValue.parameterName
        jsonResult.value            = newItemValue.value
        jsonResult.status           = newItemValue.status
        jsonResult.operator_id      = newItemValue.userRegistration

        jsonResult

    }

    def putValueItemFraud(def params, def jsonItemValue){

        Map jsonResult = [:]
        def responseMessage = ''

        if(!jsonItemValue?.parameter_name.toLowerCase()){
            throw new BadRequestException('You must provider parameter_name')
        }

        if(!jsonItemValue?.value.toLowerCase()){
            throw new BadRequestException('You must provider value')
        }

        if(!jsonItemValue?.operator_id){
            throw new BadRequestException('You must provider operator_id')
        }

        def obteinedItemValue = ValuesFraud.findByParameterNameAndValue(jsonItemValue?.parameter_name.toLowerCase(),jsonItemValue?.value)

        if(!obteinedItemValue){
            throw new NotFoundException('The parameter_name = '+jsonItemValue?.parameter_name+' and value = '+jsonItemValue?.value+' not found')
        }

        if(jsonItemValue?.status.toLowerCase() == 'active'){
            obteinedItemValue.dateActived = new Date()
            obteinedItemValue.userUpdate = jsonItemValue?.operator_id
        }
        if(jsonItemValue?.status.toLowerCase() == 'inactive'){
            obteinedItemValue.dateDeleted = new Date()
            obteinedItemValue.userDeleted = jsonItemValue?.operator_id
        }
        obteinedItemValue.status = jsonItemValue?.status

        if(!obteinedItemValue.validate()){
            obteinedItemValue.errors.allErrors.each {
                responseMessage += MessageFormat.format(it.defaultMessage, it.arguments) + ' '
            }
            throw new BadRequestException(responseMessage)
        }
        obteinedItemValue.save()

        jsonResult.parameter_name   = obteinedItemValue.parameterName
        jsonResult.value            = obteinedItemValue.value
        jsonResult.status           = obteinedItemValue.status
        jsonResult.operator_id      = obteinedItemValue.userRegistration

        jsonResult


    }

}
