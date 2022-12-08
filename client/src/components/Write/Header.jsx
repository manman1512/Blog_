import React from 'react'
import {GoBold, GoItalic} from "react-icons/go"
function Button({
    children,
    func,
    handleOnClick,
    ...props
}){
    return <button {...props} className="p-1 border border-transparent hover:border-gray-400 rounded-sm" onClick={()=>{
        handleOnClick(func)
    }}>
        {children}
    </button>
}
function Separate(){
    return <div className="w-[2px] h-full bg-gray-300"></div>
}
export default function Header({onChoseHeader}) {
    // const s = ["bold", "italic", ""]
  return (
    <div className="w-full bg-[#f6f6f7] p-4 border flex gap-x-2">
        <Button handleOnClick={onChoseHeader} func="bold">
            <GoBold/>
        </Button>
        <Button handleOnClick={onChoseHeader} func="italic">
            <GoItalic/>
        </Button>
        <Separate/>
    </div>
  )
}
