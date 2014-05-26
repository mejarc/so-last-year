function initialize(){
  var timestamps = getTimestamps('relativetime');
  fadePosts(timestamps);
  

  // chrome.tabs.executeScript({
  //   code: "console.log('elements in this tab' + response.data)"
  //   });
  // });
}

function getTimestamps(selector){
  return document.getElementsByClassName(selector);
}

function getTimeValue(selector, attr){
 return selector.getAttribute(attr);
}

function isAYearAgo(selector){
    /* obtains the value (string) stored in the title attribute
       of the span containing .relativetime.
       Compares that to today's value, then converts to year. */
  var postDate = new Date(getTimeValue(selector, 'title')), 
      today = new Date('2015-12-01'),
      difference = today - postDate,
      tmp = Math.floor(difference / 1000),
      years = Math.floor(tmp / 31536000);
      
//   console.log('today: '  +today);
//   console.log('post date' + postDate);
//   console.log('years between them: ' + years);
  return years;
}

function findOldPostContainer(selector, childObj) {
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
}

function fadePosts(elements){
  for (var i = 0; i < elements.length; i++){
    if (isAYearAgo(elements[i]) > 0){
      var post = findOldPostContainer('answercell', elements[i]);
//       container.style.backgroundColor = 'orange';
      //elements[i].style.opacity = 0.4;
//       console.log(elements[i]);
//       elements[i].style.backgroundColor = 'orange';
    }
  }
}

//chrome.browserAction.onClicked.addListener(initialize);

// chrome.contextMenus.create({
//   title: "That's SO last year",
//   contexts: ["page"],
//   onclick: initialize
// })
// function initialize(tab){
//   injectedMethod(tab, 'init', function(response){
//     console.log('elements in this tab' + response.data);
//   });
// }

// chrome.contextMenus.onClicked.addListener(function(){
//   alert('golly!');
// });


// if (chrome.runtime.lastError){ console.log('Extension error:' + chrome.runtime.lastError);
// }

initialize();