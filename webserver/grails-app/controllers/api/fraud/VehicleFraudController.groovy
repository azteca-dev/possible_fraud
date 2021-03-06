package api.fraud

import javax.servlet.http.HttpServletResponse
import grails.converters.*
import api.fraud.exceptions.NotFoundException


class VehicleFraudController {

    def vehicleFraudService

    def getVehiclesFraud (){

        def result
        setHeaders()
        try{

            result = vehicleFraudService.getVehiclesFraud(params)
            response.setStatus(HttpServletResponse.SC_OK)
            render result as JSON

        }catch (NotFoundException e){
            renderException(e)
        }catch(Exception e){
            renderException(e)
        }
    }


    def notAllowed(){

        def method = request.method

        response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED)

        setHeaders()

        def mapResult = [
                message: "Method " +method +" not allowed",
                status: HttpServletResponse.SC_METHOD_NOT_ALLOWED,
                error:"not_allowed"
        ]
        render mapResult as JSON
    }

    def setHeaders(){

        response.setContentType "application/json; charset=utf-8"
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
        response.setHeader("Access-Control-Max-Age", "86400");
        response.setHeader("Access-Control-Allow-Headers", "application/json;charset=UTF-8");
    }

    def renderException(def e){

        def statusCode
        def error

        try{
            statusCode  = e.status
            error       = e.error

        }catch(Exception ex){

            statusCode = HttpServletResponse.SC_INTERNAL_SERVER_ERROR
            error = "internal_server_error"
        }

        response.setStatus(statusCode)

        def mapExcepction = [
                message: e.getMessage(),
                status: statusCode,
                error: error
        ]

        render mapExcepction as JSON

    }

}
