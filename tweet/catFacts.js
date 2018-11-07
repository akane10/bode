const request = require('request');
const T = require('../config');
const app = require('../app');

const options = {
  url: 'https://catfact.ninja/fact?max_length=267',
  method: 'GET'
};

const catFact = () => {
	request(options, (err, res, body) => {
		if (err) {
			console.log(err);
			return app();
		}
		const obj = JSON.parse(body);

		T.post('statuses/update', { status: `${obj.fact} #catFact #cat` }).then((data, res) => {
			console.log('catFact done');
		})
		.catch(e => {
			console.log(e.message);
			return app();
		});

	});
};

module.exports = catFact;
