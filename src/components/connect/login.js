import React from 'react';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.handleUpdate = this.handleUpdate.bind( this );
        this.handleLogin = this.handleLogin.bind( this );
        this.state = {
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
            this.props.success( response.token );
        })
        .catch( ()=>{
            this.props.failure();
        })
    }
    render(){
        return(
            <div>
                <input onChange={this.handleUpdate} defaultValue="daniel.paschal@gmail.com" type="text" name="email" placeholder="user name"/>
                <input onChange={this.handleUpdate} defaultValue="woohoo" type="password" name="password" placeholder="password"/>
                <button onClick={this.handleLogin}>Log in</button>
                <button>Create Account</button>
            </div>
        )
    }
}

export default Login;