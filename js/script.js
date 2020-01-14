// console.log('hello!');
let buttonList = document.getElementsByTagName('button');

for (let i = 0; i < buttonList.length; i++) {
  // console.log('button item?', button[i])
  const clickButton = function () {
    console.log('hello button!')
  }
  buttonList[i].onclick = clickButton;
}

