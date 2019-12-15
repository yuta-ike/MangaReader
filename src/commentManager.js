import * as lsm from './localStorageManager.js'
if(localStorage.getItem("comment") == null){
  localStorage.setItem("comment",JSON.stringify({}))
}

export const add = (bookId, value) => {
  let newData = lsm.get("comment")
  if(newData == null) newData = {}
  if(newData[bookId] == null) newData[bookId] = []
  
  if(value in newData[bookId]) return
  newData[bookId].push(value)
  lsm.set("comment", newData)
}

export const get = (bookId) => {
  const comments = lsm.get("comment")[bookId]
  if(comments == null) return []
  return comments.sort((a, b) => a.pos > b.pos ? 1 : -1) || []
}

export const getSearcher = (bookId) => (pos) => {
  // console.log(pos)
  const comments = get(bookId)
  const aroundComment = comments.filter(comment => Math.abs(comment.pos - pos) < 150)
  if(aroundComment.length == 0) return {text:""}
  return aroundComment.reduce((bestComment, comment) => Math.abs(bestComment.pos - pos) > Math.abs(comment.pos - pos) ? comment : bestComment, aroundComment[0])
}