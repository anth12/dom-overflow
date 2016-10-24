
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: "(" + highlight.toString() + ")()"
  });
});

function highlight(){
  var docWidth = document.documentElement.offsetWidth;

  function isVisible(element){
    var style = window.getComputedStyle(element);
    
    return style.display !== "none"
        && style.visibility !== "hidden"
        && style.opacity !== 0
        && style.height !== 0
        && style.width !== 0
        
        && (element.parentElement == null || isVisible(element.parentElement));
  }

  function getPosition(el) {
    var x = 0;
    var y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: y, left: x };
  }

  var results = [];

  document.querySelectorAll('*').forEach(function(el) {
    
    var elementPosition = getPosition(el);
      if (elementPosition.left < 0 // Overflows left
        || el.offsetWidth > docWidth // Element naturally overflows the width
        || elementPosition.left + el.offsetWidth > docWidth) {
        
        if(isVisible(el) === false)
          return;

        // Highlight the element
        el.style.border = "1px dashed red";

        results.push({ 'Overflowing element': el });
      }
    }
  );

  if(results.length > 0){
	
	  console.log('Elements overflowing the device width:');
    results.forEach(function(element){
      console.log(element);
    });
    
  }else{

    console.log('No elements found overflowing the viewport :)')
  }

}