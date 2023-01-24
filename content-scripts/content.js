chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if(request.alt == true){
        findImages();
      }
      if(request.contrast == true){
        textContrast();
      }
      if(request.form == true){
        formLabels();
      }
      sendResponse({method: "changePage"}); //same as innerText
  }
);


function findImages() {
  images = document.getElementsByTagName("img");
  let badImages = [];
  for (var i = 0; i < images.length; i++) {
    if (images[i].alt == '') {
      images[i].style.border = "thick solid #FF0000";
      badImages.push(images[i]);
    }
  }
}
//https://www.w3.org/WAI/tutorials/forms/labels/

function formLabels() {
  let inputs = document.getElementsByTagName("input");
  let labels = document.getElementsByTagName("label");

  let inputsArr = [];
  let labelsArr = [];
  for (var i = 0; i < inputs.length; i++) {
    inputsArr[i] = inputs[i].id;
  }

  for (var i = 0; i < labels.length; i++) {
    labelsArr[i] = labels[i].htmlFor;

  }
  let difference = inputsArr.filter(x => !labelsArr.includes(x));
  difference = difference.filter((str) => str !== '');
  console.log(difference);

  for (var i = 0; i < difference.length; i++) {
    let badInput = document.getElementById(difference[i]);
    badInput.parentElement.style.border = "2px solid #FF0000";


  }


}


function textContrast() {
  let text = document.getElementsByTagName("p");


  for (var i = 0; i < text.length; i++) {
    let itr = text[i].parentElement;

    // undefined background colors have a 0 set for alpha color
    while (itr.parentElement != null && 
    getComputedStyle(itr).getPropertyValue('background-color') == 'rgba(0, 0, 0, 0)') {
      itr = itr.parentElement;      
    }

    console.log(text[i])
    let backgroundColor = getComputedStyle(itr).getPropertyValue('background-color')
    let textColor = getComputedStyle(text[i]).getPropertyValue('color');
    console.log(textColor)

    let backgroundArr = colorArrayMaker(backgroundColor);
    let textArr = colorArrayMaker(textColor);


    if (contrast(textArr, backgroundArr) <= 3.5) {
      text[i].style.color = "#FF0000";
      text[i].style.fontWeight = "5"
    }



  }


}

//takes a string in the format rgb(0, 0, 0) and returns the ints in an array
function colorArrayMaker(arr) {
  arr = arr.split(' ')
  for (var j = 0; j < arr.length; j++) {
    let x = arr[j].match(/\d+/g);
    arr[j] = x[0]

  }
  return arr;

}


function luminance(r, g, b) {
  var a = [r, g, b].map(function(v) {
    v /= 255;
    return v <= 0.03928 ?
      v / 12.92 :
      Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function contrast(rgb1, rgb2) {
  var lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
  var lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
  var brightest = Math.max(lum1, lum2);
  var darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) /
    (darkest + 0.05);
}