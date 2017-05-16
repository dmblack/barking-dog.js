import dogbarks from './dogbarks';
import * as types from '../constants/ActionTypes';

describe('dogbarks reducer', () => {
  it('should handle initial state', () => {
    expect(
      dogbarks(undefined, {})
    ).toEqual([
      {
        text: 'Use Redux',
        completed: false,
        id: 0
      }
    ]);
  });

  it('should handle ADD_DOGBARK', () => {
    expect(
      dogbarks([], {
        type: types.ADD_DOGBARK,
        text: 'Run the tests'
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: 0,
        date: new Date()
      }
    ]);

    expect(
      dogbarks([
        {
          text: 'Use Redux',
          completed: false,
          id: 0,
          date: new Date()
        }
      ], {
        type: types.ADD_DOGBARK,
        text: 'Run the tests'
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: 1,
        date: new Date()
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0,
        date: new Date()
      }
    ]);

    expect(
      dogbarks([
        {
          text: 'Run the tests',
          completed: false,
          id: 1,
          date: new Date()
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0,
          date: new Date()
        }
      ], {
        type: types.ADD_DOGBARK,
        text: 'Fix the tests'
      })
    ).toEqual([
      {
        text: 'Fix the tests',
        completed: false,
        id: 2,
        date: new Date()
      }, {
        text: 'Run the tests',
        completed: false,
        id: 1,
        date: new Date()
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0,
        date: new Date()
      }
    ]);
  });

  it('should handle DELETE_DOGBARK', () => {
    expect(
      dogbarks([
        {
          text: 'Run the tests',
          completed: false,
          id: 1
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ], {
        type: types.DELETE_DOGBARK,
        id: 1
      })
    ).toEqual([
      {
        text: 'Use Redux',
        completed: false,
        id: 0
      }
    ]);
  });

  it('should handle EDIT_DOGBARK', () => {
    expect(
      dogbarks([
        {
          text: 'Run the tests',
          completed: false,
          id: 1,
          date: new Date()
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0,
          date: new Date()
        }
      ], {
        type: types.EDIT_DOGBARK,
        text: 'Fix the tests',
        id: 1
      })
    ).toEqual([
      {
        text: 'Fix the tests',
        completed: false,
        id: 1,
        date: new Date()
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0,
        date: new Date()
      }
    ]);
  });

  it('should handle COMPLETE_DOGBARK', () => {
    expect(
      dogbarks([
        {
          text: 'Run the tests',
          completed: false,
          id: 1
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ], {
        type: types.COMPLETE_DOGBARK,
        id: 1
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: true,
        id: 1
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0
      }
    ]);
  });

  it('should handle COMPLETE_ALL', () => {
    expect(
      dogbarks([
        {
          text: 'Run the tests',
          completed: true,
          id: 1
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ], {
        type: types.COMPLETE_ALL
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: true,
        id: 1
      }, {
        text: 'Use Redux',
        completed: true,
        id: 0
      }
    ]);

    // Unmark if all dogbarks are currently completed
    expect(
      dogbarks([
        {
          text: 'Run the tests',
          completed: true,
          id: 1
        }, {
          text: 'Use Redux',
          completed: true,
          id: 0
        }
      ], {
        type: types.COMPLETE_ALL
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: 1
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0
      }
    ]);
  });

  it('should handle CLEAR_COMPLETED', () => {
    expect(
      dogbarks([
        {
          text: 'Run the tests',
          completed: true,
          id: 1
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ], {
        type: types.CLEAR_COMPLETED
      })
    ).toEqual([
      {
        text: 'Use Redux',
        completed: false,
        id: 0
      }
    ]);
  });

  it('should not generate duplicate ids after CLEAR_COMPLETED', () => {
    expect(
      [
        {
          type: types.COMPLETE_DOGBARK,
          id: 0
        }, {
          type: types.CLEAR_COMPLETED
        }, {
          type: types.ADD_DOGBARK,
          text: 'Write more tests'
        }
      ].reduce(dogbarks, [
        {
          id: 0,
          completed: false,
          text: 'Use Redux',
          date: new Date()
        }, {
          id: 1,
          completed: false,
          text: 'Write tests',
          date: new Date()
        }
      ])
    ).toEqual([
      {
        text: 'Write more tests',
        completed: false,
        id: 2,
        date: new Date()
      }, {
        text: 'Write tests',
        completed: false,
        id: 1,
        date: new Date()
      }
    ]);
  });
});
