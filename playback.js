function createVideoReference() {
    if (document.querySelector('crunchroll-video-player-ref')) {
        return false;
    }
    let s = document.createElement('script');
    s.type = 'type/javascript';
    s.id = 'crunchyroll-video-player-ref';
    s.innerHTML = `var videoPlayerObj;`;
    document.body.appendChild(s);
}

function updatePlaybackRate(playbackValue) {
    let videoPlayer = document.querySelector('#player_html5_api');
    if (videoPlayer !== null) {
        setTimeout(() => {
            console.log(playbackValue);
            videoPlayer.playbackRate = playbackValue;
        }, 5000);
    } 
}

window.onload = function() {
    chrome.storage.sync.get({number: 2}, function(items) {
        updatePlaybackRate(items.number);
    });
}

if (typeof playbackValue !== 'undefined') {
    updatePlaybackRate(playbackValue);
}
