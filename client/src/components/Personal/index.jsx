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

export default function Personal() {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [havePosts, setHavePosts] = useState(false);
  // const PF = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    (async () => {
      try {
        const res = await postsApi.getPostByAuthor(username);
        console.log(res);
        setPosts(res.data.posts);
        setHavePosts(false);
      } catch (error) {
        alert('Error');
        console.log(error);
      }
    })();
  }, []);

  console.log(posts);

  return (
    <React.Fragment>
      <Topbar />
      <Setting />
      <div className=" p-2 flex flex-wrap gap-x-4  gap-y-8 justify-center">

      {posts.length === 0 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <div className="text-xl">
            <div className='flex'> 
              <p className=" mb-2 mr-1 text-2xl">Bạn chưa có Bài viết nào cả</p>
              <FaSmileBeam color='#FF8787' className='mr-1'/>
              <FaSmileBeam color='#FF8787'/>
            </div>
            <div className='ml-20'>
              <button className="border flex items-center p-1 rounded-md border-gray-400  bg-blue-400 
              hover:bg-blue-300 active:bg-blue-200">
                <BiAddToQueue className="mr-2" />
                <Link to="/write">Nhấn để tạo</Link>
              </button>
            </div>
          </div>
        </div>
      )}
      {posts.map((post, index) => (
        <Post post={post} key={index} />
      ))}
      </div>

    </React.Fragment>
  );
}