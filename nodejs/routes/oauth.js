exports.post = function(request, response){

	var json;

	json = {
    "access_token": "MP_E71D1EB3C7C011DD924F72636AE3AD5E38477BEBD1A3A4859C42647D6B2F8889_3",
    "token_expiration_date": "07-16-2015",
    "user_id": 3,
    "user_type": "admin"
	};

	response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept');
    response.set('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS, HEAD');

    response.json(202, json)

}

exports.options = function (request, response) {
    response.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept');
    response.set('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS, HEAD');
    response.set('Access-Control-Allow-Origin', '*');
    response.send(202);
}