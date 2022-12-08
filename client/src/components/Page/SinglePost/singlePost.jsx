import React, { useContext } from 'react';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
// import { RiDeleteBin6Line } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import axiosClient from '../../../axiosClient';
import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/Context.js';
import postsApi from '../../../axiosClient/api/posts';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { userApi } from '../../../axiosClient/api/user';
import { setUser } from '../../context/Actions';
import { Carousel } from 'react-responsive-carousel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SinglePost({
  handleSetAuthor,
  handleSetId,
  handleSetTags,
}) {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  // console.log(location)
  const [post, setPost] = useState({});

  // const [title, setTitle] = useState('');
  // const [content, setContent] = useState('');
  // const [updateMode, setUpdateMode] = useState(false);
  const PF = process.env.REACT_APP_SERVER_URL;
  // const banners =['https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.elle.vn%2Fthe-gioi-van-hoa%2F26-hinh-anh-dep-den-nghet-tho-du-khong-chinh-sua-photoshop&psig=AOvVaw2VlwXv0i7ZNKFUkErfyFXJ&ust=1665487760100000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJD9x9Pp1PoCFQAAAAAdAAAAABAE',
  // ,'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ivivu.com%2Fblog%2F2021%2F05%2Fxieu-long-voi-doi-hoa-tim-mong-mo-o-sapa%2F&psig=AOvVaw2VlwXv0i7ZNKFUkErfyFXJ&ust=1665487760100000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJD9x9Pp1PoCFQAAAAAdAAAAABAi',
  // 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fthuthuatnhanh.com%2Fhinh-anh-thien-nhien-phong-canh-dep%2F&psig=AOvVaw2VlwXv0i7ZNKFUkErfyFXJ&ust=1665487760100000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJD9x9Pp1PoCFQAAAAAdAAAAABBA']

  useEffect(() => {
    const getPost = async () => {
      const res = await postsApi.getPost(path);
      setPost(res.data);
      handleSetAuthor(res.data.author.username);
      handleSetId(res.data._id);
      handleSetTags(res.data.categories);
    };
    getPost();
  }, [path]);
  const handleDelete = async () => {
    try {
      const response = await axiosClient.delete(
        `/posts/deletePostById/${post._id}`
      );
      console.log(response);
      if (response.status === 200) {
        toast.success('Xóa bài viết thành công!', {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          onClose: () => {
            navigate('/');
          },
        });
      } else {
        alert('Delete fail, check console');
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const token = window.localStorage.getItem('accessToken');
    if (token !== null) {
      (async () => {
        const user = await userApi.getMe();
        dispatch(setUser(user));
      })();
    }
  }, []);

  return (
    <div className="flex-auto my-4">
      {
        // Edit button
        state.user && post && post.author?._id === state.user._id && (
          <button
            className="absolute p-4 
            rounded-full bg-lime-500 text-white right-4 top-16 flex items-center justify-center"
            onClick={() => {
              navigate(`/update/${post._id}`);
            }}
          >
            <FaEdit />
          </button>
        )
      }

      {
        // delete button
        state.user && post && post.author?._id === state.user._id && (
          <button
            className="absolute p-4 
            rounded-full bg-lime-500 text-white right-4 top-32 flex items-center justify-center"
            onClick={handleDelete}
          >
            <AiFillDelete />
          </button>
          
        )
      }
          <ToastContainer className="mt-9" />


      <div className=" max-h-[170px] mx-auto mb-16">
        <Carousel
          autoPlay
          infiniteLoop
          showArrows={false}
          showIndicators={false}
          showThumbs={false}
          showStatus={false}
          className="list-none"
        >
          <img
            src="https://hpconnect.vn/wp-content/uploads/2020/02/H%C3%ACnh-%E1%BA%A3nh-phong-c%E1%BA%A3nh-thi%C3%AAn-nhi%C3%AAn-31.jpg"
            className="w[200px] h-[200px] rounded-lg"
          />
          <img
            src="https://thuthuatnhanh.com/wp-content/uploads/2018/07/hinh-anh-thien-nhien-phong-canh-dep-nhat.jpg"
            className="w[200px] h-[200px] rounded-lg"
          />
          <img
            src="https://indotech.vn/hinh-nen-phong-canh-dep/imager_5_3682_700.jpg"
            className="w[200px] h-[200px] rounded-lg"
          />
          <img
            src="https://wiki-travel.com.vn/uploads/picture/thanhnha-155021115014-1-rung-den.jpg"
            className="w[200px] h-[200px] rounded-lg"
          />
          <img
            src="https://lesgo.me/wp-content/uploads/2022/01/bai-viet5Cngo-ngang-truoc-thien-nhien-tuyet-mi-cua-sa-pa-461108165C8530078d-67d7-49e0-a145-5994d2b86ec1.jpg"
            className="w[200px] h-[200px] rounded-lg"
          />
        </Carousel>
      </div>
      {post !== {} && (
        <div className=" bg-white mx-auto flex flex-col gap-y-4 w-[80%]">
          {/* Author's information & Post's created */}
          <div className="flex gap-x-4 items-center">
            <img
              src={
                post.author && post.author.profilePic
                  ? `${PF}/images/${post.author.profilePic}`
                  : 'https://picsum.photos/40'
              }
              alt=""
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="text-lg text-lime-500">
                {post.author?.displayName || 'Display Name'}
              </p>
              <p className="text-sm">@{post.author?.username}</p>
            </div>
            <div className="ml-auto">
              <p className="font-bold text-gray-500">
                Đã đăng vào {new Date(post.createdAt).toDateString()}
              </p>
              {post.createdAt !== post.updatedAt && (
                <p className="text-sm italic text-gray-500">
                  Cập nhật lúc {new Date(post.updatedAt).toDateString()}
                </p>
              )}
            </div>
          </div>
          {/* Post */}
          <div>
            <h1 className="text-[2.5rem] font-bold">{post.title}</h1>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
