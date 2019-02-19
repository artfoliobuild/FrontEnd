import React from "react";

import Comment from "../comment";

const Comments = props => {
  return (
    <div>
      {props.comments.map(comment => {
        return <Comment comment={comment} />;
      })}
    </div>
  );
};

export default Comments;
