const request = require('request');
const T = require('./config');

const options = {
  url: 'https://catfact.ninja/fact?max_length=270',
  method: 'GET'
};

const catFact = () => {
	request(options, (err, response, body) => {
		if (err) throw err;
		const obj = JSON.parse(body);
		T.post('statuses/update', { status: `${obj.fact} #catFact` }, function(err, data, response) {
			console.log('catFact done');
		});
	});
}

module.exports = catFact;
