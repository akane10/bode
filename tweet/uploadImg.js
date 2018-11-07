const fs = require('fs');
const request = require('request');
const T = require('../config');
const quotes = require('../quotes');
const app = require('../app');

const getQoute = () => {
	const totalQuotes = quotes.length;
	const index = Math.floor(Math.random() * Math.floor(totalQuotes));
	const qoute = quotes[index].qoute;
	const qouteLength = qoute.length;
	
	if (qouteLength > 280) return getQoute();
	return qoute
};

const uploadimg = () => {
	const filename = Math.random().toString(36).substring(7);
	const uri = 'https://cataas.com/cat/cute';

	request(uri).pipe(fs.createWriteStream(filename)).on('close', () => {
		const b64content = fs.readFileSync(filename, { encoding: 'base64' });

		T.post('media/upload', { media_data: b64content }).then((data, res) => {

			const mediaIdStr = data.data.media_id_string;
		  const altText = 'Have a nice day.';
		  const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };

		  T.post('media/metadata/create', meta_params).then((data, res) => {

		  	const status = getQoute();
	      const params = { status: status, media_ids: [mediaIdStr] };

				T.post('statuses/update', params).then((data, res) => {

					console.log('uploadImg done');
      		fs.unlinkSync(filename);

				})
				.catch(e => {
					console.log('upload :', e.message);
					return app();
				});
		  })
		  .catch(e => {
		  	console.log('metadata :', e.message);
		  	return app();
		  });
		})
		.catch(e => {
			console.log('post :', e.message);
			return app();
		});
	});
};

module.exports = uploadimg;
