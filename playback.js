function updatePlaybackRate() {
    let videoPlayer = document.querySelector('#player_html5_api');
    if (videoPlayer !== null) {
        setTimeout(() => {
            videoPlayer.playbackRate = 2;
        }, 5000);
    } 
}

window.onload = function() {
    updatePlaybackRate();
}

