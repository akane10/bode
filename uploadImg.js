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

		// first we must post the media to Twitter
		T.post('media/upload', { media_data: b64content }, function (err, data, response) {
			if (err) return console.log('first :', err.message);

		  const mediaIdStr = data.media_id_string;
		  const altText = "Have a nice day.";
		  const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };
		 
		  T.post('media/metadata/create', meta_params, function (err, data, response) {
		  	if (err) return console.log('second :', err.message);
	      // now we can reference the media and post a tweet (media will attach to the tweet)
	    	const status = getQoute();
	      const params = { status: status, media_ids: [mediaIdStr] };
	 
	      T.post('statuses/update', params, function (err, data, response) {
	        console.log('getQoute done');
      		fs.unlinkSync(filename);
	      });
		  });
		});
	});
};

module.exports = uploadimg;
