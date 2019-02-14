import React from "react";
import { FaRegHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";
import { FiShare } from "react-icons/fi";

import Error404 from "../Error404";

export default function MobileModal(props) {
  const image = require("../../images/profile/42696764_388532598354278_2259473674702684160_n.jpg");
  if (props.src) {
    return (
      <div className="mobile_modal">
        <div className="mobile_modal_artist">
          <img className="mobile_modal_artist_pic" src={image} alt="artist" />
          {props.artist}
        </div>
        <div className="mobile_modal_image_container">
          <img className="mobile_modal_image" src={props.src} alt="car" />
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
          </div>
        </div>
        <input type="text" placeholder="Add a comment..." />
      </div>
    );
  } else return <Error404 />;
}
