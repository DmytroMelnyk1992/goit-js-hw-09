import flatpickr from 'flatpickr';
import { Ukrainian } from 'flatpickr/dist/l10n/uk.js';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

input.disabled = false;
startBtn.disabled = true;
flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  locale: Ukrainian,
  // minDate: "today",
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const timeDifference = selectedDates[0] - Date.now();
    if (timeDifference < 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      console.log(selectedDates[0]);
    }
  },
});

const addLeadingZero = value => {
  if (100 > value) {
    return String(value).padStart(2, '0');
  }
  return String(value).padStart(3, '0');
};

const startTime = () => {
  startBtn.disabled = true;
  input.disabled = true;
  const timeValue = new Date(input.value);
  const timeInterval = setInterval(() => {
    const timeDiff = convertMs(timeValue - new Date());
    if (new Date() >= timeValue - 1000) {
      clearInterval(timeInterval);
      input.disabled = false;
    }
    daysValue.textContent = addLeadingZero(timeDiff.days);
    hoursValue.textContent = addLeadingZero(timeDiff.hours);
    minutesValue.textContent = addLeadingZero(timeDiff.minutes);
    secondsValue.textContent = addLeadingZero(timeDiff.seconds);
  }, 1000);
};
startBtn.addEventListener('click', startTime);

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
