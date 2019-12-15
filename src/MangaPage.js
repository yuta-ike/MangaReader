import React, { useRef, useEffect } from 'react';
import useLazy from './useLazy.js'
import LazyLoad from 'react-lazyload'

import { load } from './ImageLoader.js'

export default function Page(props){
  const { url, loaded } = props


  const promise = load(url, loaded)
  const src = useLazy(promise, "/loading.png")
  

  return(
    <LazyLoad width="100%">
      <img alt="manga page" width="100%" src={src}/*ref={imgRef}*//>
    </LazyLoad>

  )
}