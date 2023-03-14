import React from "react";
import Slider from "infinite-react-carousel";

import "./Slide.scss";
const Slide = ({ slidesToShow, arrowsScroll, children }) => {
  return (
    <div className="slider">
      <div className="container">
        <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;
