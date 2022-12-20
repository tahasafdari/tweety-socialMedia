import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { urlFor, client } from "../client";
import { fectUser } from "../utility/fetchUser";

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savePost, setSavePost] = useState(false);

  const Navigate = useNavigate();
  const user = fectUser();

  console.log(user);

  const alreadySaved = !!save?.filter((item) => item.postedBy._id === user.sub)
    ?.length;

  const savePin = (id) => {
    if (!alreadySaved) {
      setSavePost(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4,
            userId: user.sub,
            postedBy: {
              _type: "postedBy",
              _ref: user.sub,
            },
          },
        ])
        .commit()
        .the(() => {
          window.location.reload();
          setSavePost(false);
        });
    }
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => Navigate(`/pin-detail/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden trasition-all duration-500 ease-in-out"
      >
        <img
          className="rounded-lg w-full "
          alt="user-post"
          src={urlFor(image).width(250).url()}
        />{" "}
        {/** fetching image sanity way! */}
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between ">
              <div className="flexx gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(event) => event.stopPropagation()}
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:shadow-md outline-none"
                >
                  {" "}
                  <MdDownloadForOffline />{" "}
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  className="bg-red-500 opacity-75 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:show-md outlined-none"
                >
                  {save?.length}
                  Save
                </button>
              ) : (
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    savePin(_id);
                  }}
                  type="button"
                  className="bg-red-500 opacity-75 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:show-md outlined-none"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pin;
