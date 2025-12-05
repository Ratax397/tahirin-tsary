import React from 'react'
import Image from 'next/image'
import UserTag from './UserTag'
import { useRouter } from 'next/navigation'

export default function ArticleItem({item}) {

    const router=useRouter();

    const user={
        name:item?.userName,
        image:item?.userImage,
    }

  return (
    <div>
      <div onClick={()=>router.push("articles/"+item.id)} className="relative before:absolute before:h-full before:w-full before:rounded-3xl before:z-10 hover:before:bg-gray-600 hover:before:opacity-50 cursor-pointer">
        { 
          item?.image &&(
            <Image className="rounded-3xl cursor-pointer relative z-0" src={item?.image} alt="image" width={500} height={500} />
          )
        }
      </div>
      <h2 className='font-bold text-[18px] mb-1 mt-2 line-clamp-2'>{item?.title}</h2>
      <UserTag user={user}/>
    </div>
  )
}
