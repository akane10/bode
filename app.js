const request = require('request');
const T = require('./config.js');

const options = {
  url: 'https://catfact.ninja/fact?max_length=280',
  method: 'GET'
};

function tweet() {
	request(options, (err, response, body) => {
		if (err) throw err;
		const obj = JSON.parse(body);
		T.post('statuses/update', { status: obj.fact }, function(err, data, response) {
			if (err) return console.log(err);
			console.log('done');
		});
	});
};

setInterval(tweet, 28800000); //8 hours
