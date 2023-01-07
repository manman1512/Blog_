import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// import Posts from '../Home/posts';
import Topbar from '../Home/topbar';
// import PersonalPost from './personalPosts';
import postsApi from '../../axiosClient/api/posts.js';
import { BiAddToQueue } from 'react-icons/bi';
import Post from '../Home/post';
import { FaSmileBeam } from 'react-icons/fa';
import Setting from '../Setting/setting';
import { PER_PAGE } from '../../App';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Posts from '../Home/posts';

export default function Personal() {
  const { username } = useParams();
  // const PF = process.env.REACT_APP_SERVER_URL;  
  return (
    <React.Fragment>
      <Topbar />
      <Setting />

      <div>
      <Posts username={username}/>
    </div>

    </React.Fragment>
  );
}