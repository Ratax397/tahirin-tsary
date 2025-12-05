"use client"
import React, { useEffect,useState } from 'react'
import { FaSearch,FaRegUserCircle,FaPlus } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "../../public/malagasy_photo_logo.svg";
import Image from "next/image";
import {doc,getFirestore,setDoc} from "firebase/firestore";
import { useSession,signIn } from 'next-auth/react';
import app from "../db/firebaseConfig";
import { useRouter,useSearchParams } from 'next/navigation';


export default function Header() {

    const {data:session} = useSession();
    const router = useRouter();
    const db=getFirestore(app);

    const searchParms=useSearchParams();
    const [searchInput,setSearchInput]=useState(searchParms.get('q') || "");

    const handleSearch=(e)=>{
        const value= e.target.value;
        setSearchInput(value);
        if(value.trim()){
            router.push(`/?q=${encodeURIComponent(value)}`);
        }
        else{
            router.push('/');
        }
    }
    
    useEffect(()=>{
        saveUserInfo();
    },[session])



    const saveUserInfo=async()=>{
        if(session && session.user && session.user.email){
            await setDoc(doc(db,"user",session.user.email),{
                userEmail:session.user.email,
                userName:session.user.name,
                userImage:session.user.image
            })
        }
    }

    console.log(session)

    const onCreateClick=()=>{
        if(session){
            router.push("/articlebuilder")
        }else{
            signIn()    
        }
    }

  return (
    <div className='flex items-center p-5 gap-4'>
        <button onClick={()=>router.push('/')} className='flex items-center gap-2'>
            <Image src={Logo} className="w-10 h-10 p-1 rounded-full hover:bg-[#f1f1f1] hover:shadow-md" alt="Logo"/>
            <span className='font-bold text-[#e16d19] md:text-xl'>Tahirin-tsary</span>
        </button>

        <button className='bg-gray-200 font-semibold hover:bg-gray-300 transition-all text-black p-3 rounded-full flex items-center gap-2'>
            <span>Explorer</span>
            <span><IoIosArrowDown /></span>
        </button>

        <div className="flex items-center gap-4 grow">
            <div className="transition-all rounded-full p-3 flex items-center gap-3 w-full md:hover:bg-gray-200">
                <FaSearch className='text-3xl text-gray-500 cursor-pointer'/>
                <input 
                    type="text"
                    value={searchInput}
                    onChange={handleSearch} 
                    placeholder='Rechercher'
                    className="hidden border-none outline-none md:flex w-full bg-transparent" />
            </div>

            <button className="rounded-full bg-gray-200 p-3 font-semibold hover:bg-gray-300 transition-all">
                <IoMdNotificationsOutline/>
            </button>


              {session?.user ? (
                <div className="flex items-center gap-3">
                    <button onClick={()=>router.push(`/dashboard/${session.user.email}`)} className="rounded-full text-white">
                        <Image 
                            width={40}
                            height={40}
                            src={session.user.image}
                            alt="User Image"
                            className='rounded-full'
                        />
                    </button>
                    <button onClick={()=>onCreateClick()} className="bg-[#e16d19] hover:bg-orange-900 p-2 text-sm text-white rounded-full">
                        <FaPlus/>
                    </button>
                </div>
              ):(
                <button onClick={()=>signIn()} className="rounded-full bg-[#e16d19] text-white hover:bg-orange-900 transition-all p-3 font-semibold">
                    <FaRegUserCircle/>
                </button>
              )}
        

        </div>
    </div>
  )
}
