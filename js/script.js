// console.log('hello!');
let buttonList = document.getElementsByTagName('button');

for (let i = 0; i < buttonList.length; i++) {
  const findBtnLocation = function () {
    const closestElement = buttonList[i].closest(".row");
    console.log('hello button!', closestElement.classList)
    // figure out where you are???
    // use jquery?????
  }
  buttonList[i].onclick = findBtnLocation;
}

