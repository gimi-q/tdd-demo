import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Quiz.css';
import { createStore } from 'redux'
import getQuestions from '../helpers/helpers'
import quizReducer from './quiz.reducer'

let store = createStore(quizReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
store.subscribe(() => console.log(store.getState()));

class QuizApp extends Component {
    constructor(props) {
      super(props);
      const store = this.props;
    }

    componentDidMount() {
      console.log('component mounted');
      getQuestions(1, store);
    }

    render() {
        const state = this.props.getState();
        return (
          <div id="main">
            <h1 id="welcome-message">Welcome to the Quiz!</h1>
            <div id="question">?</div>
            <div id="answers">
              <div className="answer">!</div>
              <div className="answer">!</div>
            </div>
          </div>
        );
    }
}

function renderApp() {
  ReactDOM.render(
    <QuizApp { ... store }/>,
    document.getElementById('root')
  );
}

store.subscribe(renderApp);
export default renderApp;
