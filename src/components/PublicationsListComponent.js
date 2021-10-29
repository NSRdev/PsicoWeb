import React, {Component} from 'react';

class PublicationsListComponent extends Component {

    constructor() {
        super();
        this.state = {
            publications: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/publications')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    publications: data
                })
            })
            .catch(err => console.error(err));

    }

    render() {
        return (
            <div className="container">
                <div className="col col-4 mt-5">
                    Publications List
                </div>
                <div className="col col-8 mt-5">
                    {
                        this.state.publications.map((publication) => {
                            return (
                                <div key={publication._id}>
                                    <h1>{publication.title}</h1>
                                    <h2>{publication.subtitle}</h2>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default PublicationsListComponent;