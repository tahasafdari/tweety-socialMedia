import React from "react";
import Masonry from "react-masonry-css";
import Pin from "./Pin";

const breakpointObject = {
  default: 4,
  3000: 6,
  2000: 5,
  12000: 3,
  1000: 2,
  500: 1,
};
const MasonryLayout = ({ Pins }) => {
  return (
    <div>
      <Masonry
        className="flex animate-slide-fwd"
        breakpointCols={breakpointObject}
      >
        {Pins?.map((pin) => (
          <Pin key={pin._id} pin={pin} className="w-max" />
        ))}
      </Masonry>
    </div>
  );
};

export default MasonryLayout;
