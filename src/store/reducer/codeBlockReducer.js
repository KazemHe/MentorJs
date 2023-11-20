import { UPDATE_CODE, SET_CODE } from "../actions/codeBlockActions";

const INITIAL_STATE = {
  codeBlocks: [],
};

const codeBlockReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_CODE:
      return {
        ...state,
        codeBlocks: action.codeBlocks, // Update code with the array of code blocks
      };
    case UPDATE_CODE:
      // Update a specific code block in the code array
      const updatedCode = state.code.map(codeBlock => {
        if (codeBlock.id === action.updatedCodeBlock.id) {
          return action.updatedCodeBlock;
        }
        return codeBlock;
      });
  
      return {
        ...state,
        code: updatedCode,
      };
    default:
      return state;
  }
  
};

export default codeBlockReducer;
