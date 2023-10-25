import { useEffect, useState } from "react"
import Post from "../components/Post"
import Footer from "../components/Footer"


const Ciencia = () => {
  const [posts, setPosts] = useState([])
  useEffect(() =>{
     fetch("https://back-blog-beta.vercel.app/post").then(response => {
         response.json().then(posts =>{
            const categoryPosts = posts.filter((post) => post.category === "Ciencia");
            setPosts(categoryPosts);
         });
     });
  }, [])


  return (
    <>
    <main>
        {posts.length > 0 && posts.map(post => (
        <Post {...post} key={post._id}/>
       ))}
       

    </main>
    <Footer/>
    </>
  )
}

export default Ciencia


