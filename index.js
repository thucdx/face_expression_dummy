var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);

var connectionString = "zk1:2181/kafka"
var last_info = {};

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res) {
	res.render('instant');
});

// Kafka
var kafka = require('kafka-node'),
    Consumer = kafka.HighLevelConsumer,
    client = new kafka.Client(connectionString),
    consumer = new Consumer(
        client,
        [
            {
                topic: 'iot'
            }
        ],
        {
            groupId: 'thucdx' + Math.random() + Math.random() + Math.random(),
            autoCommit: true,
            fromOffset: false
        }
    );



consumer.on('error', function (err) {
    console.log("ERR: " + err);
});


consumer.on('message', function (message) {
    console.log(message);
    value = message.value;

    try {
        value = JSON.parse(value);

        if ("device_type" in value && value["device_type"] == "facial_sensing") {
            info = value;
            socket.emit('news', info);
            console.log("INFO: " + JSON.stringify(info));
        }
    } catch (e) {
        return console.error(e);
    }
});

server.listen(3000, function() {
    console.log('Server is up and listening to port 3000');
});
