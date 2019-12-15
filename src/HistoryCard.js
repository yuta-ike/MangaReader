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
  container:{
    display: "grid",
    "grid-template-columns": "repeat(auto-fit, minmax(100px, 1fr))",
  }
}))

export default withRouter(function BookmarkCard(props){
  const classes = useStyles()
  const { id, title, pos } = props

  const openBook = () => {
    props.history.push(`view/${id}/${pos}`)
  }

  return (
    <div>
      <Card className={classes.card} elevation={1} onClick={openBook}>
        <CardContent>
          <Typography variant="subtitle1" color="textSecondary" component="h4" className={classes.title}>
            {title}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
})