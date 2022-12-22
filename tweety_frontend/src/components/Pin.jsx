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

  const alreadySaved = !!save?.filter((item) => item.postedBy.sub === user.sub)
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

  const deletePin = (sub) => {
    client.delete(sub).then(() => {
      window.location.reload();
    });
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
                  {save?.length} {savePost ? "Saving" : "Save"}
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
            <div className="flex justify-between items-center gap-2 w-full">
              {destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white flex items-center gap-2 text-black font-regular text-base p-2 pl-2 pr-2 rounded-full opacity-70 hover:100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination.length > 15
                    ? `${destination.slice(0, 15)}...`
                    : destination}
                </a>
              )}
              {postedBy?._id === user.sub && (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    deletePin(_id);
                  }}
                  className="bg-white p-2 opacity-75 hover:opacity-100 text-dark font-bold px-5 py-1 text-base rounded-3xl hover:show-md outlined-none"
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`user-profile/${user?.sub}`}
        className="flex gap-2 mt-2 items-center"
      >
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={postedBy?.image}
          alt="user-profile"
        />
        <p className="font-semibold capitalize">{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;
