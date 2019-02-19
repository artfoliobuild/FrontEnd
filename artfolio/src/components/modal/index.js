import React from "react";
import axios from "axios";
import { FaRegHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";
import { FiShare, FiX } from "react-icons/fi";

import Comments from "../comments";

const image = require("../../images/profile/42696764_388532598354278_2259473674702684160_n.jpg");
const BACKEND = process.env.REACT_APP_BACKEND.replace(/"/g, "");

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.dataset.name]: e.target.value
    });
  };
  handleMessage = e => {
    e.preventDefault();
    axios.post(BACKEND + "/comments", {
      content: this.state.comment,
      user_id: this.props.verifyUser(this.props.user).id,
      avatar: this.props.verifyUser(this.props.user).avatar || image,
      post_id: this.props.imageId
    });
    this.setState({ comment: "" });
  };
  render() {
    return (
      <div className="scroll">
        <div className="fullscreen" onClick={this.props.close}>
          <div onClick={this.props.close}>
            <FiX className="close" size="32px" color="white" />
          </div>
        </div>
        <div className="modal">
          <div className="modal_image_container">
            <img
              className="modal_image"
              src={this.props.src.image || this.props.src}
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
              {this.props.src.description || (
                <>
                  <b>yes_way_jose.jpg </b>
                  Gtfo
                  <br />
                  📷-me
                  <br />
                  Car owner: @carlosdaman96
                  <br />
                  <b>shrimpcx</b> Okay :(
                  <br />
                  <b>yes_way_jose.jpg</b> @shrimpcx not you bb👀
                  <br />
                  <b>yes_way_jose.jpg</b>
                  #photography #photo #photos #photographer #igphoto #welit
                  #toomuchsauce #dontgetlostinthesauce #photooftheday
                  #igsanmarcos #events #electronicmedia #changes #limitless
                  #igdaily #photogram #mustang_freakzz #mustang #ecoboostmustang
                  #ecobeast #ecoboost
                  <br />
                  <b>6zj6</b>
                  🌸🌸🌸🌸🌸🌸🌸 ┏━━╮┏┓┏┓╭━┓┏━┓ ┃┏╮┃┃┃┃┃┃╭┛┃┗┓ ┃┃┃╰┛┃┃┃┃╰┓┃┗┓
                  ┗┛╰━━┛┗┛╰━┛┗━┛ Big Like 🌸🌸🌸🌸🌸🌸🌸
                </>
              )}
              <Comments />
            </div>
            <div className="modal_icons">
              <FaRegHeart size="24px" />
              <FaRegComment size="24px" />
              <FiShare size="24px" />
              <FaRegBookmark size="24px" />
            </div>
            <div className="modal_likes">42 likes</div>
            <div className="modal_date">FEBRUARY 2</div>
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
      </div>
    );
  }
}
