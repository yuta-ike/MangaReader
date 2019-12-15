import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import TitleSelectPage from './TitleSelectPage.js'
import SectionSelectPage from './SectionSelectPage.js'
import ViewPage from './ViewPage.js'

function App() {
  return (
    <Router>
      <Route exact path='/' component={TitleSelectPage} />
      {/* <Route exact path='/index' component={Home} /> */}
      <Route path='/series/:seriesId' component={SectionSelectPage} />
      {/* <Route path='/view/:bookId' component={ViewPage} /> */}
      <Route path='/view/:bookId/:pagenum' component={ViewPage} />
      {/* <Button onClick={console.log}>作品Aを読む</Button>
      <Viewer urls={["https://storage.googleapis.com/wfc2-image-api-259809.appspot.com/comic/dp/dp001/001dp_001.png"]}/> */}
    </Router>
  );
}

export default App;
