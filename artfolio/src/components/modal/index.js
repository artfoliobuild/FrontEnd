import React from "react";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import { FiShare, FiX, FiTrash2 } from "react-icons/fi";
import { ReactComponent as Edit } from "../../images/icons/edit.svg";

import Comments from "../comments";

const image = require("../../images/profile/42696764_388532598354278_2259473674702684160_n.jpg");
const BACKEND = process.env.REACT_APP_BACKEND.replace(/"/g, "");

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      comments: [],
      post: null,
      edit: "",
      editing: false,
      deleting: false
    };
  }
  componentDidMount() {
    axios.get(BACKEND + "/posts/" + this.props.post.id).then(res => {
      this.setState({ post: res.data, comments: res.data.comments });
    });
  }
  handleChange = e => {
    this.setState({
      [e.target.dataset.name]: e.target.value
    });
  };
  checkLoad = _ => {
    return this.props.user;
  };
  handleMessage = e => {
    e.preventDefault();
    if (this.checkLoad())
      axios
        .post(BACKEND + "/comments", {
          content: this.state.comment,
          user_id: this.props.verifyUser(this.props.user).id,
          username: this.props.verifyUser(this.props.user).username,
          avatar: this.props.verifyUser(this.props.user).avatar || image,
          post_id: this.state.post.id
        })
        .then(res => {
          axios.get(BACKEND + "/posts/" + this.props.post.id).then(res => {
            this.setState({ comments: res.data.comments, comment: "" });
          });
        });
    else this.props.history.push("/login");
  };
  handleEdit = e => {
    e.preventDefault();

    if (this.checkLoad())
      axios
        .put(BACKEND + "/posts/" + this.state.post.id, {
          description: this.state.edit,
          likes: this.state.post.likes,
          image: this.state.post.image
        })
        .then(oRes => {
          axios.get(BACKEND + "/posts/" + this.state.post.id).then(res => {
            this.setState({
              post: res.data,
              comments: res.data.comments,
              comment: "",
              edit: ""
            });
          });
        })
        .catch(err => console.log(err));
    else this.props.history.push("/login");
  };
  handleDelete = e => {
    e.preventDefault();
    this.checkLoad(
      axios.delete(BACKEND + "/posts/" + this.state.post.id).then(oRes => {
        this.props.closeRefresh();
      })
    );
  };
  editPost = _ => {
    this.setState(prevState => ({
      edit: this.state.post.description,
      editing: !prevState.editing,
      deleting: false
    }));
  };
  deletePost = _ => {
    this.setState(prevState => ({
      edit: this.state.post.description,
      editing: false,
      deleting: !prevState.deleting
    }));
  };
  close = e => {
    e.stopPropagation();
    this.setState({
      edit: "",
      editing: false,
      deleting: false
    });
  };
  render() {
    return (
      <div className="scroll">
        <div className="fullscreen" onClick={this.props.close}>
          <div onClick={this.props.close}>
            <FiX className="close" size="32px" color="white" />
          </div>
        </div>
        <div
          className="modal"
          style={this.state.editing ? { filter: "brightness(50%)" } : null}
          onClick={this.state.editing ? this.close : null}
        >
          <div className="modal_image_container">
            <img
              className="modal_image"
              src={this.state.post ? this.state.post.image : this.props.src}
              alt="car"
            />
          </div>
          <div className="modal_artist_small">
            <img className="modal_artist_small_pic" src={image} alt="artist" />
            {this.props.artist}
          </div>
          <div className="modal_post">
            <div className="modal_artist">
              <img className="modal_artist_pic" src={image} alt="artist" />
              {this.props.artist}
            </div>
            <div className="modal_comments">
              <b>{this.props.artist} </b>
              {this.state.post ? this.state.post.description : <></>}
              <Comments comments={this.state.comments} />
            </div>
            <div className="modal_icons">
              <FaRegHeart className="modal_icons_icon" size="24px" />
              <FiShare className="modal_icons_icon" size="24px" />
              {this.props.verifyUser(this.props.user) ? (
                this.props.verifyUser(this.props.user).admin ? (
                  <span className="modal_icons_right">
                    <Edit
                      className="modal_icons_icon"
                      size="24px"
                      onClick={this.editPost}
                    />
                    <FiTrash2
                      className="modal_icons_icon"
                      size="24px"
                      onClick={this.deletePost}
                    />
                  </span>
                ) : null
              ) : null}
            </div>
            <div className="modal_likes">
              {this.state.posts ? this.state.posts.likes : 0} likes
            </div>
            <div className="modal_date">
              {this.state.posts ? this.state.posts.created_at : null}
            </div>
            <form onSubmit={this.handleMessage}>
              <input
                type="text"
                value={this.state.comment}
                data-name="comment"
                placeholder="Add a comment..."
                onChange={this.handleChange}
              />
            </form>
          </div>
        </div>
        {this.state.editing ? (
          <form className="modal_edit" onSubmit={this.handleEdit}>
            <h2>Edit description</h2>
            <textarea
              className="modal_edit_textarea"
              data-name="edit"
              value={this.state.edit}
              onChange={this.handleChange}
            />
            <button className="modal_edit_button">Submit</button>
          </form>
        ) : null}
        {this.state.deleting ? (
          <form className="modal_delete" onSubmit={this.handleEdit}>
            <h2>Are you sure you want to delete this post?</h2>
            <button
              className="modal_delete_button_delete"
              onClick={this.handleDelete}
            >
              Delete
            </button>
            <div className="modal_delete_button_cancel" onClick={this.close}>
              Cancel
            </div>
          </form>
        ) : null}
      </div>
    );
  }
}
