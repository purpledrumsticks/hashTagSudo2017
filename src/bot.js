let express = require('express');
let twit = require('twit');
let config = require('./config.js');
let app = express();
let http = require('http');

let Twitter = new twit(config);

const ranDom = function (arr) {
  let index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

const retweet = function () {
  let params = {
    q: '%40sudo2017 OR %23sudo2017 OR sudo2017:media OR %40HackStetson OR %23HackStetson',
    result_type: 'mixed OR recent OR popular',
    lang: 'en'
  }

  Twitter.get('search/tweets', params, function (err,data) {

    let tweet = data.statuses;
    let randomTweet = ranDom(tweet);

    if (typeof randomTweet !== 'undefined') {
      Twitter.post('statuses/retweet/:id', {
        id: randomTweet.id_str
      }, function (err,response) {
        if (response) {
          console.log('Retweeted!');
        }

        if (err) {
          console.log('Cannot be retweeted :( something went wrong');
        }
      });
    }
    else {
      console.log('Something went wrong while searching for tweet');
    }
  })
}

retweet();
setInterval(retweet, 60000 * 60);

const postTweet = function postTweet () {
  Twitter.post('statuses/update', {status: '#sudo2017'}, (err, data, response) => {
    console.log(data);
  });
}

postTweet();

app.listen(process.env.PORT || 5000, function () {
  console.log('#sudo2017 is listening on port 5000');
})

setInterval(() => {
  http.get("http://http://hash-tag-sudo-2017.herokuapp.com/");
}, 180000);
