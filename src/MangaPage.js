import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useLazy from './useLazy.js'
import LazyLoad from 'react-lazyload'

import { load } from './ImageLoader.js'

const useStyles = makeStyles(theme => ({
  container:{
    [theme.breakpoints.up('sm')]:{
      display:"flex",
      flexDirection: "column"
    }
  },
  image:{
    width: "100%",
    [theme.breakpoints.up('sm')]:{
      width: "400px",
      right: 0,
      left: 0,
      margin: "0 auto"
    }
  }
}))

export default function Page(props){
  const classes = useStyles()
  const { url, loaded } = props


  const promise = load(url, loaded)
  const src = useLazy(promise, "/loading.png")
  
  return(
    <LazyLoad width="100%">
      <div className={classes.container}>
        <img className={classes.image} alt="manga page" style={{widht:"100%"}}src={src}/*ref={imgRef}*//>
      </div>
    </LazyLoad>

  )
}