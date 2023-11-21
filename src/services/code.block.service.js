// import { storageService } from "../services/async-storage.service.js"; // for the local storage 
import {httpService} from'../services/http.service.js'
export const codeBlockesService = {
  query,
  getById,
  save,
};
window.cs = codeBlockesService;

const STORAGE_KEY = 'codeblock'

async function query() {
  return httpService.get(STORAGE_KEY)

  // var codeblockes = await storageService.query("codeblockes");
  // return codeblockes;
}

function getById(codeId) {
  // return storageService.get("codeblockes", codeId);
  return httpService.get(`${STORAGE_KEY}/${codeId}`)
}

async function save(codeBlock) {
  var savedCode;
  if (codeBlock._id) {
    // savedCode = await storageService.put("codeblockes", code);
    return httpService.put(`${STORAGE_KEY}/${codeBlock._id}`, codeBlock);
  } else {
    // savedCode = await storageService.post("codeblockes", code);
    savedCode = await httpService.post(`{STORAGE_KEY}`, codeBlock)
  }
  return savedCode;
}
