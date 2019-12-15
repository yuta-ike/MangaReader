import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MangaPage from "./MangaPage.js"
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import reducer from './reducer.js';


const useStyles = makeStyles(theme => ({
  appBar:{
    height: "50px"
  },
  appBarBottom:{
    height: "50px",
    top: 'auto',
    bottom: 0,
  },
  footer:{
    display: "block",
    height: "300px",
  },
  button:{
    margin: theme.spacing(2)
  },
  iconButton:{
    color: "#ffffff"
  },
  bottomToolbar:{
    display: "flex",
    justifyContent: "flex-end"
  }
}))

export default withRouter(function Viewer(props){
  const classes = useStyles()
  const { urls, data, nextBookId, prevBookId } = props

  
  const elements = []
  const promises = urls.slice(0,200)
                        .map(
                          (url, i) => new Promise(
                            (resolved, rejected) => {
                              const page = <MangaPage key={url} url={url} loaded={() => {resolved(page)}}/>
                              elements.push(page)
                            }
                          )
                        )

  // const elements = urls.map((url) => <MangaPage key={url} url={url}/>)
  

  // const handleClick = (direction) => async () => {
  //     props.history.push(`/view/${nextBookId}`)
  //     window.scrollTo({top:0,left:0,behavior:"smooth"})
  //     window.location.reload()
  // }

  return(
    <React.Fragment>
      <Container>
        {elements}
      </Container>
      <Divider/>
    </React.Fragment>
  )
})