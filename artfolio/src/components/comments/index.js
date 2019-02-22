import React from "react";

import Comment from "../comment";

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ comments: nextProps.comments });
  }
  handleChildUnmount = _ => {
    this.props.refreshPost();
  };
  render() {
    return (
      <div>
        {this.state.comments.map(comment => {
          return (
            <Comment
              key={"comment" + comment.id}
              comment={comment}
              user={this.props.user}
              verifyUser={this.props.verifyUser}
              unmountMe={this.handleChildUnmount}
            />
          );
        })}
      </div>
    );
  }
}
