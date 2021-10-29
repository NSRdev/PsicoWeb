import React, {Component} from 'react';

class UsersListComponent extends Component {

    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    users: data
                })
            })
            .catch(err => console.error(err));

    }

    render() {
        return (
            <div className="container">
                <div className="col-4 mt-5">
                    Users List
                </div>
                <div className="col-8">
                    {
                        this.state.users.map((user) => {
                            return (
                                <div key={user._id}>
                                    <h2>{user.name}</h2>
                                    <h4>{user.lastname}</h4>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default UsersListComponent;