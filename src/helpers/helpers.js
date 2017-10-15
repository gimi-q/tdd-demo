import axios from 'axios';

export function getQuestions(amount, store) {
  store.dispatch({ type: 'REQUEST_QUESTIONS' });
  const selectedDifficulty = store.getState().selectedDifficulty;
  const difficulty = selectedDifficulty !== 'any' ? `&difficulty=${selectedDifficulty}` : '';

  axios.get(`https://opentdb.com/api.php?amount=${amount}${difficulty}`)
    .then((response) => {
      const questions = response.data.results;
      store.dispatch({ type: 'LOAD_QUESTIONS', questions });
    })
    .catch((error) => {
      console.warn('response from axios', error);
    });
}

export function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

/* eslint-disable */
export function shuffle(input) {
  for (let i = input.length - 1; i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var itemAtIndex = input[randomIndex];

    input[randomIndex] = input[i];
    input[i] = itemAtIndex;
  }
  return input;
}
