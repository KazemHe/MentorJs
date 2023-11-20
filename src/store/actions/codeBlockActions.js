import { codeBlockesService } from "../../services/code.block.service.js";
export const UPDATE_CODE = "UPDATE_CODE";
export const SET_CODE = "SET_CODE";

export function loadCodeBlocks() {
  return async (dispatch) => {
    try {
      const codeBlocks = await codeBlockesService.query();
      const action = {
        type: SET_CODE,
        codeBlocks,
      };
      dispatch(action);
    } catch (error) {
      console.error('error:', error);
    }
  };
}

export function saveCodeBlock(codeBlock) {

  console.log('codeBlock',codeBlock)
  return async (dispatch) => {
    try {
      const updatedCodeBlock = await codeBlockesService.save(codeBlock);
      const action = {
        type: UPDATE_CODE,
        codeBlock: updatedCodeBlock,
        
      };
      dispatch(action);
    } catch (error) {
      console.error('error:', error);
    }
  };
}
