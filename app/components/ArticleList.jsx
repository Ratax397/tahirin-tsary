import React from 'react'
import ArticleItem from './ArticleItem'

export default function ArticleList({listPosts,searchTerm}) {

  const uniqueList=listPosts.filter((post,index,self)=>
    index===self.findIndex((p)=>(
      p.id===post.id
    ))
  )

  const filteredList=uniqueList.filter((post)=>{
    if(!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return(
      post.title?.toLowerCase().includes(search) ||
      post.desc?.toLowerCase().includes(search) ||
      post.userName?.toLowerCase().includes(search) 
    )
  })

  return (
    <div className="mt-7 px-2 md:px-5 columns-2 md:columns-3 lg:columns-4 mb-4 xl-columns-4 space-y-6 mx-auto">
      {
        filteredList.map((item,index)=>(
          <ArticleItem key={item.id || index} item={item} />
        ))
      }
    </div>
  )
}
