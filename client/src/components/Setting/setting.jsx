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
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

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
    setModal(false)
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
      <Topbar />
      <div className="mt-5">
        <div className=" mx-6 mb-10">
          <div className="flex mb-3 items-center">
            <BsFillPencilFill />
            <span className="text-3xl ml-2 ">Chỉnh sửa Tài Khoản</span>
          </div>
          <form className="flex flex-col text-lg" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center border-2 p-4 bg-[#F5F5F6]">
              <div className="flex items-center p-3 relative">
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
                <ToastContainer className="mt-9" />

                <label
                  htmlFor="profileInp"
                  className="bg-slate-400 border-4 rounded-full border-green-300 absolute 
                    right-4 bottom-4 cursor-pointer"
                >
                  <BsFillCameraFill size="1rem" color="F9F9F9" />
                </label>
                <input
                  type="file"
                  name="profile"
                  id="profileInp"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div>
                <label htmlFor="displayName" className="mt-3 mr-3 ">
                  Tên hiển thị
                </label>
                <input
                  onChange={(e) => setDisplayName(e.target.value)}
                  type="text"
                  id="displayName"
                  placeholder={state.user ? state.user.displayName : ''}
                  value={displayName}
                  className="outline-none border-1 border border-[#9CA3AF] rounded-md p-1 w-1/2"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="password" className="mt-3 mr-7 ">
                  Mật khẩu
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Nhập mật khẩu mới.."
                  className="outline-none border-1 border border-[#9CA3AF] rounded-md p-1 w-1/2"
                />
              </div>

              <button
                className=" cursor-pointer rounded-md p-1 mt-5 w-96 border bg-[#F5F5F6]
                border-black hover:bg-blue-300 active:bg-blue-200"
                p-2
                rounded-lg
                border
                border-black
                type="submit"
              >
                Cập nhật
              </button>
              <ToastContainer className="mt-9" />
            </div>
          </form>
          {/* <div>
            <span
              className="mt-3 text-red-500 text-xs cursor-pointer font-bold
               hover:text-red-400"
              onClick={handleModal}
            >
              Xoá tài khoản
            </span>
          </div> */}
          {/* {modal && (
            <div>
              <p>Bạn có chắc muốn xóa tài khoản?</p>
              <div className="">
                <button
                  className="bg-blue-400 p-1 px-4 rounded-md border border-gray-400 
                  hover:bg-blue-300 active:bg-blue-200 mr-8"
                  onClick={handleDelete}
                >
                  Có
                </button>
                <button
                  className="bg-blue-400 p-1 px-4 rounded-md border border-gray-400 
                  hover:bg-blue-300 active:bg-blue-200"
                  onClick={handleOut}
                >
                  Không
                </button>
              </div>
            </div>
          )} */}
        </div>
        <div></div>
      </div>
    </div>
  );
}
