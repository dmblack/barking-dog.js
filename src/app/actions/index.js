import * as types from '../constants/ActionTypes';

export function addDogbark(text) {
  return {type: types.ADD_DOGBARK, text};
}

export function deleteDogbark(id) {
  return {type: types.DELETE_DOGBARK, id};
}

export function editDogbark(id, text) {
  return {type: types.EDIT_DOGBARK, id, text};
}

export function completeDogbark(id) {
  return {type: types.COMPLETE_DOGBARK, id};
}

export function completeAll() {
  return {type: types.COMPLETE_ALL};
}

export function clearCompleted() {
  return {type: types.CLEAR_COMPLETED};
}
