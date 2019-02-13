import React from 'react';

import LazyLoad from 'react-lazyload';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import Gallery from 'react-grid-gallery';

export default function PhotoGrid(props) {
    const images = [];
    // const gallery = [];
    // let width;
    // let height;
    let type;
    for (let image in props.images) {
        if (props.images[image].search('1080x608') !== -1) {
            // width = 1080;
            // height = 608;
            type = "1080x608"
        } else if (props.images[image].search('608x1080') !== -1) {
            // width = 608;
            // height = 1080;
            type = "608x1080"
        } else if (props.images[image].search('1080x1350') !== -1) {
            // width = 1080;
            // height = 1350;
            type = "1080x1350"
        } else if (props.images[image].search('1080x720') !== -1) {
            // width = 1080;
            // height = 720;
            type = "1080x720"
        } else if (props.images[image].search('1080x1080') !== -1) {
            // width = 1080;
            // height = 1080;
            type = "1080x1080"
        } else {
            // width = 1080;
            // height = 608;
            type = "1080x608"
        }
        // gallery.push({ src: props.images[image], thumbnail: props.images[image], thumbnailWidth: width, thumbnailHeight: height, })
        images.push([image, props.images[image], type]);
    }
    return (
        <div className="photo-grid">{images.map((image, i) => {
            return <LazyLoad key={`${image[0]}-${i}`} height={60} offset={100} once ><img onClick={_ => props.handleClick(image[1])} className={`photo-grid_image type-${image[2]}`} src={image[1]} alt="car" /></LazyLoad>
        })}</div>
        // <Gallery rowHeight={300} enableImageSelection={false} images={gallery} />
    )
}