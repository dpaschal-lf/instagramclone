import React from 'react';
import './App.css';
import {Switch, Route, Link} from 'react-router-dom';
import Gallery from './components/gallery/Gallery.js';
import GalleryItemDetails from './components/gallery/GalleryItemDetails.js';
import GalleryItemAdd from './components/gallery/GalleryItemAdd.js';
import GalleryUpload from './components/gallery/GalleryUpload.js';
import Login from './components/connect/Login.js';

class App extends React.Component{
  constructor(props){
    super(props);
    this.handleUserLogin = this.handleUserLogin.bind( this );
    this.state = {
      token: localStorage.getItem('authToken')
    }
  }
  handleUserLogin( token ){
    localStorage.authToken = token;
  }
  render(){
    if(this.state.token === null){
      return <Login success={this.handleUserLogin} failure={()=>{}}/>
    }
    return(
      <div className="app">
        <header className="header">
          <Link to="/upload" className="button add">+</Link>
        </header>
        
        <Switch>
          <Route exact path={['/','/gallery']}><Gallery /></Route>
          <Route path="/gallery/add/"><GalleryItemAdd /></Route>
          <Route path="/gallery/:id" component={GalleryItemDetails} />
          <Route path="/upload" component={GalleryUpload} />
        </Switch>
      </div>
    );
  }
}

export default App;