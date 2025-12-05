"use client"
import React,{use}from 'react'
import { useState,useEffect } from 'react'
import { getDoc,doc,getFirestore } from 'firebase/firestore'
import app from '@/app/db/firebaseConfig'
import { FaArrowLeftLong } from "react-icons/fa6"
import { useRouter } from 'next/navigation'
import ArticleImage from '../../components/ArticleImage'
import ArticleInfo from '../../components/ArticleInfo'


export default function ArticlesDetails({params}){

    const db=getFirestore(app);
    const router=useRouter();
    const [articleDetails,setArticleDetails]=useState(null);
    const newParams=use(params)

    useEffect(()=>{
        getPostDetails();
    },[])

    const getPostDetails=async()=>{
        try{

            const docRef=doc(db,'post',newParams.articleId);
            const docSnap=await getDoc(docRef);
            if(docSnap.exists()){
                setArticleDetails(docSnap.data())
            }else{
                console.log("aucune information")
            }

        }catch(error){
            console.error(`erreur lors de la requete ${error}`)
        }
    }

    return(
        <>
            {
            
                articleDetails && <div className='min-h-screen p-3 bg-[#e9e9e9] md:p-12 md:px-24 lg:px-36'>
                    <FaArrowLeftLong className='text-[50px] cursor-pointer rounded-full p-2 bg-[#e37508] text-white hover:scale-105 transition-all mb-5' onClick={()=>router.back()}/>
                    <div className="bg-white grid grid-cols-1 lg:grid-cols-2 md:gap-10 shadow-lg rounded-2xl p-3 md:p-7 lg:p-12 xl:p-16">
                        < ArticleImage articleDetails={articleDetails}/>
                        <div>
                            <ArticleInfo articleDetails={articleDetails}/>
                        </div>
                    </div>
                </div>
            
            }
        </>
    )

}