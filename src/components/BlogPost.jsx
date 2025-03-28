import axios from "axios";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import NotFound from "../pages/NotFound";
import { FaRegEdit } from "react-icons/fa";
import { CiImageOff } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { GoUpload } from "react-icons/go";

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({
    date: "",
    title: "",
    content: "",
    cover: "",
    author: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/blogposts/${id}`);

        if (res.data) {
          setPost(res.data[0]);
          setEditedPost(res.data[0]);
        } else {
          return;
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);
  // console.log(post);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditedPost({ ...editedPost, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("Gesendete Daten:", editedPost);
    try {
      const res = await axios.put(
        `http://localhost:3000/blogposts/${id}`,
        editedPost,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.status === 200) {
        toast.success("Post updated successfully!");
        setPost(editedPost);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed");
    }
  };

  const handleDelete = async () => {
    if (confirm("Do you really want to delete this post?")) {
      try {
        await axios.delete(`http://localhost:3000/blogposts/${id}`);
        toast.success("Post deleted!");
        setPost(null);
      } catch (error) {
        console.error("Error deleting post:", error);
        toast.error("Failed to delete!");
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
        <div className=" m-8">
          <div className="flex items-center gap-8 justify-between">
            {isEditing ? (
              <input
                className="text-3xl font-black w-full"
                type="text"
                name="title"
                value={editedPost.title}
                onChange={handleChange}
              />
            ) : (
              <h2 className="text-3xl font-black w-full">{post.title}</h2>
            )}
            <FaRegEdit onClick={handleEdit} className="cursor-pointer" />
          </div>
          <form onSubmit={handleSave}>
            <div className=" pt-1">
              {isEditing ? (
                <input
                  type="date"
                  name="date"
                  value={editedPost.date.slice(0, 10)}
                  onChange={handleChange}
                />
              ) : (
                <p>{post.date.slice(0, 10)}</p>
              )}
            </div>

            {isEditing ? (
              <input
                className="text-sm font-light w-full text-stone-400 pt-2"
                type="text"
                name="author"
                value={editedPost.author}
                onChange={handleChange}
              />
            ) : (
              <h2 className="text-sm font-light w-full text-stone-400 pt-2">
                {post.author ? post.author : "Unknown Author"}
              </h2>
            )}

            <div className="mt-6">
              {isEditing ? (
                <input
                  className="w-full max-h-[350px] object-cover"
                  name="cover"
                  src={editedPost.cover}
                  value={editedPost.cover}
                  onChange={handleChange}
                ></input>
              ) : (
                <img
                  className="w-full max-h-[350px] object-cover"
                  src={post.cover ? post.cover : <CiImageOff />}

                  //{post.author ? post.author : "Unknown Author"}
                ></img>
              )}
            </div>

            <div className="mt-6">
              {isEditing ? (
                <textarea
                  className="w-full h-[300px] text-lg font-sans"
                  name="content"
                  value={editedPost.content}
                  onChange={handleChange}
                ></textarea>
              ) : (
                <p className="w-full h-auto text-lg font-sans">
                  {post.content}
                </p>
              )}
            </div>

            {isEditing && (
              <button
                type="submit"
                className="rounded-lg px-6 bg-stone-950 text-white mt-8 p-2 cursor-pointer"
              >
                Save Change
              </button>
            )}
          </form>
          <div className="flex justify-end gap-6">
            <button
              onClick={handleDelete}
              className="rounded-lg px-6 bg-stone-950 text-white mt-8 p-2 cursor-pointer"
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
