import React from 'react';

export default function PhotoGrid(props) {
    const images = [];
    for (let image in props.images) {
        images.push([image, props.images[image]]);
    }
    return (
        <div className="photo-grid">{images.map((image, i) => {
            return <img onClick={_ => props.handleClick(image[1])} className={`photo-grid_image`} key={`${image[0]}-${i}`} src={image[1]} alt="car" />
        })}</div>
    )
}