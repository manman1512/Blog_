import React, { useEffect, useState } from 'react';
import Topbar from '../Home/topbar';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import postsApi from '../../axiosClient/api/posts';
import categoriesApi from '../../axiosClient/api/categories';
import Post from '../Home/post';
import Posts from '../Home/posts';

export default function SearchPost() {
  // const {} = useQuery();
  const { search } = useLocation();
  const { tag } = queryString.parse(search);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await categoriesApi.getPostByTag(tag);
      // if()
      setPosts(res.data.posts)
      // console.log(res.data.postByTag)
    })();
  }, [tag]);
  console.log(posts);

  return (
    <div className="w-full h-full relative bg-[#F5F5F6]">
      <Topbar />
      <Posts posts={posts}/>
    </div>
  );
}
