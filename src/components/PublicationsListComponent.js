import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {TextField} from "@mui/material";
import moment from "moment";

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
            <div className="container mt-5">
                <div className="row">
                    <div className="col-9">
                        {
                            this.state.publications.map((publication) => {
                                return (
                                    <div key={publication.id} className="mb-4">
                                        <h3><Link to={`/publications/${publication.id}`}>{publication.title}{publication.id}</Link></h3>
                                        <p>{moment(this.state.created).format('DD/MM/YYYY hh:mm')} | {publication.author}</p>
                                        <h6>{publication.subtitle}</h6>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="col-3">
                        <div className="row">
                            <TextField
                                margin="dense"
                                id="search"
                                label="Buscar"
                                type="email"
                                fullWidth
                                variant="standard"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PublicationsListComponent;