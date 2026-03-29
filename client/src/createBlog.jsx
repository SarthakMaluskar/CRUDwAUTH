import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function CreateBlog(){

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content,setContent] = useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{
            await axios.post("http://localhost:3000/api/blogs",{
            title,
            content
        }, {withCredentials : true})

        alert("Blog created");
        navigate('/');
        }catch{
            alert("failed to create blog")
        }
        

    }


     return (
        <div>
            <h1>Create Task</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="10"
                        cols="40"
                    />
                </div>

                <button type="submit">Create</button>
            </form>
        </div>
    );
}