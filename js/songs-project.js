

const SPOTIFYController = (function() {

    const clientId = SPOTIFY_CLIENT_ID;
    const clientSecret = SPOTIFY_CLIENT_SECRET;


    //private methods

    const getToken = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });
        const data = await result.json();
        return data.access_token;
    }



    const getGenres = async (token) => {
        const result = await fetch('https:api.spotify.com/v1/browse/categories?locale=sv_US',{
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + token
            }
        });
        const data = await result.json();
        return data.categories.items;

    }

    const getPlaylistByGenre = async (token, genreId) => {
        const limit = 10;

        const result = await fetch(`https:api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,{
            method: 'GET',
            headers: {'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.playlists.items;
    }

    const getTracks = async (token, tracksEndPoint) => {
        const limit = 10;

        const result = await fetch(`${tracksEndPoint}?limit=${limit}`,{
            method: 'GET',
            headers: {'Authorization' : 'Bearer ' + token}

        });
        const data = await result.json();
        return data;
    }

    const getTrack = async (token, trackEndPoint) => {
        const result = await fetch(`${trackEndPoint}`, {
            method: 'GET',
            headers: {'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data;
    }

    return {
        getToken() {
            return getToken();

        },
        getGenres(token){
            return getGenres(token);
        },
        getPlaylistByGenre(token, genreId){
            return getPlaylistByGenre(token, genreId);
        },
        getTracks(token, tracksEndPoint){
            return getTracks(token, tracksEndPoint);
        },
        getTrack(token, trackEndPoint){
            return getTrack(token, trackEndPoint);
        }
    }

})();


const request = require('spotify-api.js'); // "Request" library

const client_id = SPOTIFY_CLIENT_ID; // Your client id
const client_secret = SPOTIFY_CLIENT_SECRET; // Your secret

// your application requests authorization
let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};

request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

        // use the access token to access the Spotify Web API
        let token = body.access_token;
        let options = {
            url: 'https://api.spotify.com/v1/users/thevaliantjosh',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            json: true
        };
        request.get(options, function(error, response, body) {
            console.log(body);
        });
    }
});






// console.log(SPOTIFYController);


























//
// let authOptions = {
//     url: 'https://accounts.spotiy.com/api/token',
//     headers: {
//         'Authorization' : 'Basic' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//     }, form: {
//         grant_type: 'client_credentials'
// },
//     json: true
// };
//
// request.post(authOptions, function(error, response, body){
//     if (!error && response.statusCode === 200){
//         //use the access token to access the Spotify Web API
//         let token = body.clientId
//     }
// })
//
// spotifyApi.setAccessToken(SPOTIFY_CLIENT_ID);
//
// spotifyApi.getArtistAlbums(SPOTIFY_CLIENT_ID, function(err, data){
//     if(err) console.error(err);
//     else console.log('Artist albums', data);
// });
//
// spotifyApi.getArtistAlbums(SPOTIFY_CLIENT_ID).then(
//     function(data){
//         console.log('Artist albums', data);
//     },
//     function (err) {
//         console.log(err);
//     }
// );