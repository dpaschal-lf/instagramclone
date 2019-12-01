import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Gallery from './components/gallery/Gallery.js';
import GalleryItemDetails from './components/gallery/GalleryItemDetails.js';
import GalleryItemAdd from './components/gallery/GalleryItemAdd.js';

class App extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="app">
        <Switch>
          <Route exact path={['/','/gallery']}><Gallery /></Route>
          <Route path="/gallery/add/"><GalleryItemAdd /></Route>
          <Route path="/gallery/:id" component={GalleryItemDetails} />
        </Switch>
      </div>
    );
  }
}

export default App;