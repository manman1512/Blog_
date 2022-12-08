
import React, { useEffect, useState } from 'react';
import Topbar from '../Home/topbar';
import CreateArticle from './CreateArticle';
import { FaTimes } from 'react-icons/fa';
// import Header from './Header';
// import MDEditor from '@uiw/react-md-editor';
import { useDebouncedCallback } from 'use-debounce';
import categoriesApi from '../../axiosClient/api/categories';
import postsApi from '../../axiosClient/api/posts';
import { useLocation, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Write() {
  const location = useLocation();
  const url = location.pathname.split('/');
  const [content, setContent] = useState();
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const [onLoadingTags, setOnLoadingTags] = useState(false);
  const [suggestTags, setSuggestTags] = useState([]);
  const navigate = useNavigate();
  const addTag = async (tag) => {
    const response = await categoriesApi.addTag(tag);
    if (response.status === 200) {
      tags.push(response.data);
      setTags(tags);
      setTag('');
    }
  };
  const handleAddTag = async () => {
    if (!onLoadingTags) {
      const isExistInTag = tags.filter((t) => t.name === tag);
      if (isExistInTag.length === 0) {
        const isExist = suggestTags.filter((st) => st.name === tag);
        if (isExist.length === 0) {
          await addTag(tag);
        } else {
          setTags((prev) => [...prev, isExist[0]]);
          setTag('');
        }
      }else{
        alert("Tag existed")
        setTag("");
        
      }
    }
  };

  const debounced = useDebouncedCallback(async (value) => {
    const response = await categoriesApi.getByName(value);
    setSuggestTags(response.data);
    setOnLoadingTags(false);
    // console.log(response);
  }, 200);
  useEffect(() => {
    if (tag.length === 0) {
      setSuggestTags([]);
    }
    (async () => {
      if (tag.length > 0) {
        try {
          setOnLoadingTags(true);
          debounced(tag);
        } catch (error) {
          console.log(error);
        }
      } else {
        setSuggestTags([]);
      }
    })();
  }, [tag]);
  const onEnterPress = (e) => {
    // if(e.code === "Enter") {
    //   setContent(content + "</br>")
    // }
  };
  const handleClick = async () => {
    // const res = await postsApi.getPost(url)
    navigate('/');
    // console.log(res);
  };

  const handleOnSubmit = async () => {
    if (url[1] === 'write') {
      const data = {};
      data.title = title;
      data.content = content;
      data.categories = [];
      tags.forEach((tag) => {
        data.categories.push(tag._id);
      });
      try {
        const response = await postsApi.cratePost(data);
        toast.success('Đăng bài viết thành công!', {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          onClose: () => {
            navigate(`/post/${response.data.data._id}`);
          },
        });
        console.log(response);
      } catch (error) {
        toast.error('Đăng bài viết thất bại!', {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
    } else if (url[1] === 'update') {
      const data = {};
      data.title = title;
      data.content = content;
      data.categories = [];
      tags.forEach((tag) => {
        data.categories.push(tag._id);
      });
      try {
        console.log(url);
        const response = await postsApi.updatePost(url[2], data);
        toast.success('Cập nhật thành công!', {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          onClose: () => {
            navigate(`/post/${url[2]}`);
          },
        });
      } catch (error) {
        console.log(error);
        toast.error('Cập nhật thất bại!', {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (url[1] === 'update') {
        const postId = url[2];
        const post = await postsApi.getPost(postId);
        setTitle(post.data.title);
        setContent(post.data.content);
        setTags(post.data.categories);
      } else {
        setContent('');
        setTitle('');
        setTags([]);
      }
    })();
  }, [location]);
  const handleOnClick = (image) => {
    setContent(
      content +
        `<img style="max-height: 500px" class='mx-auto my-4' src="${process.env.REACT_APP_SERVER_URL}/images/${image}" alt="${image}"/>`
    );
  };
  return (
    <React.Fragment>
      <Topbar />
      <div className="h-[calc(100%-3rem)] p-8 flex flex-col gap-y-4 bg-[#F5F5F6]">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Tiêu đề"
          className="w-full text-2xl border border-gray-400 focus:border-blue-300 outline-none p-2 rounded-md"
        />
        <div className="flex gap-4">
          <div className="border border-gray-400 focus-within:border-blue-300 text-xl p-2 rounded-md  flex-1 flex gap-x-2">
            {tags.map((item, index) => (
              <div
                className="text-md border p-1 flex gap-1 items-center rounded-lg bg-gray-100 text-gray-400"
                key={index}
              >
                {item.name}
                <button
                  className="rounded-full bg-none hover:bg-gray-300 w-4 h-4 flex justify-center items-center p-1 hover:text-black"
                  onClick={() => {
                    console.log(tags);
                    setTags(tags.filter((item1) => item1._id !== item._id));
                  }}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
            <div className="relative flex-1 p-2 bg-transparent">
              <input
                type="text"
                className="outline-none w-full bg-transparent"
                value={tag}
                placeholder={'Chọn tag'}
                onChange={(e) => {
                  setTag(e.target.value);
                }}
                // onKeyDown={(e) => {
                //   if (e.code === 'Backspace') {
                //     if (tag.length === 0) {
                //       setTags(tags.slice(0, tags.length - 1));
                //     }
                //   }
                // }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddTag();
                }}
              />
              {suggestTags.length > 0 && tag.length > 0 && (
                <div
                  className="absolute w-[99%] bg-white min-h-[70px] left-1/2 -translate-x-1/2
                 translate-y-6 suggestion flex flex-col gap-y-4 py-2 z-[100]"
                >
                  {onLoadingTags === true && suggestTags.length === 0 ? (
                    <p className="text-black">Loading</p>
                  ) : (
                    suggestTags &&
                    suggestTags.length > 0 &&
                    suggestTags.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setTags([...tags, item]);
                          setTag('');
                        }}
                        className="text-left px-2 hover:bg-[#F5F7FA]"
                      >
                        {item.name}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={handleOnSubmit}
            className="p-2 rounded-lg border border-black  hover:bg-blue-300 active:bg-blue-200"
          >
            {url[1] === 'update' ? 'Cập nhật' : 'Đăng bài viết'}
          </button>
          <ToastContainer className="mt-9" />

          <button
            className="p-2 rounded-lg border border-black px-8  hover:bg-blue-300 active:bg-blue-200"
            onClick={handleClick}
          >
            Hủy
          </button>
        </div>
        <CreateArticle
          content={content}
          onEnterPress={onEnterPress}
          changeContent={(e) => {
            setContent(e);
          }}
          handleOnClick={handleOnClick}
        />
      </div>
    </React.Fragment>
  );
}
