import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [editPost, setEditPost] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const detailPost = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/blogposts/${id}`);
        console.log(res.data[0]);
        setPost(res.data[0]);
        // const res = await fetch(`http://localhost:3000/blogposts/${id}`, {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });
        // console.log(res);

        // const data = await res.json();
        // console.log(data[0]);
        // setPost(data[0]);
        // if (data) {
        //   setPost(data[0]);
        // } else {
        //   console.error("No Data");
        //   setPost({});
        // }
      } catch (error) {
        console.log("No Data", error);

        // setPost({});
      } finally {
        setLoading(false);
      }
    };
    detailPost();
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Do you really want to delete this post?")) {
      try {
        // const res = await axios.delete(
        //   `http://localhost:3000/blogposts/${id}`,
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   }
        // );
        const res = await fetch(`http://localhost:3000/blogposts/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          toast.success("Blog deleted!");
          // setTimeout(() => {
          //   navigate("*");
          // }, 2500);
        }
      } catch (error) {
        // console.log(error);
        toast.error("this didn't work");
      }
    } else {
      return;
    }
  };

  return (
    <>
      <Toaster />
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
    </>
  );
}

export default BlogPost;
