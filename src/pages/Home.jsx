import React, { useEffect, useState } from "react";

function Home() {
  const [posts, setPosts] = useState([]);

  const [editFormData, setEditFormData] = useState({
    title: "",
    content: "",
    cover: "",
    date: "",
    author: "",
  });

  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5173/blogposts");
        const data = await res.json();
        setPosts(data.results || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      }
    };
    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    setEditingPost(post.id);
    setEditFormData({
      title: post.title,
      content: post.content,
      cover: post.cover,
      data: post.data,
      description: post.description,
      author: post.author,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3000/blogposts/${editingPost}`,
        {
          method: "PUT",
          body: JSON.stringify(editFormData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const updatedPost = await res.json();
        setPosts(
          posts.map((post) => (post.id === editingPost ? updatedPost : post))
        );
        setEditingPost(null);
      }
    } catch (error) {
      console.error("Error updating ep:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5173/blogposts/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPosts(posts.filter((post) => post.id !== id));
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((event, index) => (
          <div key={index} className="card bg-base-100 shadow-xl p-4">
            {editingPost === event.id ? (
              <form onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditChange}
                />
                <input
                  type="text"
                  name="content"
                  value={editFormData.content}
                  onChange={handleEditChange}
                />
                <input
                  type="url"
                  name="cover"
                  value={editFormData.cover}
                  onChange={handleEditChange}
                />
                <input
                  type="date"
                  name="date"
                  value={editFormData.date}
                  onChange={handleEditChange}
                />

                <input
                  type="text"
                  name="author"
                  value={editFormData.author}
                  onChange={handleEditChange}
                />
                <button type="submit">Save</button>
              </form>
            ) : (
              <>
                <h2 className="text-xl font-bold">{event.title}</h2>
                <p>{event.date}</p>
                <p>{event.location}</p>

                <div className="flex justify-between mt-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(event)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
