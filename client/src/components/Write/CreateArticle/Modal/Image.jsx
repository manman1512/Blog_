import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';
import Modal from 'react-modal';
import utilsApi from '../../../../axiosClient/api/utlisApi';
import ProgressBar from "@ramonak/react-progress-bar";
// import { useDebouncedCallback } from 'use-debounce';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    minHeight: "300px",
    padding: '0',
    boxSizing: 'border-box',
  },
};
const readFile = (file, name) => {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      resolve({
        name,
        file: fr.result,
      });
    };
    fr.onerror = () => {
      reject('Error upload file');
    };
    fr.readAsDataURL(file);
  });
};
export default function ChooseImage({ isOpen, onClose, handleOnClick }) {
  const inpRef = useRef();
  const [files, setFiles] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [progressInfo, setProgressInfo] = useState([]);
  const [images, setImages] = useState([]);
  // const [data, setData] = useState([]);
  useEffect(() => {
    console.log(files);
    (async () => {
      if (files.length > 0) {
        try {
          for (let i = 0; i < files.length; i++) {
            const result = await readFile(
              files[i],
              `${files[i].name}`
            );
            setUploadFiles((prev) => [
              ...prev,
              {
                file: result.file,
                fileName: result.name,
              },
            ]);
            setProgressInfo((prev) =>[
                ...prev,
                {
                    fileName: result.name,
                    progress: 0,
                }
            ])
          }
        } catch (error) {}
      }
    })();
  }, [files]);

  useEffect(()=>{
    console.log(uploadFiles);
    if(uploadFiles.length > 0 && uploadFiles.length === files.length) {
        (async ()=>{
          const listPromise = [];
            for(let i = 0; i < uploadFiles.length; i++){
                const formData = new FormData();
                const fileName = `${Date.now()}-${uploadFiles[i].fileName}`;
                formData.append('name', fileName);
                formData.append('file', files[i]);
                listPromise.push(utilsApi.uploadImage(formData, (e)=>{
                const percent = Math.round((100 * e.loaded) / e.total);
                setProgressInfo((prev)=>{
                    const newUploadFiles = [...prev];
                    if(newUploadFiles[i]){
                        newUploadFiles[i].progress = percent;
                    }
                    return newUploadFiles;
                })
            }))
            Promise.all(listPromise).then((result)=>{
                console.log(result);
            })
            .catch(error=>{
                console.log(error);
            })
        }
        })()
    }
  },[uploadFiles])
  useEffect(()=>{
    if(progressInfo.length > 0){
        const check = progressInfo.every((item)=>{
            return item.progress === 100;
        })
        if(check){
            setTimeout(()=>{
                setUploadFiles([]);
                setFiles([]);
                setProgressInfo([]);
            },3000)
        }
    }
  },[progressInfo])
  useEffect(()=>{
    (async()=>{
      if(uploadFiles.length === 0){
      const response = await utilsApi.getImages();
      const {data} = response;
      setImages(data.images);
    }
    })()
  },[uploadFiles])
  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <header className="flex w-full border-b border-black my-4 px-2">
        <h1 className="text-lg">Chèn ảnh</h1>
        <button
          className="ml-auto w-4 h-4 rounded-full hover:bg-gray-300 flex items-center justify-center"
          onClick={onClose}
        >
          <FaTimes fontSize={14} />
        </button>
      </header>
      {uploadFiles.length > 0 ? (
        <div className="flex gap-4 w-full overflow-x-scroll flex-wrap px-4 h-[300px]">
          {uploadFiles.map((item, index) => {
            return (
              <div key={index} className="relative h-[150px]" style={{
                flex: "0 0 150px",
              }}>
                <img src={item.file} alt="" className="w-[150px] h-[150px]" />
                <ProgressBar isLabelVisible={false} completed={progressInfo[index].progress} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%]"/>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          htmlFor="fileInp"
          className="h-32 border border-dashed border-gray-300 hover:border-gray-500 m-2 cursor-pointer flex items-center justify-center hover:bg-gray-200"
          onClick={() => {
            if (inpRef) {
              inpRef.current.click();
            }
          }}
        >
          <div className="flex flex-col items-center">
            <FaCloudUploadAlt fontSize={64} />
            <p>Keo tha hoac chon file de upload</p>
          </div>
        </div>
      )}
      <h1 className="text-lg">Anh cua ban</h1>
        {
          images.length > 0 && <div className="flex gap-4 w-full overflow-x-scroll flex-wrap px-4 max-h-[250px]">
          {images.map((image, index) => {
            return (
              <div key={index} className="relative h-[150px]" style={{
                flex: "0 0 150px",
              }}>
                <button onClick={()=>{handleOnClick(image)}}>
                  <img src={`${process.env.REACT_APP_SERVER_URL}/images/${image}`} alt="" className="w-[150px] h-[150px]" />

                </button>
                
              </div>
            );
          })}
        </div>
        }
      <input
        ref={inpRef}
        id="fileInp"
        type="file"
        name="fileInp"
        className="hidden"
        multiple
        onChange={(e) => {
          console.log(e.target.files);
          setFiles(e.target.files);
        }}
        // onChange={handleUploadFile}
        accept="image/png, image/jpeg, image/gif"
      />
    </Modal>
  );
}
