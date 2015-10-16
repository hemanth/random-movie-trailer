require('es6-promise').polyfill();
require('isomorphic-fetch');
var youtubeVideo = require('youtube-video');
var API = 'https://random-movie-url.herokuapp.com/';

var fetchMovie = function() {
    fetch(API)
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(res) {
        var videoOpts = {
            // selector: true,
            // elementId: 'player',
            width: 640,
            height: 400,
            autoplay: true,
            controls: false
        };
        youtubeVideo(res.url, videoOpts, function (error, playback) {
            playback.playVideo();
            document.querySelector('div#next').style.display='block';
        });
    });
};

fetchMovie();

document.querySelector('span').addEventListener('click', fetchMovie);




