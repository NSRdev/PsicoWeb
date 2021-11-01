import React, {Component, Fragment} from "react";
import {Button, TextField} from "@mui/material";
import CommentComponent from "./CommentComponent";

class CommentsListComponent extends Component {

    constructor() {
        super();
        this.state = {
            content: "",
            comments: []
        }

        this.getComments = this.getComments.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createComment = this.createComment.bind(this);
    }

    handleComment() {
        this.setState({
            content: "",
        });
        this.getComments();
    }

    componentDidMount() {
        this.handleComment();
    }

    getComments() {
        const id = 1;
        fetch('http://localhost:5000/publications/' + id + '/comments')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    comments: data
                });
            })
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    createComment() {
        const id = 1;
        fetch('http://localhost:5000/publications/' + id + '/comments/create', {
            method: 'POST',
            body: JSON.stringify({
                "user": 1,
                "publication": 1,
                "content": this.state.content
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                this.handleComment();
            })
            .catch(err => console.error(err));
        this.getComments();
    }


    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-10">
                        <TextField
                            required
                            fullWidth
                            id="content"
                            name="content"
                            label="¿Qué te ha parecido?"
                            multiline
                            maxRows="8"
                            variant="standard"
                            onChange={this.handleChange}
                            value={this.state.content}
                        />
                    </div>
                    <div className="col-2 text-end">
                        <div className="text-center">
                            <Button variant="contained" className="mr-auto" onClick={this.createComment}>Publicar</Button>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    {
                        this.state.comments.map((comment) => {
                            return (
                                <CommentComponent key={comment.id} id={comment.id} content={comment.content} user={comment.user} created={comment.created}/>
                            );
                        })
                    }
                </div>
            </Fragment>
        );
    }
}

export default CommentsListComponent;