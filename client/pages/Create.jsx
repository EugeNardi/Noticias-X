import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import {Navigate} from "react-router-dom";


const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "clean",
];

const Create = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [redirect, setRedirect] = useState(false);

   
async function createNewPost(ev){
    const data = new FormData();
   data.set("title", title);
   data.set("summary", summary);
   data.set("content", content);
   data.set("file", files[0]);
   data.set("author", author);
   data.set("category", category);  
    ev.preventDefault();

  const response =  await fetch('https://back-blog-beta.vercel.app/post', 
    {
      method: 'POST',
      body: data,
      credentials: "include"
    });

    if(response.ok){
       setRedirect(true);
    }
    }

    if (redirect){
      return <Navigate to={"/"}/>
    }


  return (
    <>
  
      <form className="news" id="news" onSubmit={createNewPost}
       action="/post" method="POST" encType="multipart/form-data">
        <input
          type="title"
          placeholder="Título"
          value={title}
          onChange={ev => setTitle(ev.target.value)}
        />
        <input
          type="text"
          placeholder="Resumen"
          value={summary}
          onChange={ev => setSummary(ev.target.value)}
        />
         <input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={ev => setAuthor(ev.target.value)}
        />
        <select
          type="text"
          placeholder="Categoría"
          value={category}
          onChange={ev => setCategory(ev.target.value)}
        >     
        <option value="Categoria" selected>Categoria</option>
        <option value="Campo" selected>Campo</option>
        <option value="Ciencia">Ciencia</option>
        <option value="Tecnología">Tecnología</option>
        <option value="Finanzas">Finanzas</option>

        </select>        
        <input type="file"
        name="file"
        onChange={ev => setFiles(ev.target.files)}
        />
        <ReactQuill
          value={content}
          modules={modules}
          formats={formats}
          onChange={newValue => setContent(newValue)}
        />
        <button style={{ marginTop: "10px" }}>Crear Noticia</button>
      </form>
      
    </>
  );
};

export default Create;
