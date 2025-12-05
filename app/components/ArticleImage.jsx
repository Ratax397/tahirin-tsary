"use client"
import React from 'react'
import Image from 'next/image'

export default function ArticleImage({articleDetails}) {
  return (
    <div>
      {
        articleDetails && < Image src={articleDetails?.image} alt={articleDetails?.title} width={1000} height={1000} className='rounded-2xl'/>
      }
    </div>
  )
}
