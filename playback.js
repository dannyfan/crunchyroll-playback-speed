window.onload = function() {
    const videoPlayer = document.querySelector('#player_html5_api');
    const crLocal= JSON.parse(localStorage.ajs_user_traits);
    if (videoPlayer != null) {
        videoPlayer.addEventListener('loadeddata', function() {
            getOrUpdatePlaybackValue(this, '');
            getVideoSiblings(this);
        });

        document.addEventListener('keydown', function(e) {
            e.preventDefault();
            videoControls(videoPlayer, e);
        });
    }
    
    if (crLocal) {
        getVideoSiblings(crLocal);

        document.addEventListener('keydown', function(e) {
            e.preventDefault();

            videoControls('', e);
        });
    }
}

/** 
 * Controls video player's options based on certain keyboard combinations.
 * @param {HTMLElement} videoPlayer - The video player element
 * @param {Object} e - The event object
 */
function videoControls(videoPlayer, e) {
    if (e.shiftKey && e.keyCode == 40 || e.shiftKey && e.keyCode == 38) {
        // Increase/decrease video player's playback speed
        let value = (e.keyCode == 40) ? -0.25 : 0.25;
        let newPlaybackRate = checkLimit(videoPlayer.playbackRate + value);
        videoPlayer.playbackRate = newPlaybackRate;
        getOrUpdatePlaybackValue(videoPlayer, newPlaybackRate);
        showPlaybackRateValue(videoPlayer, newPlaybackRate);
    } else if (e.shiftKey && e.keyCode == 82) {
         // Reset playback speed to default
        videoPlayer.playbackRate = 1.0;
        getOrUpdatePlaybackValue(videoPlayer, 1.0);
        showPlaybackRateValue(videoPlayer, 1.0);
    } else if (e.shiftKey && (e.keyCode == 39 || e.keyCode == 37)) {
        let videoType = (e.keyCode == 39) ? 'cr_next_video' : 'cr_prev_video';
        const videoLink = localStorage.getItem(videoType);
        if (videoLink) {
            document.location = videoLink;
        }
    }
}

/**
 * Create text representation of the current playback speed.
 * @param {HTMLElement} videoPlayer - The video player element
 * @param {Number} playbackRate - Value of playback speed to show
 */
function showPlaybackRateValue(videoPlayer, playbackRate) {
    const container = document.createElement('div');
    container.id = 'cr-playback-speed';
    const text = document.createTextNode(`${playbackRate}x playback speed`);
    container.append(text);
    container.style.fontSize = '12px';
    container.style.color = '#ffffff';
    container.style.position = 'absolute';
    container.style.zIndex = 1;
    container.style.top = '0px';
    container.style.right = '0px';
    container.style.margin = '5px';
    videoPlayer.parentElement.append(container);
    setTimeout(function() {
        const playbackContainer = document.querySelector('#cr-playback-speed');
        playbackContainer.remove();
    }, 500);
}

/**
 * Validates the playback speed to be checked if values is inbetween 0.0 and 2.0.
 * @param {Number} playbackRate - Value of playback speed to be validate.
 */
function checkLimit(playbackRate) {
    playbackRate = playbackRate < 0 ? 1.0 : playbackRate;
    playbackRate = playbackRate > 2 ? 2.0 : playbackRate;
    return playbackRate;
}

/**
 * Set or update playback speed of video player for future views.
 * @param {HTMLElement} videoPlayer - The video player element
 * @param {Number} playbackRate - Value of playback speed to save/set
 */
function getOrUpdatePlaybackValue(videoPlayer, playbackValue) {
    if (playbackValue) {
        localStorage.setItem('cr_playback_speed', playbackValue);
    } else {
        let existingSpeed = localStorage.getItem('cr_playback_speed');
        videoPlayer.playbackRate = (existingSpeed) === null ? 1.0 : checkLimit(existingSpeed);
    }
    return;
};

function getVideoSiblings(crLocal) {
    const url = crLocal.referrer;
    if (url) {
        const urlArr = url.split('-');
        const epID = urlArr.pop();
        const videoContainer = document.querySelector(`div[media_id="${epID}"]`);
        const prevVideoID = videoContainer.previousElementSibling.getAttribute('media_id');
        const nextVideoID = videoContainer.nextElementSibling.getAttribute('media_id');
        if (prevVideoID) {
            localStorage.setItem('cr_prev_video', urlArr.join('-') + '-' + prevVideoID);
        }
        if (nextVideoID) {
            localStorage.setItem('cr_next_video', urlArr.join('-') + '-' + nextVideoID);
        }
    }
}