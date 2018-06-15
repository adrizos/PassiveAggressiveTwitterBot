//PassAggressiveTwitterBot
// ¯\_(ツ)_/¯

//dependencies: Twit api for Javascript that interfaces with Twitter API
//



//terminal alert that bot is up
console.log('PassAggressiveTwitterBot is starting');
//presetup variables
var Twit = require('twit'); // import statement for Twit package
var fs = require('fs');
var path = require('path');
var config = require('./config'); //grab validation info for my twitter account from another file
var T = new Twit(config); //make a new Twit object for replies

//setup variables
var targetUserID = 'yoursgoeshere'; // target user id
var targetScreenName = 'yoursgoeshere'; //target screen name
var stream = T.stream('statuses/filter', { follow: targetUserID}); //setting up a user stream for replies

//call on stream and tell it which function to call on event retrieval
stream.on('tweet', tweetResponse); //anytime user tweets

//function called on stream event
function tweetResponse(eventMsg) {
    console.log(eventMsg.text); //debugging, check if the event text is the tweet
    var name = eventMsg.user.name; //this function wants this to be the target we'll check below
    console.log('Name: ' + name);
    var screenName = eventMsg.user.screen_name;
    console.log('Screen Name: ' + screenName);
    var tweetedAt = eventMsg.in_reply_to_screen_name;
    console.log('Tweeted At: ' + tweetedAt + '\n\n');
    var text = eventMsg.text;

    //check that the tweet came from the target and respond
    //if
    if (screenName === 'YOURTWITTERSCREENNAME'){
        //skipping my replies that show up in his feed
    }
    //if the target tweets
    else if (screenName === 'TARGETUSERSCREENNAME') {
      fs.readdir(__dirname + '/images', function(err, files) {
        if (err){
          console.log(err);
        }
        else{
          var images = [];
          files.forEach(function(f) {
            images.push(f);
          });
          //call main worker function
          upload_random_image(images,text);

        } // end of else
      }); // end of readdir callback




    }//end of else if
}//end of tweetResponse
function random_from_array(images){
  return images[Math.floor(Math.random() * images.length)];
}

function upload_random_image(images,text){
  console.log('Opening an image...');
  var image_path = path.join(__dirname, '/images/' + random_from_array(images)),
      b64content = fs.readFileSync(image_path, { encoding: 'base64' });

  console.log('Uploading an image...');

  T.post('media/upload', { media_data: b64content }, function (err, data, response) {
    if (err){
      console.log('ERROR:');
      console.log(err);
    }
    else{
      console.log('Image uploaded!');
      console.log('Now tweeting it...');

      T.post('statuses/update', {

        status: text + ' ' + random_from_array([
          '#hashtag1'
          '#hashtag2',
          '#hashtag3',
          '#hashtag4',
          '#hashtag5',
          '#hashtag6',
          '#hashtag7',
        ]) + ' P.S. Im just a bot...',
        media_ids: new Array(data.media_id_string)
      },
        function(err, data, response) {
          if (err){
            console.log('ERROR:');
            console.log(err);
          }
          else{
            console.log('Posted an image!');
          }
        }
      );
    }
  });
}//end of tweetrandomimage
