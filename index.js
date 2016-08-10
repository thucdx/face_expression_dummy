var connectionString = "10.22.20.201:2181/kafka"
var last_info = {};

var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.Client(connectionString),
    consumer = new Consumer(
        client,
        [
            { topic: 'iot', partition: 0 }
        ],
        {
            autoCommit: false,
         	fromOffset: false
        }
    );


consumer.on('message', function (message) {
    console.log(message);
    last_info = message.value;
    // last_info = JSON.parse(message.value);
    console.log(last_info);
});

consumer.on('error', function (err) {
	console.log("error: " + err);
});


var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Just hello page
app.get('/', function(req, res) {
	console.log(last_info);
	res.render('info', {info: JSON.parse(last_info)});
});

app.listen(3000, function() {
	console.log('Server is up and listening to port 3000');
})
