import {ADD_DOGBARK, DELETE_DOGBARK, EDIT_DOGBARK, COMPLETE_DOGBARK, COMPLETE_ALL, CLEAR_COMPLETED} from '../constants/ActionTypes';

const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
];

export default function dogbarks(state = initialState, action) {
  switch (action.type) {
    case ADD_DOGBARK:
      return [
        {
          id: state.reduce((maxId, dogbark) => Math.max(dogbark.id, maxId), -1) + 1,
          completed: false,
          text: action.text,
          date: new Date()
        },
        ...state
      ];

    case DELETE_DOGBARK:
      return state.filter(dogbark =>
        dogbark.id !== action.id
      );

    case EDIT_DOGBARK:
      return state.map(dogbark =>
        dogbark.id === action.id ?
          Object.assign({}, dogbark, {text: action.text, date: new Date()}) :
          dogbark
      );

    case COMPLETE_DOGBARK:
      return state.map(dogbark =>
        dogbark.id === action.id ?
          Object.assign({}, dogbark, {completed: !dogbark.completed}) :
          dogbark
      );

    case COMPLETE_ALL: {
      const areAllMarked = state.every(dogbark => dogbark.completed);
      return state.map(dogbark => Object.assign({}, dogbark, {
        completed: !areAllMarked
      }));
    }

    case CLEAR_COMPLETED:
      return state.filter(dogbark => dogbark.completed === false);

    default:
      return state;
  }
}
