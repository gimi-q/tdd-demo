const initialState = {
  selectedDifficulty: 'any',
  difficulty: [
    { value: 'any', selected: false },
    { value: 'easy', selected: false },
    { value: 'medium', selected: false },
    { value: 'hard', selected: false },
  ],
  score: 0,
  questionsStatus: 'none',
};

function reducerFactory(shuffle) {
  return function quiz(state = initialState, action) {
    switch (action.type) {
      case 'REQUEST_QUESTIONS':
        return Object.assign({}, state, {
          questionsStatus: 'pending',
        });

      case 'LOAD_QUESTIONS':
        return Object.assign({}, state, {
          questionAnswered: false,
          questions: formatQuestions(action.questions, shuffle),
          questionsStatus: 'loaded',
        });

      case 'SET_DIFFICULTY':
        return Object.assign({}, state, {
          selectedDifficulty: action.difficulty,
          difficulty: updateDifficultyConfig(state, action),
        });

      case 'VALIDATE_ANSWER':
        return Object.assign({}, state, {
          answeredCorrectly: action.answer === state.questions[0].correct_answer,
          score: updateScore(state, action),
          questionAnswered: 'true',
          questions: updateQuestions(state, action),
        });

      default:
        return state;
    }
  };
}

export default reducerFactory;

// Action helpers
function formatAnswers(question) {
  const answers = [...question.incorrect_answers, question.correct_answer];
  return answers.map(answer => ({ value: answer, status: 'untouched' }));
}

function updatePossibleAnswers(possibleAnswers, action) {
  return possibleAnswers.map((answer) => {
    if (answer.value === action.answer) {
      return Object.assign({}, answer, { status: 'touched' });
    }
    return answer;
  });
}

function formatQuestions(questions, shuffle) {
  return questions.map(question =>
    Object.assign({}, question,
      { possibleAnswers: shuffle(formatAnswers(question)) }),
  );
}

function updateQuestions(state, action) {
  return state.questions.map((question, index) => {
    if (index === 0) {
      return Object.assign({}, question, {
        possibleAnswers: updatePossibleAnswers(question.possibleAnswers, action),
      });
    }
    return question;
  });
}

function updateScore(state, action) {
  return state.questions[0].correct_answer === action.answer ? state.score + 1 : state.score;
}

function updateDifficultyConfig(state, action) {
  return state.difficulty.map((difficultyConfig) => {
    let newConfig;
    if (difficultyConfig.value === action.difficulty) {
      newConfig = Object.assign({}, difficultyConfig, {
        selected: true,
      });
    } else {
      newConfig = Object.assign({}, difficultyConfig, {
        selected: false,
      });
    }

    return newConfig;
  });
}
