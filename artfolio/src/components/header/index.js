import React from 'react';
import { Redirect } from 'react-router-dom';

const image = require('../../images/profile/42696764_388532598354278_2259473674702684160_n.jpg');

export default function Header(props) {
    return (
        <>
            {props.match.isExact ? <Redirect to="/home" /> : null}
            <div className="header">
                <div className="header_profile"><img className="header_profile_img" src={image} alt="profile" /></div>
                <div className="header_title"><h2 className="header_title_h2">
                    Jose <span className="left-slash">/</span>
                    <span className="right-slash">/</span> Valenzuela
            </h2></div>
                <div className="header_bio">
                    <p>🐾TEXAS STATE UNIVERSITY 20' 🐾</p><p>
                        Portraits, Automotive, Advertisements, Design.🤘🏽
DM for inquiries 🔍</p></div>
            </div>
        </>
    )
}