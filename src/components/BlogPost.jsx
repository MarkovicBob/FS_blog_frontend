import axios from "axios";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../pages/NotFound";

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [editPost, setEditPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/blogposts/${id}`);

        if (res.data) {
          setPost(res.data[0]);
        } else {
          return;
        }
      } catch (error) {
        console.error("Error fetching post:");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Do you really want to delete this post?")) {
      try {
        await axios.delete(`http://localhost:3000/blogposts/${id}`);
        toast.success("Post deleted!");
        setPost(null);
      } catch (error) {
        console.error("Error deleting post:", error);
        toast.error("Deletion failed");
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Toaster />
      {post === null ? (
        <NotFound />
      ) : (
        <div className="justify-self-center mt-8 outline-2 rounded-2xl p-8 bg-stone-200">
          <p>{post.date}</p>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black">{post.title}</h2>
          </div>
          <div className="mt-6 w-[500px] flow-root">
            <p>{post.content}</p>
          </div>

          <div className="flex justify-end gap-6">
            <button className="rounded-lg px-6 bg-stone-950 text-white mt-8 p-2">
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="rounded-lg px-6 bg-stone-950 text-white mt-8 p-2"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogPost;
