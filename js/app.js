let index = 0;
let attempts = 0;
const corect = "APPLE";
let timer;

function appStart() {
  const displaygameOver = () => {
    const div = document.createElement("div");
  };
  const gameOver = () => {
    window.removeEventListener("keydown", handlekeydown);
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts == 6) return;
    attempts++;
    index = 0;
    console.log("nextLine =", attempts);
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-colume[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }

    if (index !== 0) index--;
  };

  const handleEnterKey = () => {
    let corectCount = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-colume[data-index='${attempts}${i}']`
      );

      const inputText = block.innerText;
      const corText = corect[i];

      if (inputText === corText) {
        block.style.background = "#6AAA64";
        corectCount++;
      } else if (corect.includes(inputText)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
      console.log("inpuText: ", inputText, "corText: ", corText);
    }

    if (corectCount === 5) gameOver();
    else nextLine();
  };

  const handlekeydown = (event) => {
    const key = event.key.toUpperCase();
    const keycode = event.keyCode;
    const thisblock = document.querySelector(
      `.board-colume[data-index='${attempts}${index}']`
    );

    if (event.key == "Backspace") handleBackspace();
    if (index === 5) {
      if (event.key == "Enter") {
        handleEnterKey();
      } else return;
    } else if (65 <= keycode && keycode <= 90) {
      thisblock.innerText = key;
      index++;
    }

    // console.log("key down!!!!!", attempts, index);
    // if (65 <= keycode && keycode <= 90) {
    //   thisblock.innerText = key;
    //   index++;
    // }
  };

  const startTimer = () => {
    const startTime = new Date();

    function setTimer() {
      const curTime = new Date();
      const realTime = new Date(curTime - startTime);

      const curMin = realTime.getMinutes().toString().padStart(2, "0");
      const curSec = realTime.getSeconds().toString().padStart(2, "0");
      const timerH1 = document.querySelector("#timer");

      timerH1.innerText = `${curMin}:${curSec}`;
    }

    timer = setInterval(setTimer, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handlekeydown);
}

appStart();
