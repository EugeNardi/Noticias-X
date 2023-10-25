import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Footer from "../components/Footer";
import { formatISO9075 } from "date-fns";
//import { Response } from "express";
 

const PostPage = () => {
    const [postInfo, setPostInfo] = useState(null);

    const {id} = useParams();
    useEffect(() => {
        fetch(`https://back-blog-beta.vercel.app/post/${id}`).then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo);
            })
        })

    },[])

    if(!postInfo) return "";

  return (
   <>
   
    <div className="post-page">
      <h1 className="title">{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">Por {postInfo.author}</div>
      <div className="image">
      <img src={`https://back-blog-beta.vercel.app/${postInfo.cover}`} alt="" />
      </div>
      <div className="content">

      <div  dangerouslySetInnerHTML={{__html:postInfo.content}}/>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default PostPage