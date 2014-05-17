var injected = injected || (function(){
  var methods = {
    init: function(){
      var posts = methods.getTimestamps('relativetime');
      methods.fadePosts(posts);
    },
    getTimestamps: function(selector){
      return document.getElementsByClassName(selector);
    },
    fadePosts: function(elements){
      for (var i = 0; i < elements.length; i++){
        elements[i].className += ' faded';
      }
    }
  

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    var data = {};
    if (methods.hasOwnProperty(request.method)){
      data = methods[request.method]();
      sendResponse({
        data: data
      });
      return true;
    }
  });
  return true;  
})();










// var markOlderPosts = {
//   init: function(){
//     var posts = markOlderPosts.getTimestamps('relativetime');
//     markOlderPosts.fadePosts(posts);
//   },
//   getTimestamps: function(selector){
//     return document.getElementsByClassName(selector);
//   },
//   fadePosts: function(elements){
//     for (var i = 0; i < elements.length; i++){
//       elements[i].className += ' faded';
//     }
//   }
// }
// chrome.extension.sendRequest(markOlderPosts.init);
// document.addEventListener('DOMContentLoaded', function(){
//       console.log('Loaded!!');

//   markOlderPosts.init();
// });

// chrome.browserAction.onClicked.addListener(function(tab){
//   console.log('Loaded script!!');
//   chrome.tabs.executeScript({
//     //markOlderPosts.init();
//     code: 'document.body.style.backgroundColor="red"'
//   });
// });


