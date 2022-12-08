import React from 'react';
import Topbar from './topbar';
import Header from './header';
import Posts from './posts';
import axiosClient from '../../axiosClient';
import { useEffect } from 'react';
import { useState } from 'react';
// import axiosClient from '../../axiosClient';
// import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Context } from '../context/Context';

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosClient.get('/posts/getAllPost');
      setPosts(res.data);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <Topbar />
      <Header />
      <div className="flex justify-start mt-6 ">
        <Posts posts={posts}/>
      </div>
    </div>
  );
}
