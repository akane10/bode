const Twit = require('twit');
const request = require('request');

const key = require('./keys.js');
 
const T = new Twit({
  consumer_key: key.consumer_key,
  consumer_secret: key.consumer_secret,
  access_token: key.access_token,
  access_token_secret: key.access_token_secret,
});

const options = {
  url: 'https://catfact.ninja/fact?max_length=280',
  method: 'GET'
};

function tweet() {
	request(options, (err, response, body) => {
		if (err) throw err;
		const obj = JSON.parse(body);
		T.post('statuses/update', { status: obj.fact }, function(err, data, response) {
			console.log('done');
		});
	});
}

setInterval(tweet, 28800000); //8 hours
