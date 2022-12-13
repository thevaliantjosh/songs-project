// let Spotify = require('spotify-web-api.js');
// let s = new Spotify();
//
// //s.searchTracks();
//
// let spotifyApi = new SpotifyWebApi();

const SPOTIFYController = (function() {
    const client_id = SPOTIFY_CLIENT_ID;
    const client_secret = SPOTIFY_CLIENT_SECRET;
    const base_url = 'https://api.spotify.com/v1'

    //private methods

    const getToken = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic' + btoa(client_id + ':' + client_secret)
            },
            body: {
                'grant_type': 'authorization_code',
                'code': 'authorization_code',
                'redirect_uri': 'redirect_uri'
            }
        });
        const data = await result.json();
        console.log(result);
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

        const result = await fetch(base_url + `/browse/categories/${genreId}/playlists?limit=${limit}`,{
            method: 'GET',
            headers: {'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        console.log(data.playlists.items);
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

    return {
        getToken() {
            return getToken();

        },
        getGenres(token){
            return getGenres(token);
            console.log(getGenres);
        },
        getPlaylistByGenre(token, genreId){
            return getPlaylistByGenre(token, genreId);
        },
        getTracks(token, tracksEndPoint){
            return getTracks(token, tracksEndPoint);
        }
    }

})();

// console.log("hello world");


























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