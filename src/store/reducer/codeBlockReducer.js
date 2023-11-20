import { UPDATE_CODE, SET_CODE } from "../actions/codeBlockActions";

const INITIAL_STATE = {
  codeBlocks: [],
};

const codeBlockReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CODE:
      return {
        ...state,
        codeBlocks: action.codeBlocks, // Update codeBlocks with the array of code blocks
      };

    case UPDATE_CODE:
      return {
        ...state,
        codeBlocks: state.codeBlocks.map((codeBlock) =>
          codeBlock._id === action.codeBlock._id ? { ...codeBlock, starter: action.codeBlock.starter } : codeBlock
        ),
      };


    default:
      return state;
  }
};

export default codeBlockReducer;
