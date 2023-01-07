import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import postsApi from '../../axiosClient/api/posts';
// import { useLocation } from 'react-router-dom';
// import axiosClient from '../../axiosClient';
import Post from './post';
import { PER_PAGE } from '../../App';
import {HiChevronDoubleLeft, HiChevronDoubleRight} from 'react-icons/hi'

export default function Posts({username}) {
  const [posts, setPosts] = useState([]); //hien len 9 cai post
  const [length, setLength] = useState(1); //tong so cac bài viết
  const [page, setPage] = useState(1); //page hien tai
  const [lastPage, setLastPage] = useState(1);
  const [selectedPage, setSelectedPage] = useState(null);
  useEffect(() => {
    setLastPage(Math.ceil(length / PER_PAGE));
  }, [length]);
  useEffect(() => {
    (async () => {
      const response = await (username ? postsApi.getPostsByAuthor(page, username) : postsApi.getPosts(page));
      // console.log(response);
      setPosts(response.data.posts);
      setLength(response.data.length);
    })();
  }, [page]);
  return (
    <div>
      <div className="flex flex-wrap gap-5 p-4">
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
      <div className="flex justify-center gap-x-4">
        <button
          disabled={page === 1}
          // className={page === 1 ? 'dis' : ''}
          onClick={() => setPage((current) => current - 1)}
        >
          <HiChevronDoubleLeft />
        </button>
        {[...Array(lastPage).keys()].map((value, i) => (
          <button
            onClick={() => setPage(value + 1)}
            disabled={value + 1 === page}
            className={value + 1 === page ? 'text-blue-500' : ''}
          >
            {value + 1}
          </button>
        ))}
        <button
          disabled={page === lastPage}
          onClick={() => setPage((current) => current + 1)}
        >
          <HiChevronDoubleRight />
        </button>
      </div>
    </div>
  );
}
