import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const timerEl = document.querySelector('.timer');
timerEl.style.display = 'flex';
timerEl.style.gap = '12px';
timerEl.style.color = 'navy';
timerEl.style.marginTop = '15px';
const inputEl = document.querySelector('#datetime-picker');
inputEl.style.fontSize = '18px';
inputEl.style.textAlign = 'center';
const fieldEl = document.querySelectorAll('.field');
fieldEl.forEach(e => {
  e.style.display = 'flex';
  e.style.flexDirection = 'column';
  e.style.alignItems = 'center';
});
const valueEl = document.querySelectorAll('.value');
valueEl.forEach(e => {
  e.style.fontSize = '26px';
  e.style.color = 'blue';
});
const btn = document.querySelector('button[data-start]');
btn.style.cursor = 'pointer';
btn.style.border = 'dashed 1px green';
btn.style.borderRadius = '15px';
btn.style.marginLeft = '20px';
const sec = document.querySelector('span[data-seconds]');
const min = document.querySelector('span[data-minutes]');
const hours = document.querySelector('span[data-hours]');
const days = document.querySelector('span[data-days]');

btn.disabled = true;
btn.addEventListener('click', onClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btn.disabled = true;
    }
    btn.disabled = false;
  },
};

flatpickr(inputEl, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function onClick(e) {
  let timer = setInterval(() => {
    btn.disabled = true;
    let countdown = new Date(inputEl.value) - new Date();

    if (countdown >= 0) {
      days.textContent = addLeadingZero(convertMs(countdown).days);
      hours.textContent = addLeadingZero(convertMs(countdown).hours);
      min.textContent = addLeadingZero(convertMs(countdown).minutes);
      sec.textContent = addLeadingZero(convertMs(countdown).seconds);
    } else {
      Notiflix.Notify.success('We are done!');
      timerEl.style.color = 'red';

      clearInterval(timer);
    }
  }, 1000);
}
