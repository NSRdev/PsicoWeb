import React, {Fragment} from "react";

class CommentComponent extends Component {

    constructor() {
        super();
        this.state = {
            id: "",
            content: "",
            user: "",
            deleted: false
        }
    }


    render() {
        return (
            <Fragment>
                <div className="row mt-5">
                    <h4>¡Deja tu comentario!</h4>

                </div>
                <div className="row mt-5">
                    {
                        this.state.comment.map((comment) => {
                            return (
                                <div key={comment.id} className="mb-4">
                                    <p>{comment.content}</p>
                                    <h6>{comment.user}</h6>
                                </div>
                            );
                        })
                    }
                </div>
            </Fragment>
        );
    }
}

export default CommentComponent;