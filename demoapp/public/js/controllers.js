'use strict'

/* Controllers */
function possibleFraudController($scope, $timeout, $filter, Mask, Values, Process, Report) {

    $scope.prueba = "Hola Angular";
    $scope.showMascara = false;
    $scope.showDemoMain = true;
    $scope.showFormNewMask = false;
    $scope.showFormMaskEdit = false;

    $scope.showFormAddValue = false;
    $scope.parameterNameAddValue = '';

    $scope.showSearchParamValue = false;
    $scope.searchParamValue = "";
    $scope.mensajeSearchValue = "";

    $scope.showProcessVehicle = false;
    $scope.messageProcessVehicle = '';
    $scope.showProcessResult = false;

    $scope.showReportFraud = false;
    $scope.reporteConResultados = false;

    $scope.defaultLimit = 10;
    $scope.maxPageIndex = 10;
    $scope.pageOffset = 0;

    $scope.showOption = function(option){
        console.log("buscando opcion = "+option);
        loadShowOption(option);
    };

    $scope.searchMaskFraud = function(){
        loadMaskFraudList();
    }

    $scope.createMaskFraud = function(operatorId){
        var params = {};
        var enabled_sites = [];

        var sites = ''

        if ($scope.enabled_sites_mlm){
            if(sites == ''){
                sites += "mlm";
            }else{
                sites += ",mlm";
            }
            
        }
        if ($scope.enabled_sites_apc){
            if(sites == ''){
                sites += "apc";
            }else{
                sites += ",apc";
            }
            
        }
        if ($scope.enabled_sites_carmudi){
            if(sites == ''){
                sites += "carmudi";
            }else{
                sites += ",carmudi";
            }
            
        }

        enabled_sites.push(sites);
        
        var body = {
            parameter_name:$scope.parameter_name,
            score:parseInt($scope.score),
            operator_id:operatorId,
            enabled_sites:enabled_sites
        };
        console.log("los parametros del checbox"+$scope.enabled_sites);

        console.log("el joson que enviaremos es"+body.enabled_sites[0]);
    

        Mask.post(params, body, function(data){
            $scope.maskFraudError = '';
            reloadMaskFraudList();

        }, function(error){
            $scope.maskFraudError = 'Ocurrio un error al cargar el filtro';

        });
    }

    $scope.searchParamsValues = function (){
        
        $scope.messageValueAdd = '';
        console.log("Entramos a buscar un parametro con nombre = "+$scope.parameterNameAddValue+" y valor = "+$scope.parameter_value_search);
        $scope.showSearchParamValue = true;
        var params = {
            parameter_name:$scope.parameterNameAddValue,
            value:$scope.parameter_value_search
        };

        Values.get(params, {}, function(data){
            console.log("si lo encontro...");
            $scope.mensajeSearchValue = 'Si existe con status = '+data.results[0].status;
        }, function(error){
            $scope.mensajeSearchValue = 'No existe';
        });
    }

    $scope.addNewValueToParam = function(operatorId){
         
        $scope.messageValueAdd = '';
         var params = {};
         var body = {
            parameter_name:$scope.parameterNameAddValue,
            value:$scope.parameter_value_search,
            operator_id:operatorId
         };

         Values.post(params, body, function(data){
            $scope.messageValueAdd = "El value = "+$scope.parameter_value_search+" para el parametro = "+$scope.parameterNameAddValue+
           " se agrego correctamente";
         }, function (error){
            $scope.messageValueAdd = "EL parametro no se agrego o ya existe";

         });
    }

    $scope.loadDataEditMask = function(mask){
        
        $scope.activeSelected = false;
        $scope.inactiveSelected = false;
        $scope.parameter_name = mask.parameter_name
        $scope.score = mask.score
        $scope.status = mask.status

        if(mask.status == 'active'){
            $scope.activeSelected = true;
            $scope.inactiveSelected = false;
        }
        if(mask.status == 'inactive'){
            $scope.activeSelected = false;
            $scope.inactiveSelected = true;
        }

        console.log("vamos a entrar al for con un array de longitud"+mask.enabled_sites.length);
        for (var enableSite in mask.enabled_sites){
            console.log("Entramos en el foreach");
            console.log("el value = "+mask.enabled_sites[enableSite]);

            if(mask.enabled_sites[enableSite].toString().indexOf(",") > -1){
                console.log("si encontro una , ");
                var sitesArray = mask.enabled_sites[enableSite].toString().split(",");
                for( var value in sitesArray){
                    console.log("el valor es"+sitesArray[value]);
                    if(sitesArray[value].toString() == "mlm"){
                        $scope.enabled_sites_mlm = true;
                    }
                    if(sitesArray[value].toString() == "apc"){
                        $scope.enabled_sites_apc = true;
                    }
                    if(sitesArray[value].toString() == "carmudi"){
                        $scope.enabled_sites_carmudi = true;
                        
                    } 
                }

            }else{
                console.log("el valor es"+mask.enabled_sites[enableSite]);

                if(mask.enabled_sites[enableSite].toString() == "mlm"){
                        $scope.enabled_sites_mlm = true;
                    }
                    if(mask.enabled_sites[enableSite].toString() == "apc"){
                        $scope.enabled_sites_apc = true;
                    }
                    if(mask.enabled_sites[enableSite].toString() == "carmudi"){
                        $scope.enabled_sites_carmudi = true;
                        
                    } 
            }    
        }       
    }

    $scope.loadDataValue = function(mask){

        console.log("cargando el  nombre del parametros que queremos buscar");
        $scope.parameterNameAddValue = mask.parameter_name;
    }

    $scope.editMaskFraud =function(operatorId){

        var params = {};
        var enabled_sites = [];
        var sites = ''

        if ($scope.enabled_sites_mlm){
            if(sites == ''){
                sites += "mlm";
            }else{
                sites += ",mlm";
            }
            
        }
        if ($scope.enabled_sites_apc){
            if(sites == ''){
                sites += "apc";
            }else{
                sites += ",apc";
            }
            
        }
        if ($scope.enabled_sites_carmudi){
            if(sites == ''){
                sites += "carmudi";
            }else{
                sites += ",carmudi";
            }
            
        }

        enabled_sites.push(sites);
        
        var body = {
            parameter_name:$scope.parameter_name,
            score:parseInt($scope.score),
            operator_id:operatorId,
            enabled_sites:enabled_sites,
            status:$scope.status
        };

        console.log("los datos del json para hacer el put son");
        console.log("parameter_name:"+body.parameter_name);
        console.log("score:"+body.score);
        console.log("operator_id:"+body.operator_id);
        console.log("enabled_sites:"+body.enabled_sites);
        console.log("status:"+body.status);

        Mask.put(params, body, function(data){
            
            console.log("el estatus es "+data.status);
            $scope.maskFraudError = '';
            reloadMaskFraudList();

        }, function(error){
            $scope.maskFraudError = 'Ocurrio un error al cargar el filtro' +error.toString();

        });

    }

    $scope.processVehicle = function(){

        $scope.messageProcessVehicle = '';
        var params = {
            vehicleId :$scope.vehicleId
        };

        Process.get(params, {}, function (data){
            
            $scope.messageProcessVehicle = "El vehiculo fue procesado";
            $scope.showProcessResult = true;
            $scope.vehicleId = data.vehicle_id;
            $scope.processPromedio = data.averange;

            $scope.processCoincidences = '';
            for (var coincidence in data.coincidence){
               $scope.processCoincidences += ' - '+data.coincidence[coincidence].parameter_name+"="+data.coincidence[coincidence].value; 
            }

            
        }, function(error){
            
            $scope.messageProcessVehicle = "Ocurrio un error y no se proceso";
            $scope.showProcessResult = false;
        })
    }

    $scope.reportFraudVehicle = function (){
        var params = {};
        var body = {};
        $scope.reporteConResultados = false;
        $scope.errorFraudReport = '';
        console.log("Entrando a la funcion de resporte...");
        Report.get(params, body, function(data){
            console.log("si realizo el get...");
            $scope.errorFraudReport = '';
            if(data.total > 0){
            console.log("si encontro resultados...");
            $scope.reporteConResultados = true;
            $scope.vehiclesFraud = data.results;
            $scope.reportFraudTotal = data.total;
            }

        }, function (error){
            $scope.reporteConResultados = false;
            $scope.errorFraudReport = 'Ups!! Ocurrio un error al obtener los datos';
        })
    }


     $scope.getCoincidenciasReport = function(arrayCoincidences){

        var reportFraudCoincidencias = '';
        for(var index in arrayCoincidences){
                reportFraudCoincidencias += arrayCoincidences[index].parameter_name+",";
            }
        return (reportFraudCoincidencias);
            
    }

    function getStartPage(page, maxPage) {
        if (maxPage <= $scope.maxPageIndex || page <= $scope.pageOffset) {
            return 1;
        }

        if (maxPage - page < $scope.pageOffset) {
            return maxPage - $scope.maxPageIndex;
        }

        return page - $scope.pageOffset;
    }

    function getEndPage(page, maxPage) {
        if (maxPage <= $scope.maxPageIndex || maxPage - page < $scope.pageOffset) {
            return maxPage;
        }

        if (page <= $scope.pageOffset) {
            return $scope.maxPageIndex;
        }

        return page + $scope.pageOffset;
    }

    function reloadMaskFraudList(){
        loadMaskFraudList();
        loadShowOption('listMask');
        return;
    }

    function loadShowOption(option){
        switch(option){
            case 'listMask':
                $scope.showDemoMain = false;
                $scope.showMascara = true;
                $scope.showFormNewMask = false;
                $scope.showFormMaskEdit = false;
                $scope.showFormAddValue = false;
                $scope.showSearchParamValue = false;
                $scope.showProcessVehicle = false;
                $scope.showProcessResult = false;
                $scope.showReportFraud = false;
            break;
            case 'newMask':
                $scope.showDemoMain = false;
                $scope.showMascara = false;
                $scope.showFormNewMask = true;
                $scope.showFormMaskEdit = false;
                $scope.showFormAddValue = false;
                $scope.showSearchParamValue = false;
                $scope.showProcessVehicle = false;
                $scope.showProcessResult = false;
                $scope.showReportFraud = false;
            break;
            case 'editMask':
                $scope.showDemoMain = false;
                $scope.showMascara = false;
                $scope.showFormNewMask = false;
                $scope.showFormMaskEdit = true;
                $scope.showFormAddValue = false;
                $scope.showSearchParamValue = false;
                $scope.showProcessVehicle = false;
                $scope.showProcessResult = false;
                $scope.showReportFraud = false;
            break;
            case 'addValueParam':
            console.log("si llego a la opcion del value");
                $scope.showDemoMain = false;
                $scope.showMascara = false;
                $scope.showFormNewMask = false;
                $scope.showFormMaskEdit = false;
                $scope.showFormAddValue = true;
                $scope.showSearchParamValue = false;
                $scope.showProcessVehicle = false;
                $scope.showProcessResult = false;
                $scope.showReportFraud = false;
            break;
            case 'searchValueParam':
                $scope.showDemoMain = false;
                $scope.showMascara = false;
                $scope.showFormNewMask = false;
                $scope.showFormMaskEdit = false;
                $scope.showFormAddValue = true;
                $scope.showSearchParamValue = true;
                $scope.showProcessVehicle = false;
                $scope.showProcessResult = false;
                $scope.showReportFraud = false;
            break;
            case 'process':
                $scope.showDemoMain = false;
                $scope.showMascara = false;
                $scope.showFormNewMask = false;
                $scope.showFormMaskEdit = false;
                $scope.showFormAddValue = false;
                $scope.showSearchParamValue = false;
                $scope.showProcessVehicle = true;
                $scope.showProcessResult = false;
                $scope.showReportFraud = false;
            break;
            case 'report':
                 $scope.showReportFraud = true;
                 $scope.showDemoMain = false;
                $scope.showMascara = false;
                $scope.showFormNewMask = false;
                $scope.showFormMaskEdit = false;
                $scope.showFormAddValue = false;
                $scope.showSearchParamValue = false;
                $scope.showProcessVehicle = false;
                $scope.showProcessResult = false;
            break;
            default:
                $scope.showDemoMain = true;
                $scope.showMascara = false;
                $scope.showFormNewMask = false;
                $scope.showFormMaskEdit = false;
                $scope.showFormAddValue = false;
                $scope.showSearchParamValue = false;
                $scope.showProcessVehicle = false;
                $scope.showProcessResult = false;
                $scope.showReportFraud = false;
        }
    }

    function loadMaskFraudList(){

        var params = {};
        Mask.get(params, function (data){
            $scope.maskFraudError = ''
            $scope.maskFraudTotal = data.parameter_total;
            $scope.maskFraudResults = data.parameters

        }, function (error){
            $scope.maskFraudError = 'Ocurrio un error al buscar los datos!!!';
        });
    }



}