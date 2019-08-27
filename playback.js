window.onload = function() {
    const videoPlayer = document.querySelector('#player_html5_api');
    if (videoPlayer != null) {
        videoPlayer.addEventListener('loadeddata', function() {
            getOrUpdatePlaybackValue(this, '');   
        });

        document.addEventListener('keydown', function(e) {
            e.preventDefault();
            videoControls(videoPlayer, e);
        });
    }
}

function videoControls(videoPlayer, e) {
    // Increase/decrease video player's playback speed
    if (e.shiftKey && e.keyCode == 40 || e.shiftKey && e.keyCode == 38) {
        let value = (e.keyCode == 40) ? -0.25 : 0.25;
        let newPlaybackRate = videoPlayer.playbackRate + value;
        videoPlayer.playbackRate = checkLimit(newPlaybackRate);
        getOrUpdatePlaybackValue(videoPlayer, checkLimit(newPlaybackRate));
    }
}

function checkLimit(playbackRate) {
    // Limit the playback speed between 0.0 and 2.0
    playbackRate = playbackRate < 0 ? 1.0 : playbackRate;
    playbackRate = playbackRate > 2 ? 2.0 : playbackRate;
    return playbackRate;
}

function getOrUpdatePlaybackValue(videoPlayer, playbackValue) {
    if (playbackValue) {
        localStorage.setItem('cr_playback_speed', playbackValue);
    } else {
        let existingSpeed = localStorage.getItem('cr_playback_speed');
        videoPlayer.playbackRate = (existingSpeed) === null ? 1.0 : checkLimit(existingSpeed);
    }
    return;
};
