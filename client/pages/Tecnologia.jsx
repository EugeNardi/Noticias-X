import { useEffect, useState } from "react"
import Post from "../components/Post"
import Footer from "../components/Footer"


const Tecnologia = () => {
  const [posts, setPosts] = useState([])
  useEffect(() =>{
     fetch("http://localhost:8080/post").then(response => {
         response.json().then(posts =>{
            const categoryPosts = posts.filter((post) => post.category === "Tecnología");
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

export default Tecnologia


