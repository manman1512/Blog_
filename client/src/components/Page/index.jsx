import React, { useState } from 'react';
import Topbar from '../Home/topbar';
import SinglePost from './SinglePost/singlePost';
import SuggestionArticle from './SuggestionArticle';

export default function Page() {
  const [author, setAuthor] = useState("")
  const [_id, set_id] = useState("")
  const [tags, setTags] = useState([]);
  const handleSetAuthor = (author) =>{
    setAuthor(author)
  }
  const handleSetId = (_id) =>{
    set_id(_id)
  }
  const handleSetTags = (tags) =>{
    setTags(tags)
  }


  return (
    <div>
      <Topbar />
      <div className="xl:max-w-[1140px] lg:max-w-[960px] mx-auto">
        <SinglePost handleSetAuthor={handleSetAuthor} handleSetId={handleSetId} handleSetTags={handleSetTags}/>
        <SuggestionArticle author={author} _id={_id} tags={tags}/>
      </div>
    </div>
  );
}
