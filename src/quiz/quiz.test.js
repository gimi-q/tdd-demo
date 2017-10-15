import quizReducerFactory from './quiz.reducer';

function stubbedShuffle(array) {
  return array;
}

const quizReducer = quizReducerFactory(stubbedShuffle);

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

const questionsDouble = [{
  category: 'Science: Mathematics',
  type: 'multiple',
  difficulty: 'easy',
  question: 'How many sides does a heptagon have?',
  correct_answer: '7',
  incorrect_answers: ['8', '6', '5'],
}];

const initialStateWithQuestions = quizReducer(initialState, { type: 'LOAD_QUESTIONS', questions: questionsDouble });

describe('Quiz', () => {
  it('should return the initial state', () => {
    expect(quizReducer(undefined, {})).toEqual(initialState);
  });

  describe('Questions', () => {
    it('Can request questions', () => {
      expect(quizReducer(initialState, { type: 'REQUEST_QUESTIONS' }))
        .toEqual(Object.assign({}, initialState, { questionsStatus: 'pending' }));
    });

    it('Can load questions when receieved', () => {
      const loadedState = quizReducer(initialState, { type: 'LOAD_QUESTIONS', questions: questionsDouble });

      expect(loadedState)
        .toEqual(Object.assign({}, loadedState, {
          questions: loadedState.questions.map((question, i) => {
            if (i === 0) {
              Object.assign({}, questionsDouble, {
                possibleAnswers: [
                  { status: 'untouched', value: '8' },
                  { status: 'untouched', value: '5' },
                  { status: 'untouched', value: '6' },
                  { status: 'untouched', value: '7' },
                ],
              });
            }
            return question;
          }),

          questionAnswered: false,
          questionsStatus: 'loaded',
        }));
    });
  });

  describe('Settings', () => {
    it('Can set difficulty of questions', () => {
      expect(quizReducer(initialState, { type: 'SET_DIFFICULTY', difficulty: 'easy' }))
        .toEqual(Object.assign({}, initialState, {
          selectedDifficulty: 'easy',
          difficulty: [
            { value: 'any', selected: false },
            { value: 'easy', selected: true },
            { value: 'medium', selected: false },
            { value: 'hard', selected: false },
          ],
        }));
    });
  });

  describe('Validation', () => {
    it('Can validate a correct answer provided', () => {
      expect(quizReducer(initialStateWithQuestions, { type: 'VALIDATE_ANSWER', answer: '7' }))
        .toEqual(Object.assign({}, initialStateWithQuestions, {
          questionAnswered: 'true',
          answeredCorrectly: true,
          score: 1,
          questions: initialStateWithQuestions.questions.map((question, i) => {
            if (i === 0) {
              return Object.assign({}, question, {
                possibleAnswers: [
                  { status: 'untouched', value: '8' },
                  { status: 'untouched', value: '6' },
                  { status: 'untouched', value: '5' },
                  { status: 'touched', value: '7' },
                ],
              });
            }
            return question;
          }),
        }));
    });

    it('Can validate an incorrect answer provided', () => {
      expect(quizReducer(initialStateWithQuestions, { type: 'VALIDATE_ANSWER', answer: '5' }))
        .toEqual(Object.assign({}, initialStateWithQuestions, {
          questionAnswered: 'true',
          answeredCorrectly: false,
          questions: initialStateWithQuestions.questions.map((question, i) => {
            if (i === 0) {
              return Object.assign({}, question, {
                possibleAnswers: [
                  { status: 'untouched', value: '8' },
                  { status: 'untouched', value: '6' },
                  { status: 'touched', value: '5' },
                  { status: 'untouched', value: '7' },
                ],
              });
            }
            return question;
          }),
        }));
    });
  });

  describe('Scoring', () => {
    it('Can increment score when answered correctly', () => {
      expect(quizReducer(initialStateWithQuestions, { type: 'VALIDATE_ANSWER', answer: '7' }))
        .toEqual(Object.assign({}, initialStateWithQuestions, {
          questionAnswered: 'true',
          answeredCorrectly: true,
          score: 1,
          questions: initialStateWithQuestions.questions.map((question, i) => {
            if (i === 0) {
              return Object.assign({}, question, {
                possibleAnswers: [
                  { status: 'untouched', value: '8' },
                  { status: 'untouched', value: '6' },
                  { status: 'untouched', value: '5' },
                  { status: 'touched', value: '7' },
                ],
              });
            }
            return question;
          }),
        }));
    });

    it('Does not increment score when answered incorrectly', () => {
      expect(quizReducer(initialStateWithQuestions, { type: 'VALIDATE_ANSWER', answer: '5' }))
        .toEqual(Object.assign({}, initialStateWithQuestions, {
          questionAnswered: 'true',
          answeredCorrectly: false,
          questions: initialStateWithQuestions.questions.map((question, i) => {
            if (i === 0) {
              return Object.assign({}, question, {
                possibleAnswers: [
                  { status: 'untouched', value: '8' },
                  { status: 'untouched', value: '6' },
                  { status: 'touched', value: '5' },
                  { status: 'untouched', value: '7' },
                ],
              });
            }
            return question;
          }),
        }));
    });
  });
});
