let loadingImage;
export default () => {
  if(loadingImage != null) {
    return loadingImage
  }else{
    loadingImage = new Image()
    loadingImage.src = "./static/img/loading.png"
    return loadingImage
  }
}