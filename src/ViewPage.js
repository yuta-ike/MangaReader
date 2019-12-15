import React, {useEffect, useState} from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import Viewer from './Viewer.js'
import apiData from './apiData.js'
import useLazy from './useLazy.js'
import reducer from './reducer.js'
import GeneralButton from './GeneralButton.js'
import * as bookmarkManager from './bookmarkManager'
import * as commentManager from './commentManager'
import * as historyManager from './historyManager.js'
import { get } from './localStorageManager.js';
import { isWidthDown } from '@material-ui/core';


function HideOnScroll(props) {
  const { children, window, direction } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction={direction} in={!trigger}>
      {children}
    </Slide>
  );
}

const useStyles = makeStyles(theme => ({
  appBar:{
    height: "50px"
  },
  appBarBottom:{
    top: 'auto',
    bottom: 0,
    height: "50px",
  },
  footer:{
    display: "block",
    margin: theme.spacing(2),
    marginBottom: "400px"
  },
  button:{
    margin: theme.spacing(2)
  },
  iconButton:{
    color: "#ffffff"
  },
  bottomToolbar:{
    display: "flex",
    justifyContent: "flex-end",
  },
  field:{
    background: "white",
    margin: theme.spacing(1),
  },
  fixedField:{
    position: "fixed",
    bottom:"50px",
    left: 0,
    color: "black",
    backgroundColor: "white",
    padding: theme.spacing(1),
    height: "50px",
    width: "100%",

    display:"flex",
    flexDirection: "column",
    justyifyContent: "center",
    border: "black solid 2px",
    borderRadius: "2px",
  },
  dialogTextField:{
    width: "100%"
  }
}))

export default withRouter(function ViewPage(props){
  const classes = useStyles()

  const bookId = props.match.params.bookId
  const pagenum = props.match.params.pagenum || 0
  useEffect(() => {
    setTimeout(() => window.scrollTo(0, pagenum), 500)
  }, [])

  const pages = useLazy(reducer({type:"book", params:{bookId}}), {content:{imageData:[]}})
  
  const handleClose = () => {
    historyManager.add({id: bookId, title: pages.content.title, pos: window.pageYOffset})

    props.history.push("/")
    window.scrollTo(0,0)
    window.location.reload()
  }

  const handleBookmark = () => {
    setOpen(true)
    // bookmarkManager.add(bookId, {title: pages.content.title, payload: window.pageYOffset})
  }

  const [text, setText] = useState("")
  const send = () => {
    commentManager.add(bookId, { text, pos: window.pageYOffset })
    setText("")
  }
  const [currentComment, setCurrentComment] = useState(null)

  useEffect(() => {
    const searchComment = commentManager.getSearcher(bookId)
    let flag = true;
    window.addEventListener("scroll", () => {
      if(flag === false) return
      flag = false
      
      const comment = searchComment(window.pageYOffset)
      setCurrentComment(comment)

      setTimeout(() => {      
        flag = true
      }, 100)
    })
  }, [])

  const [open, setOpen] = useState(false)
  const [bookmarkText, setBookmarkText] = useState("")
  const handleDialogClose = (register) => () => {
    if(register){
      bookmarkManager.add(bookId, {title: pages.content.title, name: bookmarkText, payload: window.pageYOffset})
    }
    setBookmarkText("")
    setOpen(false)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props} direction="down">
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="body1">{pages.content.title}</Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Viewer urls={pages.content.imageData.map(({imageUrl}) => imageUrl)} nextBookId={pages.next} prevBookId={pages.prev} onload={() => window.scrollTo(0, pagenum)}/>
      <div className={classes.footer}>
        <Typography variant="h6" color="textSecondary" component="h6" className={classes.title}>
          コメント一覧
        </Typography>
        {
          commentManager.get(bookId).map(comment => 
            <p>
              p{Math.ceil(comment.pos / (pages.content.height * (window.innerWidth / pages.content.width)))}：
              <a href={`${window.location.origin}/view/${bookId}/${comment.pos}`}>{comment.text}</a>
            </p>
          )
        }
      </div>

      <Slide appear={false} direction="right" in={
        currentComment != null && currentComment.text !== ""
      }>
        <div className={classes.fixedField}>
          {currentComment == null ? "" : currentComment.text}
        </div>
      </Slide>

      <AppBar className={classes.appBarBottom}>
        <Toolbar className={classes.bottomToolbar}>

          <TextField className={classes.field} value={text} onChange={e=>setText(e.target.value)} variant="outlined"/>
          <IconButton className={classes.iconButton} aria-label="send" onClick={send}>
            <SendIcon/>
          </IconButton>

          <GeneralButton type="favorite" onClick={handleBookmark}/>
          <IconButton className={classes.iconButton} aria-label="close" onClick={handleClose}>
            <CloseIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* </HideOnScroll> */}


      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"しおりの名前を入力してください"}</DialogTitle>
        <DialogContent>
          <TextField className={classes.dialogTextField} value={bookmarkText} onChange={e=>setBookmarkText(e.target.value)} variant="outlined"/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose(false)} color="primary">
            キャンセル
          </Button>
          <Button onClick={handleDialogClose(true)} color="primary" autoFocus>
            登録
          </Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  )
})