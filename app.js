const Twit = require('twit');
const fs = require('fs');
const request = require('request');

const key = require('./keys.js');
 
const T = new Twit({
  consumer_key: key.consumer_key,
  consumer_secret: key.consumer_secret,
  access_token: key.access_token,
  access_token_secret: key.access_token_secret,
});

const options = {
  url: 'http://api.icndb.com/jokes/random/',
  method: 'GET'
};

function tweet() {
	request(options, (err, response, body) => {
		if (err) throw err;
		const data = JSON.parse(body).value.joke;
		const joke = data.replace(/&quot;/g,'"');
		const characters = joke.length;
		if (characters > 280) return tweet();
		console.log(joke);
		T.post('statuses/update', { status: joke }, function(err, data, response) {
			console.log('done');
		});
	});
}

setInterval(tweet, 28800000); //8 hours
