const uploadImg = require('./tweet/uploadImg');
const catFact = require('./tweet/catFacts');

function tweet() {
  const num = Math.floor(Math.random() * Math.floor(2));
  if (num === 1) return catFact();
  return uploadImg();
}

setInterval(tweet, 46800000); //13 hours

module.exports = tweet;
