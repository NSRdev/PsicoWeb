import React, {Component} from 'react';
import moment from "moment";
import {Paper} from "@mui/material";
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

class PublicationComponent extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            subtitle: "",
            heading: "",
            content: "",
            author: "",
            created: null,
            updated: null,
            deleted: null,
            premium: null,
            like: false
        }
    }

    componentDidMount() {
        const id = "1";
        fetch('http://localhost:5000/publications/' + id)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    title: data.title,
                    subtitle: data.subtitle,
                    heading: data.heading,
                    content: data.body,
                    author: data.author,
                    created: data.created,
                    updated: data.updated,
                    deleted: data.deleted,
                    premium: data.premium
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container mt-5">
                <Paper elevation={3} className="p-5">
                    <div className="row">
                        <p className="col col-6">{moment(this.state.created).format('DD/MM/YYYY hh:mm')}</p>
                        <p className="text-end col col-6 fst-italic"><TurnedInIcon fontSize="large" style={{ color: "goldenrod" }}/>Artículo premium</p>
                    </div>
                    <h1 className="">{this.state.title}</h1>
                    <h2>{this.state.subtitle}</h2>
                    <p className="mt-2">{this.state.heading}</p>
                    <p className="mt-3">{this.state.content}</p>
                    <p className="text-end">{this.state.author}</p>
                    {
                        this.state.like ? <FavoriteIcon style={{ color: "red" }} onClick={() => {this.setState({like: false})}}/>
                            : <FavoriteBorderIcon style={{ color: "gray" }} onClick={() => {this.setState({like: true})}}/>
                    }
                </Paper>

            </div>
        );
    }
}

export default PublicationComponent;