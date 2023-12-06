const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const bodyElement = document.querySelector('body');
let timerId = null;

startButton.addEventListener('click', event => {
  event.currentTarget.disabled = true;
  timerId = setInterval(() => {
    const randomBackgroundColor = getRandomHexColor();
    bodyElement.style.backgroundColor = randomBackgroundColor;
  }, 1000);
});

stopButton.addEventListener('click', event => {
  startButton.disabled = false;
  clearInterval(timerId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
