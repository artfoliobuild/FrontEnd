import React from "react";
import { FaRegHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";
import { FiShare, FiX } from "react-icons/fi";

export default function Modal(props) {
  const image = require("../../images/profile/42696764_388532598354278_2259473674702684160_n.jpg");
  return (
    <div className="scroll">
      <div className="fullscreen" onClick={props.close}>
        <div onClick={props.close}>
          <FiX className="close" size="32px" color="white" />
        </div>
      </div>
      <div className="modal">
        <div className="modal_image_container">
          <img
            className="modal_image"
            src={props.src.image || props.src}
            alt="car"
          />
        </div>
        <div className="modal_artist_small">
          <img className="modal_artist_small_pic" src={image} alt="artist" />
          {props.artist}
        </div>
        <div className="modal_post">
          <div className="modal_artist">
            <img className="modal_artist_pic" src={image} alt="artist" />
            {props.artist}
          </div>
          <div className="modal_comments">
            {props.src.description || (
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
                #toomuchsauce #dontgetlostinthesauce #photooftheday #igsanmarcos
                #events #electronicmedia #changes #limitless #igdaily #photogram
                #mustang_freakzz #mustang #ecoboostmustang #ecobeast #ecoboost
                <br />
                <b>6zj6</b>
                🌸🌸🌸🌸🌸🌸🌸 ┏━━╮┏┓┏┓╭━┓┏━┓ ┃┏╮┃┃┃┃┃┃╭┛┃┗┓ ┃┃┃╰┛┃┃┃┃╰┓┃┗┓
                ┗┛╰━━┛┗┛╰━┛┗━┛ Big Like 🌸🌸🌸🌸🌸🌸🌸
              </>
            )}
          </div>
          <div className="modal_icons">
            <FaRegHeart size="24px" />
            <FaRegComment size="24px" />
            <FiShare size="24px" />
            <FaRegBookmark size="24px" />
          </div>
          <div className="modal_likes">42 likes</div>
          <div className="modal_date">FEBRUARY 2</div>
          <input type="text" placeholder="Add a comment..." />
        </div>
      </div>
    </div>
  );
}
