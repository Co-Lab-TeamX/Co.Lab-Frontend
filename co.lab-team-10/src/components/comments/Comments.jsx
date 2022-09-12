import { DateTime } from "luxon";
import React from "react";
import "./comments.css";

function Comments({ comment }) {
  return (
    <>
      <div className="single-comment">
        <div className="img-section">
          <img className="comment-profile-pic" src={comment.profile_pic} />
        </div>
        <div className="comment-info">
          <div className="comment-username">{comment.username}</div>
          <div className="comment-body">{comment.comment_body}</div>
          <div className="comment-time-posted">
            {DateTime.fromISO(comment.time_posted).toRelative()}
          </div>
        </div>
      </div>
    </>
  );
}

export default Comments;
