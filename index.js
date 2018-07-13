const Twitter = require('twitter');

const config = require('./config/config');

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY || config.consumer_key,
  consumer_secret: process.env.CONSUMER_SECRET || config.consumer_secret,
  access_token_key: process.env.ACCESS_TOKEN_KEY || config.access_token_key,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET || config.access_token_secret
});

const streamTo = (trackFilter = '', streamHandler = (err, tweet) => {}) => {
  client.stream('statuses/filter', { track: trackFilter }, (stream) => {
    stream.on('data', (tweet) => {
      streamHandler(null, tweet);
    });
    stream.on('error', (error) => {
      streamHandler(error);
    });
  });
};


streamTo('@officialLRT1', (err, tweet) => {
  if (err) return console.log('error on stream', err);
  if (!tweet.retweeted) {
    console.log('Tweet to @officialLRT1 -', tweet.text);
  }
});

streamTo('from:officialLRT1', (err, tweet) => {
  if (err) return console.log('error on stream', err);
  console.log('Tweet by @officialLRT1 -', tweet.text);
});