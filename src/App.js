import React from 'react';
import './App.css';
import {Switch, Route, Link} from 'react-router-dom';
import Gallery from './components/gallery/Gallery.js';
import GalleryItemDetails from './components/gallery/GalleryItemDetails.js';
import GalleryItemAdd from './components/gallery/GalleryItemAdd.js';
import GalleryUpload from './components/gallery/GalleryUpload.js';
import LoginComponent from './components/connect/Login.js';
import UserDisplay from './components/userDisplay/UserDisplay.js'

class App extends React.Component{
  constructor(props){
    super(props);
    this.handleUserLogin = this.handleUserLogin.bind( this );
    this.handleUserLogout = this.handleUserLogout.bind( this );
    this.state = {
      token: localStorage.getItem('authToken'),
      userData: null
    }
  }
  handleUserLogin( response){
    debugger;
    localStorage.authToken = response.token;
    localStorage.authUser = response.userData.externalID;

    this.setState({
      token: response.token,
      userData: response.userData
    })
  }
  handleUserLogout(){
    this.setState({
      token: null
    })  
  }
  render(){
    if(this.state.token === null){
      return <LoginComponent success={this.handleUserLogin} failure={()=>{}} logout={this.handleUserLogout}/>
    }
    return(
      <div className="app">
        <header className="header">
          <Link to="/upload" className="button add">+</Link>
          <UserDisplay  display="medium" data={this.state.userData}/>
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