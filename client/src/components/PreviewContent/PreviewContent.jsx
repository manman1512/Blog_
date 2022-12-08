import React, { useRef } from 'react';
import * as Showdown from 'showdown';
import { useEffect } from 'react';
// const regImg = /<img([\w\W]+?)\/>/;
export default function PreviewContent({ children, setPreviewImage }) {
  // const content = children.split(regImg)[0];
  const el = document.createElement('div');
  el.innerHTML = children;
  const x = el.querySelector('img');
  let avatarUrl;
  if (x) {
    avatarUrl = x.src;
    setPreviewImage(x.src);
  }
  const divRef = useRef();
  useEffect(() => {
    if (divRef) {
      const converter = new Showdown.Converter();
      divRef.current.innerHTML = divRef.current.innerHTML.replace(
        '#REPLACEDDD',
        `<span class="text-red-300 font-bold">--Ảnh phía trên--</span>`
      );
      const content = divRef.current.innerHTML;
      divRef.current.innerHTML = converter.makeHtml(content);
    }
  });
  return (
    <div>
      <div ref={divRef} className="line-clamp-4">
        {children.replaceAll(/<img .*?>/ig, "")}
      </div>
    </div>
  );
}
