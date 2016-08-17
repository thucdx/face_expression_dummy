var connectionString = "zk1:2181/kafka"

var kafka = require('kafka-node'),
    HighLevelProducer = kafka.HighLevelProducer,
    client = new kafka.Client(connectionString),
    producer = new HighLevelProducer(client),
    payloads = [
        { topic: 'topic1', messages: 'hi' },
        { topic: 'topic2', messages: ['hello', 'world'] }
    ];

producer.on('ready', function () {
    producer.send(payloads, function (err, data) {
    	if (err) {
    		console.log("ERR: " + err);
    	} else {
        	console.log(data);
    	}
    });
});

