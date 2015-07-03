'use strict';

/* Services */

var module = angular.module('possibleFraudServices', ['ngResource']);

module.factory('Mask', function($resource){
    
    var url = apiBaseUrl+"/fraud/maskfraud";
    return $resource(url, {}, {
        get:{method:"GET", params:{}},
        post:{method:"POST", params:{}},
        put:{method:"PUT", params:{}}
    });
});

module.factory('Values', function($resource){

    var url = apiBaseUrl+"/fraud/valuefraud";
    return $resource(url, {}, {
        get:{method:"GET", params:{}},
        post:{method:"POST", params:{}}
    });
    
});

module.factory('Process', function($resource){

    var url = apiBaseUrl+"/fraud/processFraudVehicle";
    return $resource(url, {}, {
        get:{method:"GET", params:{}}

    });
});

module.factory('Report', function($resource){

    var url = apiBaseUrl+"/fraud/vehiclesFraud";
    return $resource(url, {}, {
        get:{method:"GET", params:{}}
    });

});

/*
module.factory('Account', function ($resource) {
    var url = apiBaseUrl + "/users/:userId/classifieds_accounts/:action";
    return $resource(url, {}, {
        get:{method:"GET", params:{access_token:accessToken}},
        search:{method:"GET", params:{action:"search", userId:"ALL", access_token:accessToken}},
        activate:{method:"POST", params:{action:"activate", access_token:accessToken}},
        inactivate:{method:"POST", params:{action:"inactivate", access_token:accessToken}},
        put:{method:"PUT", params:{access_token:accessToken}},
        postLogo:{method:"POST", params:{action:"account_logos", access_token:accessToken}},
        removeLogo:{method:"DELETE", params:{action:"account_logos", access_token:accessToken}}
    });
});

module.factory('Manager', function ($resource) {
    var url = apiBaseUrl + "/users/:userId/classifieds_accounts/managers/:action";
    return $resource(url, {}, {
        search:{method:"GET", params:{action:"search", userId:"ALL", access_token:accessToken}}
    });
});

module.factory('User', function ($resource) {
    var url = apiBaseUrl + "/users/:userId/:action";
    return $resource(url, {}, {
        get:{method:"GET", params:{access_token:accessToken}},
        search:{method:"GET", params:{action:"search", access_token:accessToken}},
        put:{method:"PUT", params:{access_token:accessToken}}
    });
});

module.factory('PromotionPack', function ($resource) {
    var url = apiBaseUrl + "/:resource/:resourceId/classifieds_promotion_packs/:userPromotionPackId";
    return $resource(url, {}, {
        getByUser:{method:"GET", params:{resource:"users", access_token:accessToken}, isArray:true},
        getByCategory:{method:"GET", params:{resource:"categories", access_token:accessToken}, isArray:true},
        getById:{method:"GET", params:{resource:"categories", access_token:accessToken}},
        postUserPackage:{method:"POST", params:{resource:"users", access_token:accessToken}},
        putUserPackage:{method:"PUT", params:{resource:"users", access_token:accessToken}},
        finishUserPackages:{method:"PUT", params:{
            resource:"users", userPromotionPackId:"ALL", access_token:accessToken
        }, isArray:true}
    });
});

module.factory('Address', function ($resource) {
    var url = apiBaseUrl + "/users/:userId/addresses/:addressId";
    return $resource(url, {}, {
        get:{method:"GET", params:{access_token:accessToken}, isArray:true},
        put:{method:"PUT", params:{access_token:accessToken}}
    });
});

module.factory('Country', function ($resource) {
    var url = apiBaseUrl + "/countries/:countryId";
    return $resource(url, {}, {
        get:{method:"GET", params:{access_token:accessToken}}
    });
});

module.factory('State', function ($resource) {
    var url = apiBaseUrl + "/states/:stateId";
    return $resource(url, {}, {
        get:{method:"GET", params:{access_token:accessToken}}
    });
});

module.factory('Broadcast', function ($rootScope) {
    var broadcastService = {
        broadcast:function (event) {
            $rootScope.$broadcast.apply($rootScope, arguments);
        }};
    return broadcastService;
});
*/