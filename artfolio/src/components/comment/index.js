import React from "react";

const Comment = props => {
  return (
    <div className="comment">
      <img className="comment_avatar" src={props.comment.avatar} alt="" />
      <span className="comment_user">user-{props.comment.user_id}</span>
      <span className="comment_content">{props.comment.content}</span>
    </div>
  );
};

export default Comment;
