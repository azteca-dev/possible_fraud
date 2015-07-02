package api.fraud

import grails.transaction.Transactional
import rest.RestService

@Transactional
class MaxipublicaApiService {

    def restService =  new RestService()

    def getDataVehicle (def vehicleId){

        restService.defineServiceResource('vehicles')
        def result = restService.getResource("/vehicle/${vehicleId}")
        result
    }

    def getCatlogPrice (def versionId){

        restService.defineServiceResource('catalogo')
        def result =restService.getResource("/catalogV2/MX/MXP/${versionId}")
        result
    }
}
