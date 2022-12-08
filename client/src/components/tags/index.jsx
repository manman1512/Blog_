import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import categoriesApi from '../../axiosClient/api/categories';
import { Context } from '../context/Context';
import Topbar from '../Home/topbar';

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [postPerTag, setPostPerTag] = useState([]);
  const [tag, setTag] = useState('');
  const [state, dispatch] = useContext(Context);
  const handleAddTag = async () => {
    const response = await categoriesApi.addTag(tag);
    if (response.status === 200) {
      tags.push(response.data);
      setTags(tags);
      setTag('');
    }
  };
  useEffect(() => {
    console.log(state);
    (async () => {
      if (state.user && tags.length === 0) {
        const getTags = await categoriesApi.getTags(state.user._id);
        setTags(getTags.data);
      }
    })();
  }, [state]);
  useEffect(() => {
    (async () => {
      if (tags.length > 0) {
        const response = await Promise.all(
          tags.map(async (tag) => {
            return new Promise(async (resolve, reject) => {
              const data = {
                tagId: tag._id,
              };
              const res = await categoriesApi.getPostByTags(tag._id);
              data.count = res.data.data.count;
              // check if tagId is in postPerTag
              const index = postPerTag.findIndex(
                (item) => item.tagId === tag._id
              );
              if (index === -1) {
                postPerTag.push(data);
              } else {
                postPerTag[index] = data;
              }
              setPostPerTag(postPerTag);
              resolve(res.data);
            });
          })
        );
      }
    })();
  }, [tags]);
  tags.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return (
    <div className="h-full">
      <Topbar />
      <div className="p-6 h-[calc(100%-3rem)] overflow-y-auto bg-[#F5F5F6]">
        <div className="w-1/2 mx-auto bg-white min-h-[160px] p-4">
          <div
            className="border border-gray-300 w-1/2 mx-auto flex gap-x-4 p-2 rounded-lg
           focus-within:border-gray-500"
          >
            <input
              value={tag}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddTag();
              }}
              onChange={(e) => {
                setTag(e.target.value);
              }}
              type="text"
              className="w-full outline-none text-lg"
              placeholder="Thêm tag..."
            />
            <button
              onClick={handleAddTag}
              className="bg-blue-400 p-1 px-4 rounded-md border border-gray-400 hover:bg-blue-300
            active:bg-blue-200
            "
            >
              Thêm
            </button>
          </div>
          {tags.length > 0 &&
            tags.map((tag, index) => (
              <div key={index}>
              {tag.name} 
              {/* |{''} */}
                {/* {postPerTag.map((p) => {
                  if (p.tagId === tag._id) {
                    return `${p.count} bài viết`;
                  }
                })} */}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
