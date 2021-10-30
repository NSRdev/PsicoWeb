import React, {Component} from 'react';
import moment from "moment";
import {Paper, TextField} from "@mui/material";
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Link} from "react-router-dom";

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
            like: false,
            likes: 0
        }

        this.getPublication = this.getPublication.bind(this);
        this.getLikes = this.getLikes.bind(this);
        this.handleLike = this.handleLike.bind(this);
    }

    componentDidMount() {
        this.getPublication();
        this.getLikes();
    }

    getPublication() {
        const id = "1";
        fetch('http://localhost:5000/publications/' + id)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    title: data.title,
                    subtitle: data.subtitle,
                    heading: data.heading,
                    content: data.content,
                    author: data.author,
                    created: data.created,
                    updated: data.updated,
                    deleted: data.deleted,
                    premium: data.premium
                })
            })
            .catch(err => console.log(err));
    }

    getLikes() {
        const id = "1";
        fetch('http://localhost:5000/publications/' + id + '/likes')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    likes: data.count
                })
            })
            .catch(err => console.log(err));
    }

    handleLike() {
        const id = "1";
        fetch('http://localhost:5000/publications/' + id + '/likes/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: 1})
        })
            .then(() => {
                this.setState({
                    like: true
                })
            })
            .catch(err => console.log(err));
        this.getLikes();
    }

    render() {
        return (
            <div className="container my-5">
                <Paper elevation={3} className="p-5">
                    <div className="row">
                        <p className="col col-6">{moment(this.state.created).format('DD/MM/YYYY hh:mm')}</p>
                        <p className="text-end col col-6 fst-italic"><TurnedInIcon fontSize="large" style={{ color: "goldenrod" }}/>Artículo premium</p>
                    </div>
                    <h1>{this.state.title}</h1>
                    <h2>{this.state.subtitle}</h2>
                    <p className="mt-2">{this.state.heading}</p>
                    <p className="mt-3">{this.state.content}</p>
                    <p className="text-end">{this.state.author}</p>
                    {
                        this.state.like ? <FavoriteIcon sx={{ color: "red" }} onClick={() => {this.setState({like: false})}}/>
                            : <FavoriteBorderIcon sx={{ color: "gray" }} onClick={this.handleLike}/>
                    }
                    <p>{this.state.likes}</p>
                </Paper>

            </div>
        );
    }
}

export default PublicationComponent;