
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: "(" + highlight.toString() + ")()"
  });
});

function highlight(){
  var docWidth = document.documentElement.offsetWidth;

  var results = [];

  document.querySelectorAll('*').forEach(function(el) {
      if (el.offsetWidth > docWidth
        || el.getBoundingClientRect().left + el.width > docWidth) {
        
        // Highlight the element
        el.style.border = "1px dashed red";

        results.push({ 'Overflowing element': el });
      }
    }
  );

  if(results.length > 0){
	
	console.log('Elements overflowing the device width:')
    console.table(results);
  }

}