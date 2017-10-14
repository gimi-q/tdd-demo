export default function quiz(state = {}, action) {
  switch (action.type) {
    case 'LOAD_QUESTIONS':
      return Object.assign({}, state, {
        questions: action.questions,
      });

    default:
      return state;
  }
}
