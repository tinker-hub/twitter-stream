const Twitter = require('twitter');

const config = require('./config/config');

const streamTracks = config.streamTracks;
const client = new Twitter(config.twitter);

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

streamTracks.forEach((streamTrack) => {
  streamTo(streamTrack, (err, tweet) => {
    if (err) return console.log('error on stream', err);
    if (!tweet.retweeted) {
      console.log(`Tweet to ${tweet.user.name} -`, tweet.text);
    }
  });
});