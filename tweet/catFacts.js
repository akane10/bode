const request = require('request');
const T = require('../config');

const options = {
  url: 'https://catfact.ninja/fact?max_length=267',
  method: 'GET'
};

const catFact = () => {
	request(options, (err, res, body) => {
		if (err) throw err;
		const obj = JSON.parse(body);

		T.post('statuses/update', { status: `${obj.fact} #catFact #cat` }).then((data, res) => {
			console.log('catFact done');
		})
		.catch(e => console.log(e.message));

	});
};

module.exports = catFact;
