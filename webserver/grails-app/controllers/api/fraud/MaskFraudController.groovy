package api.fraud

import javax.servlet.http.HttpServletResponse
import grails.converters.*
import static org.springframework.http.HttpStatus.*
import static org.springframework.http.HttpMethod.*
import api.fraud.exceptions.NotFoundException
import api.fraud.exceptions.ConflictException
import api.fraud.exceptions.BadRequestException

class MaskFraudController {

    def maskFraudService

    def getItemsMaskFraud(){

        def result
        setHeaders()
        try{
            result = maskFraudService.getMaskFraud()
            response.setStatus(HttpServletResponse.SC_OK)
            render result as JSON
        }catch(NotFoundException e){
            renderException(e)
        }catch(Exception e){
            renderException(e)
        }
    }

    def addItemMaskFraud(){

        def result
        setHeaders()
        try{
            result = maskFraudService.postItemMaksFraud(params, request.JSON)
            response.setStatus(HttpServletResponse.SC_CREATED)
            render result as JSON

        }catch(BadRequestException e){
            renderException(e)
        }catch(Exception e){
            renderException(e)
        }
    }

    def modifyItemMaskFraud(){
        def result
        setHeaders()
        try{
            result = maskFraudService.putItemMaskFraud(params, request.JSON)
            response.setStatus(HttpServletResponse.SC_OK)
            render result as JSON
        }catch(BadRequestException e){
            renderException(e)
        }catch(NotFoundException e){
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
