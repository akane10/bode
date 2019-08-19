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
  return qoute;
};

const uploadimg = () => {
  const filename = Math.random()
    .toString(36)
    .substring(7);
  const uri = 'https://cataas.com/cat/cute';

  request(uri)
    .pipe(fs.createWriteStream(filename))
    .on('close', async () => {
      try {
        const b64content = fs.readFileSync(filename, { encoding: 'base64' });
        const data = await T.post('media/upload', { media_data: b64content });

        const mediaIdStr = data.data.media_id_string;
        const altText = 'Have a nice day.';
        const meta_params = {
          media_id: mediaIdStr,
          alt_text: { text: altText }
        };

        await T.post('media/metadata/create', meta_params);

        const status = getQoute();
        const params = { status: status, media_ids: [mediaIdStr] };

        await T.post('statuses/update', params);
        console.log('uploadImg done');
        fs.unlinkSync(filename);
      } catch (e) {
        console.log(e);
        return app();
      }
    });
};

module.exports = uploadimg;
