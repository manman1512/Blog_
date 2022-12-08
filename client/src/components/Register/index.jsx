import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../auth.css';
import axiosClient from '../../axiosClient';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Input(props) {
  const { name, id, placeholder } = props;

  return (
    <input
      name={name}
      id={id}
      placeholder={placeholder}
      className="wrap-input relative w-full h-12 outline-none py-0 px-6 text-lg"
      type={
        name === 'password' || name === 'passwordConfirm' ? 'password' : 'text'
      }
    />
  );
}

export default function Register() {
  const navigate = useNavigate();
  const [successPass, setSuccessPass] = useState(false);
  // const [lengthPass, setLengthPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const passwordConfirm = e.target.passwordConfirm.value;
    const displayName = e.target.displayName.value;
    // console.log(password.length);

    try {
       if (password !== passwordConfirm) {
        setSuccessPass(true);
      } else {
        const response = await axiosClient.post('/auth/register', {
          username,
          password,
          passwordConfirm,
          displayName,
        });

        toast.success('Đăng ký thành công!', {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          onClose: () => {
            navigate('/login', { replace: true });
          },
        });

        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="container-register p-5 w-full min-h-screen flex flex-wrap 
    justify-center items-center"
    >
      {/* <FormProvider {...methods}> */}
      <div className="border-2 bg-white rounded-xl pr-14 pl-14 pb-14 pt-10">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center pb-8 font-semibold text-3xl">ĐĂNG KÝ</h1>
          <div className="">
            <Input
              placeholder="Tên hiển thị"
              id="displayName"
              name="displayName"
            />
            <Input
              placeholder="Tên đăng nhập"
              id="username"
              name="username"
            />
            <Input
              placeholder="Mật khẩu"
              id="password"
              name="password"
              className="inp"
            />
            <Input
              placeholder="Nhập lại mật khẩu"
              id="passwordConfirm"
              name="passwordConfirm"
              className="inp"
            />
            {/* {lengthPass && (
              <span className="text-red-500 mt-3 flex ml-1">
                <div>
                  <b>Mật khẩu phải lớn hơn 8 ký tự!</b>
                </div>
              </span>
            )} */}
            {successPass && (
              <span className="text-red-500 mt-3 flex ml-1">
                <div>
                  <b>Mật khẩu nhập lại không đúng!</b>
                </div>
              </span>
            )}
            <button
              className="border-2  relative w-full h-12 outline-none py-0 px-6 mt-5 
                bg-slate-800 text-white hover:bg-slate-600"
              type="submit"
            >
              Đăng ký
            </button>
            <ToastContainer />

            <div className="pt-11 font-mono">
              <span>Bạn đã có tài khoản?</span>
              <Link to="/login" className="text-blue-500 ml-1">
                Đăng nhập
              </Link>
            </div>
          </div>
        </form>
      </div>
      {/* </FormProvider> */}
    </div>
  );
}
