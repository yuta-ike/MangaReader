import React from 'react';
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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

export default withRouter(function BookmarkCard(props){
  const classes = useStyles()
  const { id, list } = props

  const jump = (payload) => () => {
    props.history.push(`view/${id}/${payload}`)
  }

  return (
    <React.Fragment>
      <Card className={classes.card} elevation={1}>
        <CardContent>
          <Typography variant="subtitle1" color="textSecondary" component="h4" className={classes.title}>
            {list[0].title}
          </Typography>
            {list.map(({payload, name},i) => <Button style={{margin: "4px"}} variant="outlined" color="primary" onClick={jump(payload)}>
              {name != null ? name : `しおり ${i+1}`}
            </Button>)}
        </CardContent>
      </Card>
    </React.Fragment>
  )
})