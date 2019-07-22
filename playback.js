function updatePlaybackRate(videoPlayer, playbackValue) {
    if (videoPlayer !== null) {
        setTimeout(() => {
            videoPlayer.playbackRate = playbackValue;
        }, 5000);
    } 
}

window.onload = function() {
    let videoPlayer = document.querySelector('#player_html5_api');
    if (videoPlayer) {
        chrome.storage.sync.get({number: 2}, function(items) {
            createElements(videoPlayer, items.number);
            updatePlaybackRate(videoPlayer, items.number);
        });
    }
}

if (typeof playbackValue !== 'undefined') {
    location.reload();
}

function createElements(videoPlayer, valueSelected) {
    const videoPlayerOptions = document.querySelector('.vjs-menu.settingsMenu.hidden ul.vjs-menu-content');
    const playbackOption = document.createElement('li');
    const playbackOptionText = document.createTextNode('Playback Speed');
    const playbackOptionSelected = document.createElement('span');
    const playbackOptionSelectedText = document.createTextNode(valueSelected);

    playbackOption.classList.add('vjs-menu-item', 'subtitleMenuButton', 'settingsMenuItem', 'baseSettingsMenuItem');
    playbackOptionSelected.classList.add('qualitySelectionDetails');

    playbackOption.append(playbackOptionText);
    playbackOptionSelected.append(playbackOptionSelectedText);
    playbackOption.append(playbackOptionSelected);
    videoPlayerOptions.append(playbackOption);
    createPlaybackOption(videoPlayerOptions);
}

function createPlaybackOption(menuElement) {
    let playbackOptions = ['0.5', '0.75', '1.0', '1.25', '1.5', '1.75', '2.0'];
    for (let i = 0; i < playbackOptions.length; i++) {
        let value = playbackOptions[i];
        let optionElement = document.createElement('li');
        optionElement.classList.add('vjs-menu-item', 'settingsMenuSelector', 'settingsMenuItemSelectionCircle');
        let optionElementText = document.createTextNode(value);
        optionElement.append(optionElementText);
        menuElement.append(optionElement);
    }
}