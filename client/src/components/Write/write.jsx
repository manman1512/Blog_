import React, { useContext } from 'react';
import { Component } from 'react';

// import Topbar from '../Home/topbar';
import { ImFilePicture } from 'react-icons/im';
import { useState } from 'react';
import axiosClient from '../../axiosClient/index.js';
import { Context } from '../context/Context.js';
import { useNavigate } from 'react-router-dom';
// import Write from './index';

import CreateArticle from './CreateArticle';

export default function AddWrite() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState();
  // const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      desc,
    };
    console.log(newPost);
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append('name', fileName);
      data.append('file', file);
      newPost.photo = fileName;
      try {
        await axiosClient.post('/upload', data); //folder server: file index.js, line:48
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axiosClient.post('/posts/', newPost);
      navigate(`/post/${res.data.savePost._id}`);
    } catch (error) {
      if (error.response.status === 409) alert('Title bi trung');
      console.log(error);
    }
  };
  //   useEffect(() => {
  //     if(file){

  //       // create the preview
  //       const objectUrl = window.URL.createObjectURL(file)
  //       setPreview(objectUrl)
  //       // free memory when ever this component is unmounted
  //       return () => URL.revokeObjectURL(objectUrl)
  //     }
  //  }, [file])
  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => {
        resolve(fr.result);
      };
      fr.onerror = () => {
        reject('Error upload file');
      };
      fr.readAsDataURL(file);
    });
  };
  const handleUploadFile = async (e) => {
    const files = e.target.files;
    setUploading(true);
    const x = await readFile(files[0]);
    setPreview(x);
    setUploading(false);
    // readFile(files[0]).then((result)=>{
    //   setPreview(result);
    // })
  };

  // const handleCkeditorState = (event, editor) => {
  //   const data = editor.getData();

  //   // console.log(data)
  // };

  return (
    <div>
      {uploading ? (
        <div>Uploading</div>
      ) : (
        <div className="pt-2">
          {file && (
            <img
              // className="h-60 w-4/5 rounded-xl object-none"
              className="rounded-xl object-scale-down h-60 w-96"
              src={window.URL.createObjectURL(file)}
              alt=""
            />
          )}
          <form onSubmit={handleSubmit}>
            <div className="flex items-center">
              <label htmlFor="fileInp">
                <ImFilePicture
                  className="cursor-pointer"
                  color="green"
                  size="1.2rem"
                />
              </label>
              <input
                id="fileInp"
                type="file"
                name="fileInp"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
                // onChange={handleUploadFile}
                accept="image/png, image/jpeg, image/gif"
              />
              <input
                type="text"
                name="title"
                placeholder="Tiêu đề..."
                autoFocus={true}
                className="text-xl border-none p-5 outline-none text-slate-500"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>


            <div>
              <React.Fragment>
                <div className="flex h-[calc(100%-3rem)]">
                  <CreateArticle />
                  <div className="basis-1/2 bg-yellow-100"></div>
                </div>
              </React.Fragment>
            </div>

            <button
              className="position cursor-pointer bg-lime-700 rounded-md p-1 text-white mt-5"
              type="submit"
            >
              Đăng
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
