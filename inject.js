var injected = injected || (function(){
  var methods = {
    init: function(){
      var posts = methods.getTimestamps('relativetime');
      methods.fadePosts(posts);
    },
    getTimestamps: function(selector){
      return document.getElementsByClassName(selector);
    },
    getTimeValue: function(selector, attr){
      return selector.getAttribute(attr);
    },
    isAYearAgo: function(selector){
    /* obtains the value (string) stored in the title attribute
       of the span containing .relativetime.
       Compares that to today's value, then converts to year. */
      var postDate = new Date(getTimeValue(selector, 'title')), 
          today = new Date(),
          difference = today - postDate,
          tmp = Math.floor(difference / 1000),
          years = Math.floor(tmp / 31536000);
      return years;
    },

    fadePosts: function(elements){
      for (var i = 0; i < elements.length; i++){
        if (isAYearAgo(elements[i]) > 0){
        elements[i].className += ' faded';
        }
      }
    }
  };
 
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

