package api.fraud

import grails.transaction.Transactional
import rest.RestService

@Transactional
class MaxipublicaApiService {

    def restService =  new RestService()

    def getDataVehicle (def vehicleId){

        def result = restService.getResource("/vehicle/${vehicleId}")
        result
    }

    def getCatlogPrice (def versionId){

        def result =restService.getResource("/catalog/MX/MXP/${versionId}")
        result
    }
}
