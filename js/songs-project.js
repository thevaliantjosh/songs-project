let Spotify = require('spotify-web-api.js');
let s = new Spotify();

//s.searchTracks();

let spotifyApi = new SpotifyWebApi();

let client_id = SPOTIFY_CLIENT_ID;
let client_secret = SPOTIFY_CLIENT_SECRET;

let authOptions = {
    url: 'https://accounts.spotiy.com/api/token',
    headers: {
        'Authorization' : 'Basic' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    }, form: {
        grant_type: 'client_credentials'
},
    json: true
};

request.post(authOptions, function(error, response, body){
    if (!error && response.statusCode === 200){
        //use the access token to access the Spotify Web API
        let token = body.clientId
    }
})

spotifyApi.setAccessToken(SPOTIFY_CLIENT_ID);

spotifyApi.getArtistAlbums(SPOTIFY_CLIENT_ID, function(err, data){
    if(err) console.error(err);
    else console.log('Artist albums', data);
});

spotifyApi.getArtistAlbums(SPOTIFY_CLIENT_ID).then(
    function(data){
        console.log('Artist albums', data);
    },
    function (err) {
        console.log(err);
    }
);