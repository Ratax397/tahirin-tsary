"use client"
import Image from "next/image";
import app from "./db/firebaseConfig";
import {collection,getDocs,getFirestore,query} from "firebase/firestore";
import { useState,useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ArticleList from "./components/ArticleList";

export default function Home() {

  const db=getFirestore(app);
  const [listArticles,setListArticles]=useState([]);
  const searchParms=useSearchParams();

  const searchTerm=searchParms.get('q') || "";
  

  useEffect(()=>{
    getAllPost()
  },[])

  const getAllPost=async()=>{
    try{
      const q=query(collection(db,'post'));
      const querySnapshot=await getDocs(q);
      const updatedArticles=querySnapshot.docs.map(doc=>doc.data());
      setListArticles(prevListArticles=>[...prevListArticles, ...updatedArticles]);
    }catch(error){
      console.error(`erreur lors de la requete ${error}`);
    }
  }

  return (
    <>
      <div className="p-3">
        <ArticleList listPosts={listArticles} searchTerm={searchTerm}/>
      </div>
    </>
  );
}
