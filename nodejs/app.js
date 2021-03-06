var express 	= require('express'),
	misc 		= require('./routes/misc'),
	vehicle		= require('./routes/vehicle'),
	catalog		= require('./routes/catalog'),
	oauth		= require('./routes/oauth'),
   	dummy 		= require('./routes/dummy');
   	//misc = require('./routes/misc');

var app = express();

app.set('port', process.env.PORT || 8888);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/ping',misc.ping);
app.get('/dummy',dummy.getDummyInfo);

app.get('/vehicletest/:vehicleId', vehicle.get);
app.get('/catalogV2/MX/MXP/:versionId', catalog.get);

app.post('/oauth/', oauth.post);
app.options('/oauth/', oauth.options);


//
// 404 
//
app.all('*', misc.notFound);


app.listen(app.get('port'), function(){
	console.log("Mock maxipublica server listening on port " + app.get('port'));
});

