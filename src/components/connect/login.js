import React from 'React';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.handleUpdate = this.handleUpdate.bind( this );
        this.handleLogin = this.handleLogin.bind( this );
        this.state = {
            fields: {
                username: '',
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
                <input type="text" name="username" placeholder="user name"/>
                <input type="password" name="password" placeholder="password"/>
                <button>Log in</button>
                <button>Create Account</button>
            </div>
        )
    }
}

export default Login;