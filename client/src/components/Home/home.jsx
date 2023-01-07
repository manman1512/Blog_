import React from 'react';
import Topbar from './topbar';
import Header from './header';
import Posts from './posts';
import axiosClient from '../../axiosClient';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDown } from 'react-icons/ai';
import * as scroll from "react-scroll";
// import axiosClient from '../../axiosClient';
// import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Context } from '../context/Context';

export default function Home() {
  const [posts, setPosts] = useState([]);
  // const navigate = useNavigate();
  // useEffect(()=>{
  //   const access_token = window.localStorage.getItem("access_token");
  //   if(!access_token){
  //     navigate("/login");
  //   }
  // },[])
  return (
    <div className="relative">
      <Topbar />
      <Header />
      <Posts/>
      <button
      onClick={scroll.animateScroll.scrollToBottom}
      className=" flex justify-center items-center fixed w-8 h-8 rounded-full bg-red-300 bottom-10 right-10 "      
      >
      <AiOutlineDown fill="white"/>
      </button>
    </div>
  );
}
