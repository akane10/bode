const fs = require('fs');
const request = require('request');
const T = require('./config');
const quotes = require('./quotes');

const getQoute = () => {
	const index = Math.floor(Math.random() * Math.floor(37));
	return quotes[index].qoute
};

const uploadimg = () => {
	const filename = Math.random().toString(36).substring(7);
	request('https://cataas.com/cat/cute').pipe(fs.createWriteStream(filename)).on('close', () => {
		const b64content = fs.readFileSync(filename, { encoding: 'base64' });

		T.post('media/upload', { media_data: b64content }).then((data, res) => {

			const mediaIdStr = data.data.media_id_string;
		  const altText = "Have a nice day.";
		  const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };

		  T.post('media/metadata/create', meta_params).then((data, res) => {

		  	const status = getQoute();
	      const params = { status: status, media_ids: [mediaIdStr] };

				T.post('statuses/update', params).then((data, res) => {

					console.log('getQoute done');
      		fs.unlinkSync(filename);

				})
				.catch(e => console.log('upload :', e.message));	      
		  })
		  .catch(e => console.log('metadata :', e.message));
		})
		.catch(e => console.log('post :', e.message));
	});
};

module.exports = uploadimg;
