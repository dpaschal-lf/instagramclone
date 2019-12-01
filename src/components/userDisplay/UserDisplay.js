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
        fetch(`${process.env.PUBLIC_URL}/api/`)
            .then( response => response.json() )
            .then( response => {
                this.setState({
                    data: response
                })
            });
    }
    render(){
        return (
            <div className="userData">
                <div className="avatar" style={{backgroundImage: `url(/${this.state.data.avatar})`}}></div>
                <div className="userName">{this.state.data.displayName}</div>
            </div>
        )
    }
}

export default UserDisplay;

/*

            */