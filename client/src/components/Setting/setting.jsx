import React, { useContext, useEffect, useState } from 'react';
import Topbar from '../Home/topbar';
import { BsFillCameraFill } from 'react-icons/bs';
import { BsFillPencilFill } from 'react-icons/bs';
import { Context } from '../context/Context';
import axiosClient from '../../axiosClient';
import { userApi } from '../../axiosClient/api/user';
import { setUser } from '../context/Actions';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Personal from '../Personal';
import { AiFillSetting } from 'react-icons/ai';

export default function Setting() {
  const [state, dispatch] = useContext(Context);
  const PF = process.env.REACT_APP_SERVER_URL;

  const [file, setFile] = useState(null);
  const [displayName, setDisplayName] = useState(
    state.user ? state.user.displayName : ''
  );
  const [password, setPassword] = useState('');
  // const location = useLocation();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  // console.log(location)

  // const [, setSuccess] = useState(false);
  useEffect(() => {
    if (state.user) {
      setDisplayName(state.user.displayName);
    }
  }, [state.user]);
  useEffect(() => {
    console.log(file);
  }, [file]);

  // console.log(state);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_START' });
    const updateUser = {
      userId: state.user._id,
      displayName,
      password,
    };
    // console.log(password)
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append('name', fileName);
      data.append('file', file);
      updateUser.profilePic = fileName;
      try {
        const response = await userApi.updateAvatar(data);
        if (response.status === 200) {
          toast.success('Cập nhật thành công!', {
            position: 'top-right',
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        } else {
          throw new Error('Update fail');
        }
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axiosClient.put(
        '/users/update/' + state.user._id,
        updateUser
      );
      console.log(res);
      // setSuccess(true);
      dispatch({ type: 'UPDATE_SUCCESS', payload: res.data.updateUser });
      toast.success('Cập nhật thành công!', {
        position: 'top-right',
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'UPDATE_FAILURE' });
    }
  };

  // XOA TAI KHOAN
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.delete(
        '/users/deleteById/' + state.user._id
      );
      // console.log(state.user._id);
      if (response.status === 200) {
        toast.success('Xóa Tài khoản thành công!', {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          onClose: () => {
            navigate('/');
          },
        });
      } else {
        alert('Delete fail, check console');
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOut = () => {
    // const res = await postsApi.getPost(url)
    navigate('/setting');
    setModal(false);
    // console.log(res);
  };

  const handleModal = () => {
    setModal(true);
  };
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

