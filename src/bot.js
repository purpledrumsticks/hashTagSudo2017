let express = require('express');
let twit = require('twit');
let config = require('./config.js');
let app = express();
let http = require('http');

let Twitter = new twit(config);

const postTweet = function postTweet () {
  Twitter.post('statuses/update', {status: '#sudo2017'}, (err, data, response) => {
    console.log(data);
  });
}

postTweet();


setInterval(postTweet, 60000);

app.listen(process.env.PORT || 5000, function () {
  console.log('#sudo2017 is listening on port 5000');
})

setInterval(() => {
  http.get("http://http://hash-tag-sudo-2017.herokuapp.com/");
}, 180000);
