const map = {}

export const load = (url, loaded) => {
  const result = new Promise((resolved, rejected) => {
    if(url in map) return map[url]
    const image = new Image()
    image.onload = () => {
      resolved(url)
      loaded && loaded()
      image.onload = null
    }
    image.src = url
  })
  map[url] = result
  return result
}
