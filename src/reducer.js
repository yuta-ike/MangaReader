import apiData from './apiData.js'

const caches = {
  shell:null,
  series:{},
  book:{},
}

const states = {
  seriesId:null, bookIds:[], currentPageNum:null
}

const reducer = async ({type, params}) => {
  if(type === "shell"){
    if(caches.shell != null) return {content:caches.shell}

    const result = await apiData.allSeries()
    caches.shell = result
    return {content:result}
  }else if(type === "series"){
    const seriesId = params.seriesId
    states.seriesId = seriesId

    if(seriesId in caches.series) return {content:caches.series[seriesId]}

    const result = await apiData.series(seriesId)
    states.bookIds = result.books.map(({id}) => id)
    states.currentPageNum = 0
    caches.series[seriesId] = result
    return {content:result, hasNext: states.bookIds.length > 0, hasPrev: false}
  }else if(type === "book"){
    const bookId = params.bookId
    states.currentPageNum = states.bookIds.indexOf(bookId)
    if(bookId in caches.book) return {content:caches.book[bookId], next: states.bookIds[states.currentPageNum + 1], prev:states.bookIds[states.currentPageNum - 1]}

    const result = await apiData.book(bookId)
    caches.book[bookId] = result
    return {content:result, next: states.bookIds[states.currentPageNum + 1], prev:states.bookIds[states.currentPageNum - 1],}
  }else{
    throw new Error("Unknown type")
  }
}

export default reducer