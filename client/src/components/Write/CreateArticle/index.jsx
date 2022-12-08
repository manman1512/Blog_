import React, { useState } from 'react';
import MDEditor, {commands} from '@uiw/react-md-editor';
import {BsImages} from "react-icons/bs";
import ChooseImage from './Modal/Image';

export default function CreateArticle({
  content,
  changeContent,
  onEnterPress,
  handleOnClick,
}) {
  const [openChooseImage, setOpenChooseImage] = useState(false);
  const insertImage = {
  name: 'image',
  keyCommand: 'image',
  buttonProps: { 'title': 'Insert image'},
  icon: <BsImages/>,
  execute: (state, api) => {
    setOpenChooseImage(true);
  }
};
  
  return (
    <React.Fragment>

    <MDEditor
    value={content}
    minHeight={250}
    height={"100%"}
    onChange={changeContent}
    onKeyDown={onEnterPress}
    commands={
      [
        commands.bold,
        commands.italic,
        commands.strikethrough,
        commands.divider,
        commands.title1,
        commands.title2,
        commands.title3,
        commands.divider,
        commands.orderedListCommand,
        commands.unorderedListCommand,
        commands.divider,
        insertImage,
      ]
    }
    />
    <ChooseImage isOpen={openChooseImage} onClose={()=>{
        setOpenChooseImage(false)
    }} handleOnClick={handleOnClick}/>
    </React.Fragment>
  );
}
