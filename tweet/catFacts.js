// const request = require('request');
const rp = require('request-promise');
const T = require('../config');
const app = require('../app');

const options = {
  url: 'https://catfact.ninja/fact?max_length=267',
  method: 'GET'
};

async function catFact() {
  try {
    const res = await rp(options);
    const obj = JSON.parse(res);

    await T.post('statuses/update', { status: `${obj.fact} #catFact #cat` });
    console.log('catFact done');
  } catch (e) {
    console.log(e);
    return app();
  }
}

module.exports = catFact;
