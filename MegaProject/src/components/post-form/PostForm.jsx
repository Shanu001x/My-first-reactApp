import React, {useCallback} from 'react'
import { useForm } from 'react-hook-form'
import {LogoutBtn, Input, Select,RTE} from '../index'
import appwriteService from '../../appwrite/appwriteConfig'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



function PostForm() {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title,
            slug: post?.slug,
            content: post?.content,
            status: post?.status,

        }
    })

    const navigate =useNavigate()
    const userData = useSelector((state) => state.user.userData )
cosnt submit = async (data) => {
    if (post) {
        const file = data.image[0]? appwriteService.uploadFile(data.image[0]): null
        if (file) {
           appwriteService.deleteFile(post.featuredImage)
           const dbPost  = 
        }
    }
}

  return (
    <div>PostForm</div>
  )
}

export default PostForm