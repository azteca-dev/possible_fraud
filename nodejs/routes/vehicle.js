
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
    "stock_number": "2",
    "title": "Volkswagen Beetle 2014 2p Sport 6 vel aut",
    "vehicle": {
        "version": {
            "category_id": "VER45847",
            "name": "2p Sport 6 vel aut"
        },
        "year": {
            "category_id": "YER10841",
            "name": "2014"
        },
        "model": {
            "category_id": "MOD203",
            "name": "Beetle"
        },
        "mark": {
            "category_id": "MAR24",
            "name": "Volkswagen"
        }
    },
    "kilometers": 17849,
    "price": price,
    "description": "¡¡¡ PRECIOS UNICOS !!! SOLO ESTE MES, DE CONTADO O CREDITO BEETLE SPORT CON MOTOR 2.5 con AA, DH, RADIO, RINNES, AIRBAGS, ABS,PIEL,QUEMACOCOS ,FAROS DE NIEBLA Y ELECTRICO con UN ENGANCHE DE $ 52,600.00 ¡ SIN AVAL! Minimos requisitos y hasta 48 meses para pagar,APARTA TU CARRO CON SOLO $ 5,000.00 o tambi?n puedes dejarnos TU AUTO A CUENTA.Para hacer valido este PRECIO, imprimir el anuncio y pasar con Edith Maldonado 1042-4561 ID 52x248432x2 y Jos? Antonio Maldonado 3186-2753. ID 52x248432x3======= WHATSAPP 55 6351-8704======= Contactanos via e-mail comprauto@yahoo.com.mx PARA HACERTE LLEGAR UNA COTIZACION, y visitanos en nuestro Facebook xxx Central Usados VW Circuito xxxen nuestra pagina de internet www.centralusados.com.mx",
    "condition": "usado",
    "dealer": {
        "dealer_ID": "39",
        "comercial_name": "CENTRALUSADOS",
        "email": "david@detocho.com.mx",
        "url": "http://www.centralusados.com.mx",
        "seller_contact": {
            "id": "21",
            "name": "Rosa Edith Maldonado Mendez",
            "email": "david@detocho.com.mx",
            "phone": [
                {
                    "phone_number": "5563815704",
                    "phone_type": "Office"
                }
            ]
        },
        "address": {
            "address_type": "Commercial",
            "street": "BAHIA DE SANTA BARBARA",
            "num_ext": "195",
            "num_int": "",
            "zipcode": "11300",
            "geo_reference": "19.433873980864995, -99.17160721706341, 16z",
            "location": {
                "neighborhood": {
                    "location_id": "COL090161777",
                    "name": "Veronica Anzures"
                },
                "city": {
                    "location_id": "CTY09016",
                    "name": "Miguel Hidalgo"
                },
                "state": {
                    "location_id": "STS09",
                    "name": "Distrito Federal"
                },
                "country": {
                    "location_id": "MX",
                    "name": "México"
                }
            }
        },
        "phones": [
            {
                "nextel_ID": "52*248432*2",
                "phone_number": "5510424561",
                "phone_type": "Nextel"
            },
            {
                "nextel_ID": "52*248432*3",
                "phone_number": "5563815704",
                "phone_type": "Nextel"
            },
            {
                "nextel_ID": "52*248432*3",
                "phone_number": "5531862753",
                "phone_type": "Nextel"
            }
        ],
        "schedule": {
            "monday_friday": "9:00-18:30 hrs",
            "saturday": "09:00 hrs- 16:00 hrs",
            "sunday": "12:00-16:00 hrs"
        }
    },
    "images": [
        {
            "id_images": "1115_11510",
            "url": "https://s3.amazonaws.com/stg01maxiaublica/uploads/2015/6/volkswagen-beetle-2014-2p_sport_6_vel_aut-mp11510_150615-A.jpeg",
            "size": "1200X900"
        },
        {
            "id_images": "1115_11511",
            "url": "https://s3.amazonaws.com/stg01maxiaublica/uploads/2015/6/volkswagen-beetle-2014-2p_sport_6_vel_aut-mp11511_150615-A.jpeg",
            "size": "1200X900"
        },
        {
            "id_images": "1115_11512",
            "url": "https://s3.amazonaws.com/stg01maxiaublica/uploads/2015/6/volkswagen-beetle-2014-2p_sport_6_vel_aut-mp11512_150615-A.jpeg",
            "size": "1200X900"
        },
        {
            "id_images": "1115_11513",
            "url": "https://s3.amazonaws.com/stg01maxiaublica/uploads/2015/6/volkswagen-beetle-2014-2p_sport_6_vel_aut-mp11513_150615-A.jpeg",
            "size": "1200X900"
        },
        {
            "id_images": "1115_11514",
            "url": "https://s3.amazonaws.com/stg01maxiaublica/uploads/2015/6/volkswagen-beetle-2014-2p_sport_6_vel_aut-mp11514_150615-A.jpeg",
            "size": "1200X900"
        },
        {
            "id_images": "1115_11515",
            "url": "https://s3.amazonaws.com/stg01maxiaublica/uploads/2015/6/volkswagen-beetle-2014-2p_sport_6_vel_aut-mp11515_150615-A.jpeg",
            "size": "1200X900"
        },
        {
            "id_images": "1115_11516",
            "url": "https://s3.amazonaws.com/stg01maxiaublica/uploads/2015/6/volkswagen-beetle-2014-2p_sport_6_vel_aut-mp11516_150615-A.jpeg",
            "size": "1200X900"
        },
        {
            "id_images": "1115_11517",
            "url": "https://s3.amazonaws.com/stg01maxiaublica/uploads/2015/6/volkswagen-beetle-2014-2p_sport_6_vel_aut-mp11517_150615-A.jpeg",
            "size": "1200X900"
        },
        {
            "id_images": "1115_11518",
            "url": "https://s3.amazonaws.com/stg01maxiaublica/uploads/2015/6/volkswagen-beetle-2014-2p_sport_6_vel_aut-mp11518_150615-A.jpeg",
            "size": "1200X900"
        },
        {
            "id_images": "1115_11519",
            "url": "https://s3.amazonaws.com/stg01maxiaublica/uploads/2015/6/volkswagen-beetle-2014-2p_sport_6_vel_aut-mp11519_150615-A.jpeg",
            "size": "1200X900"
        },
        {
            "id_images": "1115_11520",
            "url": "https://s3.amazonaws.com/stg01maxiaublica/uploads/2015/6/volkswagen-beetle-2014-2p_sport_6_vel_aut-mp11520_150615-A.jpeg",
            "size": "1200X900"
        },
        {
            "id_images": "1115_11521",
            "url": "https://s3.amazonaws.com/stg01maxiaublica/uploads/2015/6/volkswagen-beetle-2014-2p_sport_6_vel_aut-mp11521_150615-A.jpeg",
            "size": "1200X900"
        },
        {
            "id_images": "1115_11522",
            "url": "https://s3.amazonaws.com/stg01maxiaublica/uploads/2015/6/volkswagen-beetle-2014-2p_sport_6_vel_aut-mp11522_150615-A.jpeg",
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
            "id": "COLORINT-NEGRO",
            "label": "Color interior",
            "value": "Negro"
        },
        "body_type": {
            "id": "BODY-COUPE",
            "label": "Tipo de carrocería",
            "value": "Coupé"
        },
        "armour": {
            "id": "ARMOUR-NO",
            "label": "Blindaje",
            "value": "No"
        },
        "direction": {
            "id": "DIRECCION-ASISTIDA",
            "label": "Dirección",
            "value": "Asistida"
        },
        "colorExt": {
            "id": "COLOREXT-ROJO",
            "label": "Color exterior",
            "value": "Rojo"
        },
        "traction": {
            "id": "TRACTION-DELANTERA",
            "label": "Tracción",
            "value": "Delantera"
        },
        "fuel": {
            "id": "FUEL-GASOLINA",
            "label": "Combustible",
            "value": "Gasolina"
        },
        "vesture": {
            "id": "VESTURE-PIEL",
            "label": "Vestidura",
            "value": "Piel"
        },
        "transmission": {
            "id": "TRANS-TRONIC",
            "label": "Transmisión",
            "value": "Tronic"
        },
        "climate": {
            "id": "CLIMATE-SI",
            "label": "Clima",
            "value": "Si"
        }
    },
    "equipment": {
        "id": "equipment_group",
        "label": "Equipamiento",
        "electric_group": {
            "id": "electric_group",
            "label": "Equipo eléctrico"
        },
        "security_group": {
            "id": "security_group",
            "label": "Seguridad"
        },
        "comfort_group": {
            "id": "comfort_group",
            "label": "Comfort"
        },
        "documents_group": {
            "id": "documents_group",
            "label": "Documentos"
        },
        "gadgets_group": {
            "id": "gadgets_group",
            "label": "Gadgets"
        },
        "extra_group": {
            "id": "extra_group",
            "label": "Extra"
        },
        "audio_group": {
            "id": "audio_group",
            "label": "Audio"
        }
    },
    "status": "active",
    "listing_type": "premium"
}


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