import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withRouter } from 'react-router-dom'

import SeriesCard from './SeriesCard.js'
import PC_SeriesCard from './PC_SeriesCard.js'
import HistoryCard from './HistoryCard.js'

import apiData from './apiData.js'
import useLazy from './useLazy.js'
import reducer from './reducer.js'
import * as bookmarkManager from './bookmarkManager.js'
import BookmarkCard from './BookmarkCard.js';
import * as historyManager from './historyManager.js'

const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(1),
  },
  space: {
    display:"block",
    height: theme.spacing(4)
  },
  container:{
    [theme.breakpoints.up('sm')]:{
      display: "grid",
      "grid-template-columns": "repeat(auto-fit, minmax(100px, 1fr))",
    }
  }
}))

export default withRouter(function TitleSelectPage(props){
  const classes = useStyles()

  const openSection = (id) => () => {
    props.history.push(`/series/${id}`)
  }

  const shellData = useLazy(reducer({type:"shell"}).then(res => res.content), [])
  
  const bookmarks = bookmarkManager.getAll()

  const matches = useMediaQuery('(min-width:600px)');
  return (
    <React.Fragment>
      <Typography variant="h4" color="textSecondary" component="h4" className={classes.title}>
        履歴
      </Typography>
      <div className={classes.container}>
      {
          historyManager.get().reverse().map(({id, title, pos}) => <HistoryCard id={id} title={title} pos={pos}/>)
      }
      </div>
      <div className={classes.space}/>
      <Divider/>
      <Typography variant="h4" color="textSecondary" component="h4" className={classes.title}>
        しおり
      </Typography>
      <div className={classes.container}>
      {
        bookmarks && Object.entries(bookmarks).map(([id, list]) => <BookmarkCard id={id} key={id} list={list}/>)
      }
      </div>
      <div className={classes.space}/>
      <Divider/>
      <Typography variant="h4" color="textSecondary" component="h4" className={classes.title}>
        作品一覧
      </Typography>
      {
        shellData.map(data => (
          matches ? <PC_SeriesCard data={data} key={data.seriesId} onClick={openSection(data.seriesId)}/> :
                    <SeriesCard data={data} key={data.seriesId} onClick={openSection(data.seriesId)}/>
        ))
      }
    </React.Fragment>
  )
})