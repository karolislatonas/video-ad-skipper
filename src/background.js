chrome.browserAction.onClicked.addListener(onExtensionsButtonClicked);

function onExtensionsButtonClicked(tab){
    chrome.tabs.sendMessage(tab.id, '');
}