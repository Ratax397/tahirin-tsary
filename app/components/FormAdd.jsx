"use client"
import React from 'react'
import {useSession} from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {doc,setDoc,getFirestore} from 'firebase/firestore'
import app from '@/app/db/firebaseConfig'
import UploadImage from './UploadImage'
import UserTag from './UserTag'


export default function FormAdd() {

  const {data:session}=useSession();
  const [title,setTitle]=useState();
  const [desc,setDesc]=useState();
  const [link,setLink]=useState();
  const [file,setFile]=useState();
  const [loading,setLoading]=useState(false);


  const router=useRouter();
  const db=getFirestore(app);
  const postId=Date.now().toString();

  const onSave=()=>{
    setLoading(true)
    uploadFile()
  }

  const uploadFile=()=>{
    const formData=new FormData();
    formData.append('file',file);
    formData.append('upload_preset',process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)

     fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
       method:'POST',
       body:formData
     })
     .then(res=>res.json())
     .then(data=>{
      const url=data.secure_url;
      console.log(`Downloadurl ${url}`);

      const postData={
          title:title,
          desc:desc,
          link:link,
          image:url,
          userName:session.user.name,
          userEmail:session.user.email,
          userImage:session.user.image,
          id:postId
        }
        return setDoc(doc(db,'post',postId),postData);
     })
     .then(resp=>{
        console.log("saved")
        setLoading(false);
        router.push("/dashboard/"+session.user.email)
      })
  }

  return (
    <div className="bg-white p-16 rounded-2xl">
      <div className="flex justify-end mb-6">
        <button onClick={()=>onSave()} className="bg-orange-500 p-2 text-white font-semibold px-3 rounded-lg">
            {
              loading ? <div className="inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-t-2 border-b-2 border-orange-900 rounded-full animate-spin"></div>
              </div>
              : <span>Publier</span>
            }
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <UploadImage setFile={(file)=>setFile(file)}/>
        <div className="col-span-2">
          <div className="w-[100%]">
            <input onChange={(e)=>setTitle(e.target.value)} type="text" className="text-[35px] outline-none font-biold w-full border-b-[2px] border-gray-400 placeholder-gray-400" placeholder='Ajouter un titre'/>
            <h2 className="mb-8 w-full border-gray-400 text-[12px]">Les premieres 40 caracteres seront affichés ici</h2>
            <UserTag user={session?.user}/>
            <textarea onChange={(e)=>setDesc(e.target.value)} placeholder='Ajouter une description' className='outline-none w-full mt-8 pb-4 txt-[14px] border-b-[2px] border-gray-400 placeholder-gray-400'></textarea>
            <input onChange={(e)=>setLink(e.target.value)} placeholder="ajouter un lien" type="text" className="outline-none w-full pb-4 border-gray-400 placeholder-gray-400 mt-[90px] border-b-[2px]" />
          </div>
        </div>
      </div>

    </div>
  )
}