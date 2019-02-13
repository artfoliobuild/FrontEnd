import React from 'react';
import { FaRegHeart, FaRegComment, FaRegBookmark } from 'react-icons/fa';
import { FiShare } from 'react-icons/fi';

export default function Modal(props) {
    const image = require('../../images/profile/42696764_388532598354278_2259473674702684160_n.jpg');
    return (
        <div className="modal">
            <div className="modal_image_container"><img className="modal_image" src={props.src} alt="car" /></div>
            <div className="modal_post">
                <div className="modal_artist">
                    <img className="modal_artist_pic" src={image} alt="artist" />
                    {props.artist}
                </div>
                <div className="modal_comments">
                    {/* <img className="modal_artist_pic" src={image} alt="artist" />
                    {props.artist} */}
                    <b>yes_way_jose.jpg</b>
                    Gtfo<br />
                    📷-me<br />
                    Car owner: @carlosdaman96<br />
                    <b>shrimpcx</b> Okay :(<br />

                    <b>yes_way_jose.jpg</b> @shrimpcx not you bb👀<br />

                    <b>yes_way_jose.jpg</b>
                    #photography #photo #photos #photographer #igphoto #welit #toomuchsauce #dontgetlostinthesauce #photooftheday #igsanmarcos #events #electronicmedia #changes #limitless #igdaily #photogram #mustang_freakzz #mustang #ecoboostmustang #ecobeast #ecoboost<br />

                    <b>6zj6</b>
                    🌸🌸🌸🌸🌸🌸🌸 ┏━━╮┏┓┏┓╭━┓┏━┓ ┃┏╮┃┃┃┃┃┃╭┛┃┗┓ ┃┃┃╰┛┃┃┃┃╰┓┃┗┓ ┗┛╰━━┛┗┛╰━┛┗━┛ Big Like 🌸🌸🌸🌸🌸🌸🌸
                </div>
                <div className="modal_icons">
                    <FaRegHeart size="1.5rem" />
                    <FaRegComment size="1.5rem" />
                    <FiShare size="1.5rem" />
                    <FaRegBookmark size="1.5rem" />
                </div>
                <div className="modal_likes">42 likes</div>
                <div className="modal_date">FEBRUARY 2</div>
                <input type="text" placeholder="Add a comment..." />
            </div>
        </div>
    )
}