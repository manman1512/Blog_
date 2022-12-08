import React from 'react';
import { IoMdAdd } from 'react-icons/io';
import { BsFacebook } from 'react-icons/bs';
import { FaInstagramSquare } from 'react-icons/fa';
import { FaTwitterSquare } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axiosClient from '../../axiosClient';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [cates, setCates] = useState([]);

  // useEffect(() => {
  //   const getCates = async () => {
  //     const res = await axiosClient.get('/categories/');
  //     setCates(res.data);
  //   };
  //   getCates();
  // }, []);

  return (
    <div className="pb-8 font-sans ml-auto mr-10">
      <div className="p-5 bg-green-100">
        <div className="flex flex-col items-center border-y border-solid border-gray-500">
          <span className="text-neutral-500  border-solid border-gray-500">
            THÔNG TIN CÁ NHÂN
          </span>
        </div>

        <div className="flex flex-col items-center">
          <img
            className="object-cover h-60 mt-5 mb-5"
            src="https://cdn.alongwalker.co/vn/wp-content/uploads/2022/03/25163323/image-cung-hoc-ngay-cach-tao-dang-chup-hinh-dep-voi-hoa-xin-xo-het-biet-164817560388683.jpg"
            alt=""
          />

          <p className="w-72 break-words">
            Xin chào, tui là Mẩn. Tui là sinh sinh viên CTU. Thích gì kệ kao xem
            làm chi??? Ủa alo ahiiiiiiiiiiiii
          </p>
        </div>

        <div className="flex flex-col items-center border-y border-solid border-gray-500 m-8">
          <div className="flex items-center ">
            <p className="text-neutral-500">LOẠI BÀI VIẾT</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <ul>
            {cates.map((cate, index) => (
              <Link key={index} to={ `/home/?cat=${cate.name}`}>
                <li >{cate.name}</li>
              </Link>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center border-y border-solid border-gray-500 m-8">
          <div className="flex items-center ">
            <p className="text-neutral-500">FOLLOW</p>
            <IoMdAdd size="1.2rem" color="green" className="ml-1" />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <BsFacebook color="blue" className="mr-1" />
            <FaInstagramSquare color="red" className="mr-1" />
            <FaTwitterSquare color="aqua" className="mr-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
