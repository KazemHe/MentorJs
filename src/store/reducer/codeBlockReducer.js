import { UPDATE_CODE } from '../actions/codeBlockActions';

const initialState = {
  code: [],
};

const codeBlockReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_CODE:
      return {
        ...state,
        code: action.payload,
      };
    default:
      return state;
  }
};

export default codeBlockReducer;
