import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './Quiz.css';
import { getQuestions, decodeHtml, shuffle } from '../helpers/helpers';
import quizReducerFactory from './quiz.reducer';
import Answers from './components/Answers';
import DifficultySelector from './components/DifficultySelector';

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
      answered: state.questionAnswered,
      answeredCorrectly: state.answeredCorrectly ? 'yes' : 'no',
    };

    return (
      <div id="main">
        <h1 id="welcome-message">Welcome to the Quiz!</h1>
        {DifficultySelector(data.difficulty, store)}
        <div>Score: {data.score}</div>
        { dataLoaded &&
        <div>
          <div
            id="question"
            question-answered={data.answered}
            answered-correctly={data.answeredCorrectly}
          >{decodeHtml(data.question)}</div>
          {Answers(data.possibleAnswers, store)}
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
