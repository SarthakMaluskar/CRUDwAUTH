import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateBlog() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const postInfo = async () => {

            console.log(id);
            const res = await axios.get(
                `http://localhost:3000/api/blogs/${id}`,
                { withCredentials: true }
            );
            
            console.log(res.data)
            setTitle(res.data.title);
            setContent(res.data.content);
        };

        postInfo();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axios.put(
                `http://localhost:3000/api/blogs/${id}`,
                { title, content },
                { withCredentials: true }
            );

            alert("Updated successfully");
            navigate("/"); // redirect after update
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <h1>Update Post</h1>

            <form onSubmit={handleUpdate}>
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

                <button type="submit">Update</button>
            </form>
        </>
    );
}