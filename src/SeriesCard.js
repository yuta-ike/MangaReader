import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import GeneralButton from './GeneralButton'
import SelectDrawer from './SelectDrawer.js'

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(1),
  },
  title: {
    color: "black",
    marginBottom: 12,
  },
  description:{
    color: "rgb(20,20,20)",
  },
  iconButtonArea:{
    paddingTop: '0.1rem',
    paddingBottom: '0.1rem',
  },
  bottom:{
    display:'flex',
  },
  bottomButton:{
    height: '3rem',
    margin:'0 auto',
    textAlign:'center',
    paddingTop: '1em',
    fontWeight: 'bold',
  },
  bottomButtonContainer:{
    display: 'flex',
  },
  content:{
    background: "rgba(255,255,255,0.6)",
  },
}))

export default withRouter(function VideoCard(props){
  const classes = useStyles()
  const { data, onClick } = props

  const [open, setOpen] = useState(false)
  const handleClick = (e) => {
    setOpen(true)
  }

  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [favorite, setFavorite] = useState(props.favorite)
  
  async function handleFavorite(){
    setFavorite(!favorite)
  }

  return (
    <React.Fragment>
      <Card className={classes.card} elevation={2}>
        <div onClick={handleClick}>
          <CardMedia>
            <img alt={`thumbnail of ${data.title}`} width="100%" src={data.seriesImage}/> :
          </CardMedia>
          <CardContent>
            <Typography variant="h6" color="textSecondary" component="h4" className={classes.title}>
              {data.title}
            </Typography>
            <Typography style={{marginLeft:"auto"}} variant="body2" color="textSecondary" component="p" className={classes.description}>
              {data.author}
            </Typography>
            <Typography style={{textAlign:"right"}} variant="body2" color="textSecondary" component="p" className={classes.description}>
            {data.publisher} 全{data.volumes}巻
            </Typography>
            <br/>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.description} style={{whiteSpace: 'pre-line'}}>
              {data.description}
            </Typography>
          </CardContent>
        </div>
        <Divider/>
        <div className={classes.bottom}>
          <CardActions disableSpacing>
            <GeneralButton type="favorite" onClick={handleFavorite} value={favorite}/>
            <GeneralButton type="share" onClick={() => setShareDialogOpen(true)}/>
            {/* <ShareDialog open={shareDialogOpen} setOpen={setShareDialogOpen}/> */}
          </CardActions>
        </div>
      </Card>
      <SelectDrawer open={open} seriesId={data.seriesId} onClose={() => setOpen(false)}/>
    </React.Fragment>
  )
})
