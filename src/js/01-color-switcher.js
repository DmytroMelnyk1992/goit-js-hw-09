function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyColorSwitch = document.querySelector('body');

stopBtn.disabled = true;

startBtn.onclick = () => {
  console.log(`start switch`);

  startBtn.disabled = true;
  stopBtn.disabled = false;

  timer = setInterval(intervalColor, 1000);
  intervalColor();
};

const intervalColor = () => {
  bodyColorSwitch.style.cssText = `background-color: ${getRandomHexColor()};`;
  stopBtn.onclick = () => {
    console.log(`stop switch`);
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(timer);
  };
};
