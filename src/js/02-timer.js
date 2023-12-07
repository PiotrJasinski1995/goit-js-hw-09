import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const dateTimeInput = document.querySelector('#datetime-picker');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
const startButton = document.querySelector('[data-start]');
const clearButton = document.querySelector('[data-clear]');
let selectedDate = 0;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const dateDifference = selectedDate - Date.now();

    if (dateDifference <= 0) {
      startButton.disabled = true;
      startButton.style.cursor = 'not-allowed';
      //window.alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }

    startButton.disabled = false;
    startButton.style.cursor = 'pointer';
  },
};

const fp = flatpickr(dateTimeInput, options);

startButton.disabled = true;
startButton.style.cursor = 'not-allowed';

startButton.addEventListener('click', event => {
  event.currentTarget.disabled = true;
  startButton.style.cursor = 'wait';
  timerId = setInterval(() => {
    const dateDifference = selectedDate - Date.now();

    fp.set('clickOpens', false);

    if (dateDifference <= 0) {
      clearInterval(timerId);
      fp.set('clickOpens', true);
      startButton.style.cursor = 'not-allowed';
      return;
    }

    const dateDataObj = convertMs(dateDifference);
    daysElement.textContent = addLeadingZero(dateDataObj.days);
    hoursElement.textContent = addLeadingZero(dateDataObj.hours);
    minutesElement.textContent = addLeadingZero(dateDataObj.minutes);
    secondsElement.textContent = addLeadingZero(dateDataObj.seconds);
  }, 1000);
});

clearButton.addEventListener('click', event => {
  clearInterval(timerId);
  fp.set('clickOpens', true);
  const dateDataObj = convertMs(0);
  daysElement.textContent = addLeadingZero(dateDataObj.days);
  hoursElement.textContent = addLeadingZero(dateDataObj.hours);
  minutesElement.textContent = addLeadingZero(dateDataObj.minutes);
  secondsElement.textContent = addLeadingZero(dateDataObj.seconds);

  fp.setDate(Date.now());
  selectedDate = fp.selectedDates[0];

  if (selectedDate - Date.now() > 0) {
    startButton.disabled = false;
    startButton.style.cursor = 'pointer';
    return;
  }

  startButton.style.cursor = 'not-allowed';
});

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
