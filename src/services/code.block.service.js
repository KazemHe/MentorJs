// var gCodes = _loadCodes()_loadCodes


async function getCodes(filterBy) {
    return httpService.get(STORAGE_KEY, filterBy)
    // const values = Object.values(filterBy) 
    
    // const str = values.join('') 
    // let CodesToReturn = gCodes
  
    // if (str === 'ALL') {
    //   CodesToReturn = gCodes
    // }
    // else
    //  if (str) {
    //   CodesToReturn = gCodes.filter(code => str.includes(code.category))
    // }
  
    // return Promise.resolve([...CodesToReturn])
  } 
  
  function getcodeById(codeId) {
    return httpService.get(`code/${codeId}`)
    // return storageService.get(STORAGE_KEY, codeId)
  
    // return new Promise((resolve, reject) => {
    //   const code = gCodes.find((code) => code._id === id)
    //   code ? resolve(code) : reject(`code id ${id} not found!`)
    // })
  }
  
  async function savecode(code) {
    var savedcode
    if (code._id) {
      // savedcode = await storageService.put(STORAGE_KEY, code)
      savedcode = await httpService.put(`code/${code._id}`, code)
  
    } else {
      // savedcode = await storageService.post(STORAGE_KEY, code)
      savedcode = await httpService.post('code', code)
    }
    return savedcode
  
    // return code._id ? _updatecode(code) : _addcode(code)
  }
  
  async function deletecode(codeId) {
    return httpService.delete(`code/${codeId}`)
  
    // await storageService.remove(STORAGE_KEY, codeId)
    // const idx = gCodes.findIndex(code => code._id === id)
    // gCodes.splice(idx, 1)
  
    // storageServiceB.store(STORAGE_KEY, gCodes)
    // return Promise.resolve()
  }
  
  // function _updatecode(code) {
  //   return new Promise((resolve, reject) => {
  //     const index = gCodes.findIndex((c) => code._id === c._id)
  //     if (index !== -1) {
  //       gCodes[index] = code
  //     }
  //     resolve(code)
  //   })
  // }
  
  // function _addcode(code) {
  //   return new Promise((resolve, reject) => {
  //     code._id = _makeId() 
  //     gCodes.push(code)  // Directly add the code object to the array
  //     storageServiceB.store(STORAGE_KEY, gCodes) 
  //     resolve(code) 
  //   }) 
  // }
  
  // function _loadCodes() {
  //   let Codes = storageServiceB.load(STORAGE_KEY)
  //   if (!Codes || !Codes.length) Codes = gDefaultCodes
  //   storageServiceB.store(STORAGE_KEY, Codes)
  //   return Codes
  // }
  
  
  function getCategories() {
    // let categories = _loadCodes() 
    // let uniqueCategories = [...new Set(categories.map((code) => code.category))] 
    // uniqueCategories.unshift("ALL")  // Add "ALL" as the first element
  
    let uniqueCategories = ['WORK','PROJECTS','PERSONAL']
  
    return uniqueCategories 
  }
  
  
  function sort(arr) {
    return arr.sort((a, b) => {
      if (a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) {
        return -1
      }
      if (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()) {
        return 1
      }
  
      return 0
    })
  }
  
  function getEmptycode() {
    return {
      mediaUrl: '',  
      category: '',
    } 
  }
  
  // function filter(term) {
  //   term = term.toLocaleLowerCase()
  //   return gCodes.filter((code) => {
  //     return (
  //       code.title.toLocaleLowerCase().includes(term) ||
  //       code.categories.toLocaleLowerCase().includes(term) ||
  //       code.mediaurl.toLocaleLowerCase().includes(term)
  //     )
  //   })
  // }
  
  function _makeId(length = 10) {
    var title = ''
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0;  i < length;  i++) {
      title += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return title
  }
  