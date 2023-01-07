import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';
import { userApi } from '../../axiosClient/api/user';
import { setUser } from '../context/Actions';

import 'react-toastify/dist/ReactToastify.css';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AiFillSetting } from 'react-icons/ai';

export default function Setting() {
  const [state, dispatch] = useContext(Context);
  const PF = process.env.REACT_APP_SERVER_URL;

  const [file, setFile] = useState(null);
  const [displayName, setDisplayName] = useState(
    state.user ? state.user.displayName : ''
  );

  useEffect(() => {
    if (state.user) {
      setDisplayName(state.user.displayName);
    }
  }, [state.user]);
  useEffect(() => {
    console.log(file);
  }, [file]);

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
    <div>
      <div className="mt-5">
        <div className="flex justify-center items-center mb-10 w-[45%] mx-auto border-b-2 py-4">
          <div className="mr-20">
            <img
              className="rounded-full w-28 h-28 object-cover "
              src={
                file
                  ? URL.createObjectURL(file)
                  : state.user && state.user.profilePic
                  ? `${PF}/images/${state.user.profilePic}`
                  : 'https://picsum.photos/40'
              }
              alt=""
            />
          </div>

          <div>
            <div className="flex items-center">
              <div>
                <p>{state.user ? state.user.username : ''}</p>
              </div>
              <div>
                <button
                  type="button"
                  className="border-2 border-gray p-1 rounded-lg ml-10"
                >
                  <Link to="/edit/" className="ml-1 flex items-center">
                    <AiFillSetting
                      size="1.2rem"
                      color="black"
                      className="hover:text-gray-400"
                    />
                    <p className="pl-2 text-black hover:text-gray-400">
                      Chỉnh sửa trang cá nhân
                    </p>
                  </Link>
                </button>
              </div>
            </div>
            <div className="mt-3">
              <p>0 bài viết</p>
              <p className="mt-3">
              Tên người dùng:
                <b className="ml-1">{state.user ? state.user.displayName : ''}</b>
              </p>
            </div>
            </div>
            
            </div>
            
      </div>
    </div>
  );
}

