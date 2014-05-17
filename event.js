function injectedMethod(tab, method, callback){
  chrome.tabs.executeScript(tab.id, { file: 'inject.js' }, function(){
    chrome.tabs.sendMessage(tab.id, { method: method }, callback);
  });
}

function getTimestamps(tab){
  injectedMethod(tab, 'init', function(response){
    alert('elements in this tab' + response.data);
  });
  // alert('here!!!' + document.getElementsByClassName('relativetime')[0]);
  // return document.getElementsByClassName(selector);
}

chrome.browserAction.onClicked.addListener(getTimestamps);