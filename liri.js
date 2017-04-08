var  Twitter = require("twitter");
var  spotify = require("spotify");
var  request = require("request");
var  keys = require("./keys.js");
var  fs = require("fs");


var Command = process.argv[2];
var Arg = process.argv[3];

var Client = new Twitter ({
  consumer_key: keys.TWITTER.CONSUMER_KEY,
  consumer_secret: keys.TWITTER.CONSUMER_SECRET,
  access_token_key: keys.TWITTER.ACCESS_TOKEN_KEY,
  access_token_secret: keys.TWITTER.ACCESS_TOKEN_SECRET
});

 GetCommands(Command,Arg);

function GetCommands(Command,Arg)
{
switch(Command) {

 case "my-tweets":

         var params = {screen_name: 'Noushin SJD'};
         Client.get('statuses/user_timeline', params, function(error, tweets, response) {
         if (error) {
            throw error;
           }

          console.log("**************************************************");
          console.log("Last 20 tweets:");
          for (i = 0; i < tweets.length; i++) {
             console.log(tweets[i].text);
           }
          console.log("**************************************************");
         });

        break;

 case "spotify-this-song":

      if (Arg === undefined) {
           console.log("*********************************************");
                 console.log("Artist_Name: Ace of Base");
                 console.log("Album_Name: Hidden Gems");
                 console.log("the song's Name: Make My Day");
                 console.log("Preview:https://p.scdn.co/mp3-preview/bcc44e91d5e161034f8d7126fe004e51ff3083fa?cid=null");
           console.log("================================================");
       }

     else
     {
        var params = 
        {
        	type: 'track', 
        	query: Arg.trim(),
        	//limit : 2
        };

        spotify.search(params, function(err, data) {

         if ( err ) {
            console.log('Error occurred: ' + err);
         }

         else
            //console.log(data);
           for (i = 0; i < data.tracks.items.length; i++) {
            console.log("*********************************************");
               console.log("The Name of Album : " + data.tracks.items[i].album.name);
               console.log("The Name of Artist : " + data.tracks.items[i].album.artists.name);
               console.log("The Song's of Name : " + data.tracks.items[i].name);
               console.log("Preview : " + data.tracks.items[i].preview_url);
           console.log("*********************************************");          
            }


         });
    }
    
     break;

    case "movie-this":

      if (Arg === undefined) {

          Arg = "Mr. Nobody";
       }

      request("http://www.omdbapi.com/?t="+Arg.trim(), function(error, response, body) {
       if (!error && response.statusCode === 200) {

       	var movie = JSON.parse(body);
       	console.log("**************************************");
           console.log("Title: " + movie.Title);
           console.log("Year: " + movie.Year);
           console.log("IMDB Rating: " + movie.imdbRating);
           console.log("Country: " + movie.Country);
           console.log("Language: " + movie.Language);
           console.log("Actors: " + movie.Actors);
           console.log("Plot: " +movie.Plot);
           console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
        console.log("**************************************");
        //console.log("The movie is: " + JSON.parse(body));
       }
        });
    
      break;

      case "do-what-it-says":
      
      	fs.readFile("random.txt", "utf8", function(error, data) {
        var CommandArg = data.split(",");
         Command =  CommandArg[0];
         Arg =  CommandArg[1];
        GetCommands(Command,Arg);
      });
    
       break;

    default:
     console.log("you didn't write right command");
        
}
}
