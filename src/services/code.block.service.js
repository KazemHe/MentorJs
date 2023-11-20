import { storageService } from "../services/async-storage.service.js";
export const codeBlockesService = {
  query,
  getById,
  save,
};
window.cs = codeBlockesService;

// const STORAGE_KEY = 'codeblockes'

async function query(filterBy) {
  // return httpService.get(STORAGE_KEY, filterBy)

  var codeblockes = await storageService.query("codeblockes");
  return codeblockes;
}

function getById(codeId) {
  return storageService.get("codeblockes", codeId);
  // return httpService.get(`gig/${codeId}`)
}

async function save(code) {
  var savedCode;
  if (code._id) {
    savedCode = await storageService.put("codeblockes", code);
    // savedCode = await httpService.put(`gig/${gig._id}`, gig)
  } else {
    savedCode = await storageService.post("codeblockes", code);
    // savedCode = await httpService.post('gig', gig)
  }
  return savedCode;
}
