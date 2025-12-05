"use client"

import { useState,useEffect,use } from "react"
import {getDoc,doc,getFirestore} from "firebase/firestore"
import app from "@/app/db/firebaseConfig"
import UserInfo from "../../components/UserInfo"


export default function page({params}) {

    const db=getFirestore(app);
    const [userInfo,setUserInfo]=useState(null);

    const useParams=use(params)

    useEffect(()=>{
        if(params){
            getUserInfo(useParams.userId.replace('%40','@'));
        }
    },[useParams])

    const getUserInfo=async(email)=>{
        const docRef=doc(db,"user",email);
        const docSnap=await getDoc(docRef);
        if(docSnap.exists()){
            const userData = docSnap.data();
            setUserInfo(userData);
        }else{
            console.log("Aucune information");
        }
    }

  return (
    <div className="bg-[#e9e9e9] min-h-screen flex items-center justify-center">
        {userInfo ? (
            <div>
                <UserInfo userInfo={userInfo}/>
            </div>
        ): null}
    </div>
  )
}
