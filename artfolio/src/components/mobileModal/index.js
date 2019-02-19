import React from "react";
import { FaRegHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";
import { FiShare } from "react-icons/fi";

import Comments from "../comments";
import Error404 from "../Error404";

const image = require("../../images/profile/42696764_388532598354278_2259473674702684160_n.jpg");
export default class MobileModal extends React.Component {
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
  render() {
    if (this.props.src) {
      return (
        <div className="mobile_modal">
          <div className="mobile_modal_artist">
            <img className="mobile_modal_artist_pic" src={image} alt="artist" />
            {this.props.artist}
          </div>
          <div className="mobile_modal_image_container">
            <img
              className="mobile_modal_image"
              src={this.props.src}
              alt="car"
            />
          </div>
          <div className="mobile_modal_post">
            <div className="mobile_modal_icons">
              <FaRegHeart size="24px" />
              <FaRegComment size="24px" />
              <FiShare size="24px" />
              <FaRegBookmark size="24px" />
            </div>
            <div className="mobile_modal_likes">42 likes</div>
            <div className="mobile_modal_date">FEBRUARY 2</div>
            <div className="mobile_modal_comments">
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
                  <Comments />
                </>
              )}
            </div>
          </div>
          <input
            type="text"
            value={this.state.comment}
            data-name="comment"
            onChange={this.handleChange}
            placeholder="Add a comment..."
          />
        </div>
      );
    } else return <Error404 />;
  }
}
