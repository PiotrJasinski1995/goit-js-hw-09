import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const promisesForm = document.querySelector('.form');
const firstDelayInput = document.querySelector('[name="delay"]');
const delayStepInput = document.querySelector('[name="step"]');
const amountInput = document.querySelector('[name="amount"]');

promisesForm.addEventListener('submit', event => {
  event.preventDefault();

  const firstDelay = Number(firstDelayInput.value);
  const delayStep = Number(delayStepInput.value);
  const amount = Number(amountInput.value);
  let delay = firstDelay;

  Notiflix.Notify.init();
  Notiflix.Notify.merge({
    useIcon: false,
  });

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        //console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        //console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay += delayStep;
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
