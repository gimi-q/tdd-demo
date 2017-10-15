import React from 'react';
import { getQuestions } from '../../helpers/helpers';

const Option = optionObj => <option selected={optionObj.selected}>{optionObj.value.toUpperCase()}</option>;

function optionList(options) {
  return options.map(option => Option(option));
}

export default function DifficultySelect(difficulty, store) {
  const onChange = (e) => {
    store.dispatch({ type: 'SET_DIFFICULTY', difficulty: e.target.value.toLowerCase() });
    getQuestions(1, store);
  };

  return (
  <div>
    <label>Difficulty: </label>
    <select onChange={onChange}>
      {optionList(difficulty)}
    </select>
  </div>
  );
}
