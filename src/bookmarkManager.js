import * as lsm from './localStorageManager.js'
export const add = (bookId, value) => {
  let newData = lsm.get("bookmark")
  if(newData == null) newData = {}
  if(newData[bookId] == null) newData[bookId] = []
  
  if(value in newData[bookId]) return
  newData[bookId].push(value)
  if(newData[bookId].length > 3) newData[bookId].shift()
  lsm.set("bookmark", newData)
}

export const getAll = () => {
  return lsm.get("bookmark")
}

export const get = (title) => {
  return getAll()[title] || []
}