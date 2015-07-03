exports.get = function (request, response){

	var versionId = request.params.versionId;
    var price = Math.floor(Math.random()*1000000)
	var json = {
    "version": {
        "category_id": versionId,
        "name": "4p Premium 5v piel",
        "price": ""+price
    },
    "year": {
        "category_id": "YER10958",
        "name": "2014"
    },
    "model": {
        "category_id": "MOD2060",
        "name": "ILX"
    },
    "mark": {
        "category_id": "MAR54",
        "name": "Acura"
    },
    "country": {
        "category_id": "MX",
        "name": "México"
    }
};
	response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept');
    response.set('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS, HEAD');

    if(versionId == 1){

    	json ={
    		"message": "The version with versionId\u003d111509809 not found",
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

