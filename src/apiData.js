import axios from 'axios'

const allSeries = async () => {
  return (await axios("https://wfc2-image-api-259809.appspot.com/api/series/")).data.data
}

const series = async (seriesId) => {
  return (await axios(`https://wfc2-image-api-259809.appspot.com/api/series/${seriesId}/`)).data
  
}

const book = async (bookId) => {
  return (await axios(`https://wfc2-image-api-259809.appspot.com/api/books/${bookId}/`)).data
}

export default {
  allSeries, series, book,
}