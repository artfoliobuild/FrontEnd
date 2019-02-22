import React from "react";

import Comment from "../comment";

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      unrenderComments: []
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ comments: nextProps.comments });
  }
  handleChildUnmount = id => {
    let newUnrenderComments = [...this.state.unrenderComments, id];
    let newComments = this.state.comments.filter(comment => comment.id !== id);
    this.setState({
      comments: newComments,
      renderComment: newUnrenderComments
    });
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
