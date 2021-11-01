import {Paper} from "@mui/material";
import React from "react";
import moment from "moment";

function CommentFunction(props) {
    return (
        <Paper key={props.id} className="p-3 mb-4" elevation={1}>
            <p>{props.content}</p>

            <div className="row">
                <p className="col col-6">{moment(props.created).format('DD/MM/YYYY hh:mm')}</p>
                <p className="col col-6 text-end ">{props.user}</p>
            </div>
        </Paper>
    );
}

export default CommentFunction;