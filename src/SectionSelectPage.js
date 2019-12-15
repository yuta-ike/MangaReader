import React from 'react';
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';

import apiData from './apiData.js'
import useLazy from './useLazy.js'
import reducer from './reducer.js'

export default withRouter(function SectionSelectPage(props){
  const openBook = (bookId) => () => {
    props.history.push(`/view/${bookId}`)
  }

  const seriesId = props.match.params.seriesId
  const seriesData = useLazy(reducer({type:"series", params:{seriesId}}).then(res => res.content), {books:[]})

  return (
    <React.Fragment>
      {
        seriesData.books.map((data) => (
          <Button key={data.id} onClick={openBook(data.id)}>
           {data.title}
          </Button>
        ))
      }
    </React.Fragment>
  )
})
