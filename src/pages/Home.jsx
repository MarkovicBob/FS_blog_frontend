import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/blogposts");
        setPosts(res.data);
        // console.log(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // console.log(posts);

  return (
    <>
      <h1 className="text-center text-4xl font-bold text-gray-800 dark:text-white underline decoration-white-500 decoration-4 tracking-wide">
        Blog Posts
      </h1>{" "}
      <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loading ? (
          <FadeLoader />
        ) : (
          posts.map((post) => {
            return (
              <Link key={post.id} to={`/blogposts/${post.id}`}>
                <div
                  key={post.id}
                  className="border p-4 shadow-lg rounded-lg flex flex-col items-center justify-between hover:scale-105 transition-transform duration-100 min-h-[300px]"
                >
                  <h2 className="text-xl font-bold uppercase text-center">
                    {post.title}
                  </h2>
                  <img
                    src={post.cover}
                    alt="post_image"
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <p className="text-gray-500">{post.date.slice(0, 10)}</p>
                  <p className="line-clamp-3 text-center px-2">
                    {post.content.length > 50
                      ? `${post.content.substring(
                          0,
                          50
                        )}... click for more details`
                      : post.content}
                  </p>
                  <p className="text-sm text-gray-600 font-semibold">
                    {post.author}
                  </p>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </>
  );
}

export default Home;
