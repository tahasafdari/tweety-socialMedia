import React, { useState, useEffect } from "react";
import { NavLink, Link, useParams, useNavigate } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import logo from "../assests/t.png";
import { googleLogout } from "@react-oauth/google";
import { client } from "../client";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utility/data";

import { categories } from "../utility/data";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-grapy-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };
  const navigate = useNavigate();
  const { userId } = useParams();

  const [users, setUsers] = useState("");

  const googleLogout = () => {
    localStorage.clear();

    navigate("/login");
  };

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      setUsers(data[0]);
    });
  }, [userId]);

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover categories{" "}
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                alt="category-img"
                className="w-8 h-8 rounded-full shadow-sm"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-5  justify-center items-center">
        <div className="col-span-4">
          {user && (
            <Link
              to={`user-profile/${user._id}`}
              className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
              onClick={handleCloseSidebar}
            >
              <img
                src={user.image}
                className="w-10 h-10 rounded-full"
                alt="profilePic"
              />
              <p>{user.userName}</p>
            </Link>
          )}
        </div>
        <div className="mt-1.5">
          <button
            type="button"
            className="border-2 p-2 rounded-full cursor-pointer outline-none shadow-xl shadow-inner bg-white"
            onClick={() => {
              googleLogout();
            }}
          >
            <AiOutlineLogout color="black" fontSize={21} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
