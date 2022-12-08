import React, { useEffect, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { BsFillHeartFill, BsHeart, BsSuitHeart } from 'react-icons/bs';
import { GoComment } from 'react-icons/go';
import postsApi from "../../axiosClient/api/posts"
import { Link } from 'react-router-dom';
import { PreviewContent } from '../PreviewContent';
export default function Post({ post }) {
  const PF = process.env.REACT_APP_SERVER_URL;
  const [previewImage, setPreviewImage] = useState('');
  console.log(previewImage);
  const [details, setDetails] = useState({
    like: false,
    count: 0
  });
  const handleClick = async (e) => {
    // if login then post else alert need to login to do this action
    const response = await postsApi.likePost(post._id);
    setDetails(response.data)
  };
  useEffect(()=>{
    (async()=>{
      const response = await postsApi.isLikePost(post._id)
      const data = response.data;
      setDetails(data);
    })()
    const interval = setInterval(()=>{
      // console.log(99999)
      (async()=>{
        const response = await postsApi.isLikePost(post._id)
        const data = response.data;
        setDetails(data);
      })()
    },30000)
    return () => clearInterval(interval)
  },[])
  return (
    <div
      className="w-[480px] font-mono rounded-lg"
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      }}
    >
      {previewImage && (
        <img
          className="w-96 h-72 rounded-lg mx-auto my-2"
          src={previewImage}
          alt=""
        />
      )}

      <div className="p-2">
        <p
          title={post.title}
          className="text-left font-bold text-3xl truncate w-full"
        >
          {post.title}
        </p>

        <div className="text-neutral-500 text-xs flex items-center">
          {
            <div className="rounded-full p-1 inline-block mx-1">
              <img
                className="w-6 h-6 rounded-full bg-cover"
                src={`${PF}/images/${post.author.profilePic}`}
                alt=""
              />
            </div>
          }
          <span className="max-w-[120px] truncate">{` by ${post.author.displayName}`}</span>
          |{new Date(post.createdAt).toDateString()}
        </div>
        <div className="flex items-center my-2 gap-x-2 truncate">
          {post.categories.map((cate, index) => (
            <Link key={index} to={`/posts?tag=${cate.name}`}>
              {/* {console.log(cate.name)} */}
              <span
                className="leading-3 px-2 py-1 rounded-full italic tags"
                key={index}
              >
                {cate.name}
              </span>
            </Link>
          ))}
        </div>
          <PreviewContent
            setPreviewImage={(img) => {
              setPreviewImage(img);
            }}
          >
            {post.content}
          </PreviewContent>
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1 pt-3 pr-3">
            {/* views */}
            {!details.like ? (
              <BsFillHeartFill
                onClick={handleClick}
                color="white"
                className="cursor-pointer"
                style={{ stroke: 'black', strokeWidth: '1' }}
              />
            ) : (
              <BsFillHeartFill
                onClick={handleClick}
                color="red"
                className="cursor-pointer"
                style={{ stroke: 'black', strokeWidth: '1' }}
              />
            )}
            {details.count} Lượt thích
          </div>

          <div className="flex items-center gap-x-1 pt-3">
            {/* comments */}
            <GoComment />0 Bình luận
          </div>

          <Link
            className="ml-auto text-[#7367f0] pt-3"
            to={`/post/${post._id}`}
          >
            Xem thêm
          </Link>
        </div>
      </div>
    </div>
  );
}
