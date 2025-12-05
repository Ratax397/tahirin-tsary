import React from 'react'
import { TiWorld } from "react-icons/ti";
import UserTag from './UserTag'


export default function ArticleInfo({articleDetails}) {

    const user={
        name:articleDetails?.userName,
        email:articleDetails?.userEmail,
        image:articleDetails?.userImage,
    }

  return (
    <div>
        <h2 className="font-bold mb-10 text-[30px]">
            {articleDetails?.title}
        </h2>
        <UserTag user={user}/>
        <p className="mt-10">
            {articleDetails?.desc}
        </p>
        <button className='bg-[#e37508] text-[23px] p-2 text-white px-5 mt-10 rounded-full hover:scaae-105 transition-all' onClick={()=>window.open(articleDetails?.link)}>
            <TiWorld/>
        </button>
    </div>
  )
}
