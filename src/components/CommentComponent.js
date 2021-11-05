import {Avatar, Paper} from "@mui/material";
import React from "react";
import moment from "moment";

function CommentFunction(props) {
    return (
        <Paper key={props.id} className="pt-3 mb-4" elevation={1}>
            <div className="container">
                <div className="row">
                    <div className="col-1">
                        <Avatar alt="profile image" sx={{height: 60, width: 60}} src="https://img.icons8.com/plasticine/2x/fa314a/user.png"/>
                    </div>
                    <div className="col-11">
                        <div className="row">
                            <p>{props.comment}</p>
                            <p className="col col-6">{moment(props.created).format('DD/MM/YYYY hh:mm')}</p>
                            <p className="col col-6 text-end ">{props.user}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Paper>
    );
}

export default CommentFunction;