document.addEventListener('DOMContentLoaded', function(){
  Extension.initialize();
});


var Extension = {
  initialize: function(){
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs){
      var timestamps = Extension.getTimestamps('relativetime');
      Extension.fadePosts(timestamps);
    });
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
    var postDate = new Date(Extension.getTimeValue(selector, 'title')), 
        today = new Date('2015-12-01'),
        difference = today - postDate,
        tmp = Math.floor(difference / 1000),
        years = Math.floor(tmp / 31536000);
    return years;
  },

  findOldPostContainer: function(selector, childObj) {
    /* finds the container for the post with the 
       timestamp from over a year ago, so that
       we can fade the entire block */
    var container = childObj.parentNode,
        count = 1;
    while (container) {
          console.log('My css class is ' + container.className);
          container = container.parentNode;
          count++;
     }
    return container;
  },

  fadePosts:  function(elements){
    for (var i = 0; i < elements.length; i++){
      if (Extension.isAYearAgo(elements[i]) > 0){
        var post = Extension.findOldPostContainer('answercell', elements[i]);
        post.style.opacity = 0.4;
      }
    }
  }
};
