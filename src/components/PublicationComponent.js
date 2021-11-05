import React, {Component} from 'react';
import moment from "moment";
import {Divider, Paper} from "@mui/material";
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentsListComponent from "./CommentsListComponent";

class PublicationComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
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

        this.handleLike = this.handleLike.bind(this);
    }

    componentDidMount() {
        this.getPublication();
        this.getLikes();
        this.hasLiked();
    }

    getPublication() {
        fetch('http://localhost:5000/publications/' + this.state.id)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    id: data.id,
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
        fetch('http://localhost:5000/publications/' + this.state.id + '/likes')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    likes: data.count
                })
            })
            .catch(err => console.log(err));
    }

    hasLiked() {
        fetch('http://localhost:5000/publications/' + this.state.id + '/likes/' + 1)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    like: (data == null ? false : !data.deleted)
                })
            })
            .catch(err => console.log(err));
    }

    handleLike() {
        if (this.state.like) {
            fetch('http://localhost:5000/publications/' + this.state.id + '/likes/' + 1, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(() => {
                    this.setState({
                        like: false,
                        likes: parseFloat(this.state.likes) - 1
                    });
                })
                .catch(err => console.log(err));
        } else {
            fetch('http://localhost:5000/publications/' + this.state.id + '/likes/' + 1, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(() => {
                    this.setState({
                        like: true,
                        likes: parseFloat(this.state.likes) + 1
                    });
                })
                .catch(err => console.log(err));
        }
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
                    <div className="row">
                        <div className="col col-1">
                            {
                                this.state.like ? <FavoriteIcon sx={{ color: "red"}} onClick={this.handleLike}/>
                                    : <FavoriteBorderIcon sx={{ color: "gray" }} onClick={this.handleLike}/>
                            }
                        </div>
                        <div className="col col-11">
                            {
                                this.state.likes > 1 ? <p className="fst-italic small">A {this.state.likes} usuarios/as les ha gustado esta publicación</p>
                                    : <p className="fst-italic small">A {this.state.likes} usuario/a le ha gustado esta publicación</p>
                            }
                        </div>
                        </div>

                </Paper>

                <Divider textAlign="left" className="mt-5 mb-4">Comentarios</Divider>
                <CommentsListComponent publication={this.state.id}/>

            </div>
        );
    }
}

export default PublicationComponent;