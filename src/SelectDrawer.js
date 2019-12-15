import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import apiData from './apiData.js'
import useLazy from './useLazy.js'
import reducer from './reducer.js'

const useStyles = makeStyles(theme => ({
  modal:{
    fontSize: "1.6rem",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    zIndex: theme.zIndex.drawer,
    overflowY: "scroll",
  },
  background:{
    width: "autp"
  }
}))

export default withRouter(function SelectDrawer(props){
  const classes = useStyles()
  const { open, seriesId, onClose } = props

  const seriesData = useLazy(reducer({type:"series", params:{seriesId}}).then(res => res.content), {books:[]})

  const handleClick = (id) => () => {
    props.history.push(`/view/${id}`)
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <div className={classes.background} onClick={handleClose}>
      <Drawer
        className={classes.modal}
        anchor="bottom"
        open={open}
        PaperProps={{
          style:{
            position: "fixed",
            height: "50%",
            margin: 0,
            marginLeft: "2.5%",
            marginRight: "2.5%",
            bottom: 0,
            borderRadius: "8px",
          },
        }}
      >
        <List>
          {
            seriesData.books.map(({id, image, title}) => (
              <ListItem button key={id} onClick={handleClick(id)} onClose={handleClose}>
                <ListItemText primary={title}/>
              </ListItem>
            ))
          }
        </List>
      </Drawer>
    </div>
  )
})
