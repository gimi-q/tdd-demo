import axios from 'axios'

export default function getQuestions(amount, store) {
  axios.get(`https://opentdb.com/api.php?amount=${amount}`)
  .then(function (response) {
    console.log('response form axios', response.data.results);
    let questions = response.data.results;
    store.dispatch({type:'LOAD_QUESTIONS', questions});
  })
  .catch(function (error) {
    console.log('response from axios',error);
  });
};
