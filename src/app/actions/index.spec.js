import * as types from '../constants/ActionTypes';
import * as actions from './index';

describe('dogbark actions', () => {
  it('addDogbark should create ADD_DOGBARK action', () => {
    expect(actions.addDogbark('Use Redux')).toEqual({
      type: types.ADD_DOGBARK,
      text: 'Use Redux'
    });
  });

  it('deleteDogbark should create DELETE_DOGBARK action', () => {
    expect(actions.deleteDogbark(1)).toEqual({
      type: types.DELETE_DOGBARK,
      id: 1
    });
  });

  it('editDogbark should create EDIT_DOGBARK action', () => {
    expect(actions.editDogbark(1, 'Use Redux everywhere')).toEqual({
      type: types.EDIT_DOGBARK,
      id: 1,
      text: 'Use Redux everywhere'
    });
  });

  it('completeDogbark should create COMPLETE_DOGBARK action', () => {
    expect(actions.completeDogbark(1)).toEqual({
      type: types.COMPLETE_DOGBARK,
      id: 1
    });
  });

  it('completeAll should create COMPLETE_ALL action', () => {
    expect(actions.completeAll()).toEqual({
      type: types.COMPLETE_ALL
    });
  });

  it('clearCompleted should create CLEAR_COMPLETED action', () => {
    expect(actions.clearCompleted()).toEqual({
      type: types.CLEAR_COMPLETED
    });
  });
});
