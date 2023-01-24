/*document.addEventListener('DOMContentLoaded', function() {
  var checkButton = document.getElementById('check');
  checkButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {method: "changePage"}, function(response) {
          if(response.method == "changePage"){
            alert(response.text);
          }
        });
      });
  }, false);
}, false);
*/

document.addEventListener('DOMContentLoaded', function() {
  let altCheck = false;
  let formCheck = false;
  let contrastCheck = false;
  var button = document.getElementById('button');
  var checkButton = document.getElementById('Alt');

  document.getElementById('Alt').addEventListener("click", () => { altCheck = !altCheck; console.log(altCheck); }, false);
  document.getElementById('Forms').addEventListener("click", () => { formCheck = !formCheck; }, false);
  document.getElementById('Text').addEventListener("click", () => { contrastCheck = !contrastCheck; }, false);
  
  button.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          alt: altCheck, form: formCheck, contrast: contrastCheck
          });
      });
  }, false);
}, false);