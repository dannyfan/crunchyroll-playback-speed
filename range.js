const playbackRange = document.querySelector('#playrate-slider');
const playbackValue = document.querySelector('#playrate-value');
playbackRange.onchange = function(element) {
    let value = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id, {
                file: 'playback.js'
            }
        );
    });
    playbackValue.innerHTML = value;
}