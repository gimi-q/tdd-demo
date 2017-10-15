import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './Quiz.css';
import { getQuestions, decodeHtml, shuffle } from '../helpers/helpers';
import quizReducerFactory from './quiz.reducer';
import answersList from './components/Answers';
import DifficultySelect from './components/Difficulty';

const quizReducer = quizReducerFactory(shuffle);

const store = createStore(quizReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ maxAge: 200 }),
);

class Quiz extends Component {
  componentDidMount() {
    getQuestions(1, store);
  }

  render() {
    const state = store.getState();
    const dataLoaded = state.questionsStatus === 'loaded';

    const data = {
      question: dataLoaded ? state.questions[0].question : '',
      possibleAnswers: dataLoaded ? state.questions[0].possibleAnswers : [''],
      score: state.score,
      difficulty: state.difficulty,
    };

    return (
      <div id="main">
        <h1 id="welcome-message">Welcome to the Quiz!</h1>
        {DifficultySelect(data.difficulty, store)}
        <div>Score: {data.score}</div>
        { dataLoaded &&
        <div>
          <div id="question">{decodeHtml(data.question)}</div>
          {answersList(data.possibleAnswers, store)}
        </div>
        }
      </div>
    );
  }
}

function renderQuiz() {
  ReactDOM.render(
    <Quiz {...store} />,
    document.getElementById('root'),
  );
}

store.subscribe(renderQuiz);
export default renderQuiz;
