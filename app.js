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
  url: 'https://geek-jokes.sameerkumar.website/api',
  method: 'GET'
}

function tweet() {
	request(options, (err, response, body) => {
		const joke = body.replace(/&quot;/g,'"');
		const characters = joke.length;
		if (characters > 280) return tweet();
		T.post('statuses/update', { status: joke }, function(err, data, response) {
			console.log('done');
		});
	});
}

setInterval(tweet, 1500);
