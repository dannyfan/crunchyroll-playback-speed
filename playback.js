function updatePlaybackRate(videoPlayer, playbackValue) {
    if (videoPlayer !== null) {
        setTimeout(() => {
            videoPlayer.playbackRate = playbackValue;
        }, 5000);
    } 
}

window.onload = function() {
    let videoPlayer = document.querySelector('#player_html5_api');
    chrome.storage.sync.get({number: 2}, function(items) {
        updatePlaybackRate(videoPlayer, items.number);
    });
}

if (typeof playbackValue !== 'undefined') {
    location.reload();
}
