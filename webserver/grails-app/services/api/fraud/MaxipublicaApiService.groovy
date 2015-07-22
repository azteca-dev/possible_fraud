package api.fraud

import grails.transaction.Transactional
import rest.RestService

@Transactional
class MaxipublicaApiService {

    def restService =  new RestService()

    def getDataVehicle (def vehicleId, def accessToken){

        def params = [
                access_token:accessToken
        ]

        def result = restService.getResource("/vehicletest/${vehicleId}", params)
        result
    }

    def getCatalogPrice (def versionId){

        def result =restService.getResource("/catalog/MX/MXP/${versionId}")
        result
    }

    def getAccessTokenAdmin(def email, def password){

        def body =[
                email:email,
                password:password
        ]
        def result = restService.postResource('/oauth/', body)

        result
    }
}
