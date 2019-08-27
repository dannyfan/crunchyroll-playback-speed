window.onload = function() {
    document.addEventListener('keydown', function(e) {
        e.preventDefault();
        const videoPlayer = document.querySelector('#player_html5_api');
        if (videoPlayer !== null) {
            videoControls(videoPlayer, e);
        }
    });
}

function videoControls(videoPlayer, e) {
    // Increase/decrease video player's playback speed
    if (e.shiftKey && e.keyCode == 40 || e.shiftKey && e.keyCode == 38) {
        let value = (e.keyCode == 40) ? -0.25 : 0.25;
        let newPlaybackRate = videoPlayer.playbackRate + value;
        videoPlayer.playbackRate = checkLimit(newPlaybackRate);
    }
}

function checkLimit(playbackRate) {
    // Limit the playback speed between 0.0 and 2.0
    playbackRate = playbackRate < 0 ? 1.0 : playbackRate;
    playbackRate = playbackRate > 2 ? 2.0 : playbackRate;
    return playbackRate;
}