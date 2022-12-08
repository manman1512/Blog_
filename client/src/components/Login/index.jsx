import React, { useContext, useState } from 'react';
import '../auth.css';
import { Input } from '../Register';
// import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';
// import { setUser } from '../context/Actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const navigate = useNavigate();
  // const [state, dispatch] = useContext(Context);

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await axiosClient.post('/auth/login', {
        username,
        password,
      });
      console.log(response);
      const token = response.data.accessToken;
      localStorage.setItem('accessToken', token);
      toast.success('Đăng nhập thành công!', {
        position: 'top-right',
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        duration: 1000,
        onClose: () => {
          navigate('/', { replace: true });
        },
      });
    } catch (error) {
      setSuccess(true);
      console.log(error);
    }
  };

  return (
    <div
      className="container-register p-5 w-full min-h-screen flex flex-wrap 
    justify-center items-center"
    >
      <div className="border-2 bg-white rounded-xl pr-14 pl-14 pb-14 pt-10">
        <form onSubmit={handleSubmit} action="">
          <h1 className="text-center pb-10 font-semibold text-3xl">
            ĐĂNG NHẬP
          </h1>
          <div className="">
            <Input
              placeholder="Tên đăng nhập..."
              id="username"
              name="username"
            />
            <Input
              placeholder="Mật khẩu..."
              id="password"
              name="password"
              className="inp"
            />

            <button
              className="border-2 relative w-full h-12 outline-none py-0 px-6 mt-5 
                bg-slate-800 text-white hover:bg-slate-600"
              type="submit"
            >
              Đăng nhập
            </button>
            <ToastContainer />

            {success && (
              <span className="text-red-500 mt-3 flex ml-1">
                <div>
                  <b>Username hoặc pasword không đúng!</b>
                </div>
              </span>
            )}
            <div className="pt-11 font-mono">
              <span>Bạn chưa có tài khoản?</span>
              <Link to="/register" className="text-blue-500 ml-1">
                Đăng ký
              </Link>
            </div>
          </div>
        </form>
      </div>
      {/* </FormProvider> */}
    </div>
  );
}
