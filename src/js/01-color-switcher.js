let timerId = null;
const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');
stop.disabled = true;
start.addEventListener('click', onStart);
function onStart() {
  timerId = setInterval(() => {
    start.disabled = true;
    stop.disabled = false;
    document.body.style.background = getRandomHexColor();
  }, 1000);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

stop.addEventListener('click', onStop);
function onStop() {
  start.disabled = false;
  stop.disabled = true;
  clearInterval(timerId);
}
