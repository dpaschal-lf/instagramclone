import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Gallery from './components/gallery/Gallery.js';
import GalleryItem from './components/gallery/GalleryItem.js';
import GalleryItemAdd from './components/gallery/GalleryItemAdd.js';

class App extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Switch>
        <Route exact path={['/','/gallery']}><Gallery /></Route>
        <Route path="/gallery/add/"><GalleryItemAdd /></Route>
        <Route path="/gallery/:id"><GalleryItem /></Route>
      </Switch>
    );
  }
}

export default App;