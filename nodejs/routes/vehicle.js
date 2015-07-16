
exports.get = function (request, response){
	
	var vehicleId = request.params.vehicleId;

	var json;

    var price = 756000
    var definePrice =Math.floor(Math.random()*10)

    if(definePrice >= 5){
        price = 50000

    }

	json = {
    "id": vehicleId,
    "stock_number": "mxp001",
    "title": "Ford Explorer 2010 5p Limited V6 4x2 SYNC",
    "vehicle": {
        "version": {
            "category_id": "VER39250",
            "name": "5p Limited V6 4x2 SYNC"
        },
        "year": {
            "category_id": "YER9093",
            "name": "2010"
        },
        "model": {
            "category_id": "MOD100",
            "name": "Explorer"
        },
        "mark": {
            "category_id": "MAR10",
            "name": "Ford"
        }
    },
    "kilometers": 67045,
    "price": price,
    "description": "Anuncio de prueba favor de no preguntar",
    "number_plate": "NO",
    "condition": "usado",
    "dealer": {
        "dealer_ID": "57",
        "comercial_name": "SÁNCHEZ AUTOMOTRIZ, S.A. DE C.V.",
        "email": "distribuidores70626@exagono.net",
        "url": "http://www.fordsanchez.mx",
        "photo": "",
        "logo": "",
        "seller_contact": {
            "id": "57",
            "name": "SÁNCHEZ AUTOMOTRIZ, S.A. DE C.V.",
            "email": "distribuidores70626@exagono.net",
            "phone": [
                {
                    "phone_number": "2484875098",
                    "phone_type": "Office"
                }
            ]
        },
        "address": {
            "address_type": "Both",
            "street": "Blvd. Alfredo del Mazo ",
            "num_ext": "1514",
            "num_int": "",
            "zipcode": "50070",
            "geo_reference": "19.432602,-99.133205,17z",
            "location": {
                "neighborhood": {
                    "location_id": "COL151060236",
                    "name": "Independencia"
                },
                "city": {
                    "location_id": "CTY15106",
                    "name": "Toluca"
                },
                "state": {
                    "location_id": "STS15",
                    "name": "México"
                },
                "country": {
                    "location_id": "MX",
                    "name": "México"
                }
            }
        },
        "phones": [
            {
                "extension": "",
                "nextel_ID": "",
                "phone_number": "2484875098",
                "phone_type": "Office"
            }
        ],
        "association": {
            "acao": "",
            "amdf": "true",
            "anca": "",
            "apca": "",
            "honda": "",
            "toyota": ""
        },
        "sites_actived": [
            {
                "id_site": "cmm",
                "key": "not active",
                "label": "Carmudi",
                "levels_add": [
                    "unique"
                ],
                "paused_allowed": "true"
            },
            {
                "id_site": "crm",
                "key": "not active",
                "label": "CarsMexico",
                "levels_add": [
                    "unique"
                ],
                "paused_allowed": "false"
            },
            {
                "id_site": "dmm",
                "key": "not active",
                "label": "Demotores y Seminuevos",
                "levels_add": [
                    "unique"
                ],
                "paused_allowed": "false"
            },
            {
                "id_site": "mlm",
                "key": "true",
                "label": "MercadoLibre y Autoplaza",
                "levels_add": [
                    "1_Plata",
                    "2_Oro",
                    "3_Oropremium"
                ],
                "paused_allowed": "true"
            },
            {
                "id_site": "sam",
                "key": "not active",
                "label": "Soloautos",
                "levels_add": [
                    "unique"
                ],
                "paused_allowed": "false"
            },
            {
                "id_site": "smm",
                "key": "not active",
                "label": "Segundamano",
                "levels_add": [
                    "unique"
                ],
                "paused_allowed": "false"
            },
            {
                "id_site": "vam",
                "key": "not active",
                "label": "Vivanuncios",
                "levels_add": [
                    "unique"
                ],
                "paused_allowed": "false"
            }
        ],
        "social_media": {
            "facebook": "",
            "google_plus": "",
            "linkedlist": "",
            "twitter": ""
        },
        "schedule": {
            "monday_friday": "",
            "saturday": "",
            "sunday": ""
        },
        "dealer_key": "F6C6695545F0C0D253042C25ADEA370DEE2738A1B4A85190930D747FB541F44514FFE9327CDA97E7CA563107170F9873"
    },
    "images": [
        {
            "id_images": "1500_16093",
            "url": "https://s3.amazonaws.com/stg01maxiaublica/uploads/api2.maxipublica.com/2015/7/57/1500/ford-explorer-2010-5p_limited_v6_4x2_sync-mp16093_150715133240-A.jpeg",
            "size": "1200X900"
        }
    ],
    "attributes": {
        "id": "attributes_group",
        "label": "Ficha Tecnica",
        "currencies": {
            "id": "CURRENCIE-MXN",
            "label": "Moneda",
            "value": "MXN"
        },
        "colorInt": {
            "id": "COLORINT-OTRO",
            "label": "Color interior",
            "value": "Otro"
        },
        "body_type": {
            "id": "BODY-SEDAN",
            "label": "Tipo de carrocería",
            "value": "Sedán"
        },
        "colorExt": {
            "id": "COLOREXT-OTRO",
            "label": "Color exterior",
            "value": "Otro"
        },
        "vesture": {
            "id": "VESTURE-OTRO",
            "label": "Vestidura",
            "value": "Otro"
        },
        "transmission": {
            "id": "TRANS-AUTOMATICA",
            "label": "Transmisión",
            "value": "Automática"
        }
    },
    "equipment": {},
    "published_sites": {
        "cmm": {
            "id": "",
            "url": "",
            "visits": "",
            "leads": "",
            "calls": "",
            "date_create": "",
            "date_update": "",
            "date_delete": "",
            "date_expiration": "",
            "comment": "",
            "level_add": "unique",
            "status": "unpublish",
            "action": "nothing",
            "bitacora_id": ""
        },
        "crm": {
            "id": "",
            "url": "",
            "visits": "",
            "leads": "",
            "calls": "",
            "date_create": "",
            "date_update": "",
            "date_delete": "",
            "date_expiration": "",
            "comment": "",
            "level_add": "unique",
            "status": "unpublish",
            "action": "nothing",
            "bitacora_id": ""
        },
        "dmm": {
            "id": "",
            "url": "",
            "visits": "",
            "leads": "",
            "calls": "",
            "date_create": "",
            "date_update": "",
            "date_delete": "",
            "date_expiration": "",
            "comment": "",
            "level_add": "unique",
            "status": "unpublish",
            "action": "nothing",
            "bitacora_id": "",
            "id_img": ""
        },
        "mlm": {
            "id": "MLM505406541",
            "url": "http://auto.mercadolibre.com.mx/MLM-505406541-ford-explorer-2010-5p-limited-v6-4x2-sync-_JM",
            "visits": "",
            "leads": "",
            "calls": "",
            "date_create": "2015-07-15 13:33:04",
            "date_update": "2015-07-15 13:33:04",
            "date_delete": "",
            "date_expiration": "2015-08-14T20:33:06.764Z",
            "comment": "Exitoso",
            "level_add": "gold_premium",
            "status": "published",
            "action": "nothing",
            "bitacora_id": "18501",
            "official_store_id": ""
        },
        "sam": {
            "id": "",
            "url": "",
            "visits": "",
            "leads": "",
            "calls": "",
            "date_create": "",
            "date_update": "",
            "date_delete": "",
            "date_expiration": "",
            "comment": "",
            "level_add": "unique",
            "status": "unpublish",
            "action": "nothing",
            "bitacora_id": ""
        },
        "smm": {
            "id": "",
            "url": "",
            "visits": "",
            "leads": "",
            "calls": "",
            "date_create": "",
            "date_update": "",
            "date_delete": "",
            "date_expiration": "",
            "comment": "",
            "level_add": "unique",
            "status": "unpublish",
            "action": "nothing",
            "bitacora_id": ""
        },
        "vam": {
            "id": "",
            "url": "",
            "visits": "",
            "leads": "",
            "calls": "",
            "date_create": "",
            "date_update": "",
            "date_delete": "",
            "date_expiration": "",
            "comment": "",
            "level_add": "unique",
            "status": "unpublish",
            "action": "nothing",
            "bitacora_id": ""
        }
    },
    "vehicle_by_sites": {
        "mlm": {
            "id_site": "MLM505406541",
            "listing_type_id": "gold_premium",
            "id_mxp": "1500",
            "id_user": "57",
            "createDate": "Jul 15, 2015 1:32:39 PM",
            "lastUpdate": "Jul 15, 2015 1:32:43 PM",
            "title": "Ford Explorer 2010 5p Limited V6 4x2 SYNC",
            "category_id": "MLM24333",
            "price": "255000.0",
            "currency_id": "MXN",
            "site_id": "MLM",
            "available_quantity": "1",
            "buying_mode": "classified",
            "condition": "used",
            "description": "MAXIPUBLICA1500\nAnuncio de prueba favor de no preguntar",
            "warranty": "1 mes",
            "pictures": [
                {
                    "source": "https://s3.amazonaws.com/stg01maxiaublica/uploads/api2.maxipublica.com/2015/7/57/1500/ford-explorer-2010-5p_limited_v6_4x2_sync-mp16093_150715133240-A.jpeg"
                }
            ],
            "attributes": [
                {
                    "id": "MLM1744-KMTS",
                    "name": "Kilómetros",
                    "value_id": "",
                    "value_name": "67045",
                    "attribute_group_id": "FIND",
                    "attribute_group_name": "Ficha técnica"
                },
                {
                    "id": "MLM1744-VERS",
                    "name": "Versión",
                    "value_id": "",
                    "value_name": "5p Limited V6 4x2 SYNC",
                    "attribute_group_id": "FIND",
                    "attribute_group_name": "Ficha técnica"
                },
                {
                    "id": "MLM1744-YEAR",
                    "name": "Año",
                    "value_id": "MLM1744-YEAR-2010",
                    "value_name": "2010",
                    "attribute_group_id": "FIND",
                    "attribute_group_name": "Ficha técnica"
                },
                {
                    "id": "MLM1744-COLOREXT",
                    "name": "",
                    "value_id": "MLM1744-COLOREXT-OTRO",
                    "attribute_group_id": "FIND",
                    "attribute_group_name": "Ficha técnica"
                },
                {
                    "id": "MLM1744-TRANS",
                    "name": "",
                    "value_id": "MLM1744-TRANS-AUTOMATICA",
                    "attribute_group_id": "FIND",
                    "attribute_group_name": "Ficha técnica"
                }
            ],
            "location": {
                "address_line": "",
                "zip_code": "50070",
                "subneighborhood": "",
                "neighborhood": {
                    "id": "",
                    "name": "Independencia"
                },
                "city": {
                    "id": "TUxNQ1RPTDc0Mzc",
                    "name": "Toluca"
                },
                "country": {
                    "id": "MX",
                    "name": "México"
                },
                "latitude": "",
                "longitude": ""
            }
        }
    },
    "status": "active",
    "listing_type": "basic",
    "createDate": "Jul 15, 2015 1:32:39 PM",
    "lastUpdate": "Jul 15, 2015 1:32:43 PM",
    "origin_create": "webservice",
    "origin_update": ""
};


	response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept');
    response.set('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS, HEAD');

    if(vehicleId == 1){

    	json ={
    		"message": "The Car with car_id\u003d111509809 not found",
    		"status": 404,
    		"error": "not_found"
		};
		
		response.json(404, json)

    }else{

		response.json(200,json)
    }

    
}


exports.options = function (request, response) {
    response.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept');
    response.set('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS, HEAD');
    response.set('Access-Control-Allow-Origin', '*');
    response.send(200);
}