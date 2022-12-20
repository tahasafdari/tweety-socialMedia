import React from "react";

import { ColorRing } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="flex flex-column justify-center items-center w-full h-full">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        className="m-5"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
};

export default Spinner;
