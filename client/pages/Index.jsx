import { useEffect, useState } from "react";
import Post from "../components/Post";
import Footer from "../components/Footer";

const Index = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
  
      fetch("http://localhost:8080/post")
        .then((response) => {
          response.json().then((posts) => {
            setPosts(posts.slice(0, 10));
          });
        });
      });

  return (
    <>
      <main>
        {posts.map((post) => (
          <Post  {...post} />
        ))}
      </main>
      <Footer />
    </>
  );
};

export default Index;