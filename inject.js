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

