const playbackRange = document.querySelector('#playrate-slider');
const playbackValue = document.querySelector('#playrate-value');

playbackRange.onchange = function(element) {
    let value = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id, {
                code: 'var playbackValue = ' + value + ';'
            }
        ),
        chrome.tabs.executeScript(
            tabs[0].id, {
                file: 'playback.js'
            }
        );
    });
    saveValue(value);
    playbackValue.innerHTML = value;
}

function saveValue(value) {
    chrome.storage.sync.set({number: value}, function() {
    });
}

function getValue() {
    chrome.storage.sync.get({number: 2}, function(items) {
        playbackRange.value = items.number;
        playbackValue.innerHTML = items.number;
    });
}

document.addEventListener('DOMContentLoaded', getValue);