import React from 'react';
import { getQuestions, decodeHtml } from '../../helpers/helpers';

function answerColorSelector(value, correctAnswer, status) {
  let colorStatus;
  if (correctAnswer === value && status === 'touched') {
    colorStatus = '#4FBCAA';
  } else if (correctAnswer !== value && status === 'touched') {
    colorStatus = '#FD3B1D';
  }

  return colorStatus;
}

function Answer(answer, store) {
  const value = answer.value;
  let answerColor;

  if (store.getState().questionsStatus === 'loaded') {
    answerColor = answerColorSelector(value,
      store.getState().questions[0].correct_answer,
      answer.status,
    );
  }

  if (store.getState().questionAnswered && value === store.getState().questions[0].correct_answer) {
    answerColor = '#4FBCAA';
  }

  const onClick = () => {
    if (!store.getState().questionAnswered) {
      store.dispatch({ type: 'VALIDATE_ANSWER', answer: value });

      setTimeout(() => {
        getQuestions(1, store);
      }, 2000);
    }
  };
  return (<div className="answerWrapper">
    <button
      key={value}
      style={{ backgroundColor: answerColor, borderColor: answerColor }}
      className="answer"
      onClick={onClick}
    >{decodeHtml(value)}
    </button>
  </div>);
}

export default function answersList(answers, store) {
  return (<div id="answers">
    {answers.map(answer => Answer(answer, store))}
  </div>);
}
