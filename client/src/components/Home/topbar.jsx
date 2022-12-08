import React, { useContext, useEffect } from 'react';
import { AiFillHome, AiFillSetting, AiOutlineSearch } from 'react-icons/ai';
import { BiMessageSquareAdd, BiUserCircle } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import categoriesApi from '../../axiosClient/api/categories.js';
import { userApi } from '../../axiosClient/api/user.js';
import { setUser } from '../context/Actions.js';
import { Context } from '../context/Context.js';
// import { useState } from 'react';

export default function Topbar() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);
  // const [hideDrop, setHideDrop] = useState(false);

  const PF = process.env.REACT_APP_SERVER_URL;
  // console.log(state.user);

  function handleClick() {
    localStorage.clear();
    window.location.href = '/';
  }

  useEffect(() => {
    const token = window.localStorage.getItem('accessToken');
    if (token !== null) {
      (async () => {
        const user = await userApi.getMe();
        dispatch(setUser(user));
      })();
    }
  }, []);

  return (
    <div
      className="w-auto h-12 sticky text-black font-bold top-0 flex items-center 
      font-sans bg-white px-2 z-[99999]"
      style={{
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      }}
    >
      <div className="flex-auto">
        <div className="flex justify-center">
          {state.user && (
            <div className="m-5 relative">
              <label
                htmlFor="searchUser"
                className="absolute right-4 bottom-2 cursor-pointer"
              >
                <BsSearch />
              </label>
              <input
                id="searchUser"
                type="text"
                className="bg-[#EFEFEF] rounded-md p-1 outline-none"
              />
            </div>
          )}
          <div className="m-5">
            <Link to="/">
              <AiFillHome size="1.5rem" />
            </Link>
          </div>
          {state.user && <div className="m-5"></div>}
          {state.user && (
            <div className="m-5">
              <Link to="/write" className="">
                <BiMessageSquareAdd size="1.5rem" />
              </Link>
            </div>
          )}
          {/* {state.user && (
            <div className="m-5">
              <Link
                to="/tags"
                className="no-underline p-2 rounded-xl hover:bg-[#6e9926]"
              >
                QUẢN LÝ TAG
              </Link>
            </div>
          )} */}
        </div>
      </div>

      {state.user ? (
        <div className="flex items-center">
          <div className="flex items-center justify-center flex-initial group">
            <img
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
              src={
                state.user.profilePic
                  ? `${PF}/images/${state.user.profilePic}`
                  : 'https://picsum.photos/40'
              }
              alt=""
            />
            <p className="mr-3 ml-2 w-20 truncate">{state.user.displayName}</p>
            {/* </Link> */}
            <div className=" absolute invisible group-hover:visible">
              <div className="bg-[#F0F2F5] mt-32 p-2 relative mr-3 rounded-lg ">
                <Link
                  to={`/${state.user.username}/posts`}
                  className="ml-1 flex items-center"
                >
                  <BiUserCircle
                    size="1.2rem"
                    color="black"
                    className="hover:text-gray-400"
                  />
                  <p className="pl-2 text-black hover:text-gray-400">Cá nhân</p>
                </Link>
                <Link to="/setting" className="ml-1 flex items-center">
                  <AiFillSetting
                    size="1.2rem"
                    color="black"
                    className="hover:text-gray-400"
                  />
                  <p className="pl-2 text-black hover:text-gray-400">
                    Chỉnh sửa
                  </p>
                </Link>
                <Link
                  to="/logout"
                  className="ml-1 flex items-center "
                  onClick={handleClick}
                >
                  <FiLogOut
                    size="1.2rem"
                    color="black"
                    className="hover:text-gray-400"
                  />
                  <p className="pl-2 text-black hover:text-gray-400">
                    Đăng xuất
                  </p>
                </Link>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Link
          to="/login"
          className="no-underline text-inherit hover:text-lime-500"
        >
          Đăng nhập
        </Link>
      )}
    </div>
  );
}
