import * as lsm from './localStorageManager.js'
if(localStorage.getItem("history") == null){
  localStorage.setItem("history",JSON.stringify([]))
}

export const add = (value) => {
  let newData = lsm.get("history")
  if(newData == null) newData = []
  
  newData = newData.filter(({id}) => id !== value.id)

  if(newData.length > 3) return
  newData.push(value)
  lsm.set("history", newData)
}

export const get = (bookId) => {
  return lsm.get("history") || []
}