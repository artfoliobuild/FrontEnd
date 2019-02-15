import React from "react";

import LazyLoad from "react-lazyload";

export default function PhotoGrid(props) {
  const images = [];
  let type;
  for (let image in props.images) {
    if (props.images[image].search("1080x608") !== -1) {
      type = "1080x608";
    } else if (props.images[image].search("608x1080") !== -1) {
      type = "608x1080";
    } else if (props.images[image].search("1080x1350") !== -1) {
      type = "1080x1350";
    } else if (props.images[image].search("1080x720") !== -1) {
      type = "1080x720";
    } else if (props.images[image].search("1080x1080") !== -1) {
      type = "1080x1080";
    } else {
      type = "1080x608";
    }
    images.push([image, props.images[image], type]);
  }
  const click = src => {
    props.checkScreenSize();
    if (props.device === "mobile") props.history.push("/mobile");
    props.handleClick(src);
  };
  return (
    <div className="photo-grid">
      {images.map((image, i) => {
        return (
          <LazyLoad key={`${image[0]}-${i}`} height={60} offset={100} once>
            <img
              onClick={_ => click(image[1])}
              className={`photo-grid_image type-${image[2]}`}
              src={image[1]}
              alt="car"
            />
          </LazyLoad>
        );
      })}
    </div>
  );
}
