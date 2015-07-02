'use strict';

/* Filters */

var module = angular.module('possibleFraudFilters', []);

module.filter('userTypeName', function () {
    return function (input) {
        return input == 'car_dealer' ? "Concesionario" : "Inmobiliaria";
    }
});

module.filter('listings', function () {
    return function (input) {
        return input == null ? 0 : input;
    }
});

module.filter('userStatusName', function () {
    return function (input) {
        switch (input) {
            case "active":
                return "Activo";
            case "pending":
                return "Pendiente";
            case "inactive":
                return "Inactivo";
            default:
                return "Ninguno";
        }
    }
});

module.filter('formatDate', function () {
    return function (input) {
        var date = new Date(input);
        var day = date.getDate().toString().length < 2 ? "0" + date.getDate() : date.getDate();
        var currMonth = date.getMonth() + 1;
        var month = currMonth.toString().length < 2 ? "0" + currMonth : currMonth;
        var year = date.getFullYear();

        return day + "/" + month + "/" + year;
    }
});

module.filter('siteIdCountry', function () {
    return function (input) {
        switch (input) {
            case "MLA":
                return "Argentina";
            case "MLB":
                return "Brasil";
            case "MLC":
                return "Chile";
            case "MCO":
                return "Colombia";
            case "MLU":
                return "Uruguay";
            case "MLM":
                return "México";
            case "MLV":
                return "Venezuela";
            default:
                return "";
        }
    }
});

module.filter('cuit', function () {
    return function (input, type) {
        switch (input) {
            case "MLA":
                return "CUIT";
            case "MLB":
                return "CNPJ";
            case "MLC":
                return "RUT";
            case "MCO":
                return type != null && type != "" ? type : "No disponible";
            case "MLU":
                return "RUT";
            case "MLM":
                return "RFC";
            case "MLV":
                return type != null && type != "" ? type : "No disponible";
            default:
                return "RUT";
        }
    }
});

module.filter('state', function () {
    return function (input) {
        switch (input) {
            case "MLA":
                return "Provincia";
            case "MLB":
                return "Estado";
            case "MLC":
                return "Provincia";
            case "MCO":
                return "Departamento";
            case "MLU":
                return "Provincia";
            case "MLM":
                return "Estado";
            case "MLV":
                return "Estado";
            default:
                return "Provincia";
        }
    }
});

module.filter('franchise', function () {
    return function (input) {
        return input == "MLB" ? "Grupo económico" : "Agente Autorizado";
    }
});

module.filter('franchiseValidation', function ($filter) {
    return function (input) {
        return input ? "Usuario de " + $filter('franchise')(appSiteId).toLowerCase() + " válido" :
            "Usuario de " + $filter('franchise')(appSiteId).toLowerCase() + " inválido";
    }
});

module.filter('formatOrigin', function () {
    return function (input) {
        switch (input) {
            case "integrator":
                return "Si";
            default:
                return "No";
        }
    }
});

module.filter('formatEngagement', function () {
    return function (input) {
        switch (input) {
            case "re-engagement":
                return "Si";
            default:
                return "No";
        }
    }
});

module.filter('packDescription', function () {
    return function (input) {
        return input ? input.replace('Paquete ', '').replace('Pacote ', '') : "";
    }
});


