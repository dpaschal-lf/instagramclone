import React from 'react';

class UserDisplay extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data || null
        }
    }
    componentDidMount(){
        if(!this.props.data){
            this.getUserData();
        }
    }
    getUserData(){
        fetch(`/api/user.php?id=${this.props.id}`,{
            headers:{
                authToken: localStorage.authToken
            }
        })
            .then( response => response.json() )
            .then( response => {
                this.setState({
                    data: response
                })
            });
    }
    render(){
        if(this.state.data === null){
            return <div>Loading data...</div>
        }
        switch( this.props.display ){
            case 'medium':
                return(
                    <div className="userData medium">
                        <div className="avatar" style={{backgroundImage: `url(/${this.state.data.avatar})`}}></div>
                        <div className="userName shadowed">{this.state.data.displayName}</div>
                        <div className="userAdded">{this.state.data.joined}</div>
                    </div>
                );
            case 'large':
                return(
                    <div className="userData large">
                        <div className="avatar" style={{backgroundImage: `url(/${this.state.data.avatar})`}}></div>
                        <div className="userName shadowed">{this.state.data.displayName}</div>
                        <div className="userAdded">{this.state.data.joined}</div>
                    </div>
                );
            default:
                return (
                    <div className="userData small">
                        <div className="avatar" style={{backgroundImage: `url(/${this.state.data.avatar})`}}></div>
                        <div className="userName shadowed">{this.state.data.displayName}</div>
                    </div>
                )
        }
    }
}

export default UserDisplay;

/*

            */