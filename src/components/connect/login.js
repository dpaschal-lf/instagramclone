import React from 'react';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.handleUpdate = this.handleUpdate.bind( this );
        this.handleLogin = this.handleLogin.bind( this );
        this.handleLogout= this.handleLogout.bind( this );
        this.showLoginModal = this.showLoginModal.bind( this );
        this.hideLoginModal = this.hideLoginModal.bind( this );
        this.state = {
            loggedIn: false,
            modalShow: false,
            fields: {
                email: '',
                password: ''
            }
        }
    }
    handleUpdate(e){
        const element = e.target;
        const value = element.value;
        const name = element.getAttribute('name');
        const newFields = {...this.state.fields};
        newFields[name] = value;
        this.setState({
            fields: newFields
        })
    }
    handleLogin(){
        fetch('/api/login.php',{
            method: 'post',
            body: JSON.stringify(this.state.fields)
        })
        .then( response => response.json() )
        .then( response => {
            this.props.success( response );
        })
        .catch( ()=>{
            this.props.failure();
        })
    }
    handleLogout(){
        fetch('/api/logout.php',{
            headers: {
                'auth-token': localStorage.authToken
            }  
        })
        .then( () => {
            this.props.logout()
        })
    }
    showLoginModal(){
        this.setState({
            modalShow: true
        })
    }
    hideLoginModal(){
        this.setState({
            modalShow: false
        })
    }
    render(){
        if(this.state.loggedIn){
            return(
                <div className="logout">
                    <button onClick={this.handleLogout}>logout</button>
                </div>
            )
        }
        switch(this.props.mode){
            case 'logout': 
                return (
                    <button onClick={this.handleLogout}>logout</button>
                )
            case 'small':
                return (
                    <div className="smallLogin">
                        <input onChange={this.handleUpdate} defaultValue="daniel.paschal@gmail.com" type="text" name="email" placeholder="user name"/>
                        <input onChange={this.handleUpdate} defaultValue="woohoo" type="password" name="password" placeholder="password"/>
                        <button onClick={this.handleLogin}>Log in</button>
                    </div>
                )
            case 'modal':
                if(this.state.modalShow){
                    return (<div>Modal</div>)
                } else{
                    return (
                        <button onClick={this.showLoginModal}>Login</button>
                    )
                }
            case  'full':
            default:
                return(
                    <div className="loginPage">
                        <div className="loginDialog">
                            <input onChange={this.handleUpdate} defaultValue="daniel.paschal@gmail.com" type="text" name="email" placeholder="user name"/><br/>
                            <input onChange={this.handleUpdate} defaultValue="woohoo" type="password" name="password" placeholder="password"/><br/>
                            <button onClick={this.handleLogin}>Log in</button><br/>
                            <button>Create Account</button>
                        </div>
                    </div>
                )
        }
    }
}

export default Login;