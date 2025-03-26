import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

function NewPost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    content: "",
    cover: "",
  });

  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/blogposts",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Post successfully created:", response.data);
      // You can show a success message to the user

      // Clear the form and redirect the user
      setFormData({
        title: "",
        date: "",
        description: "",
        cover: "",
      });

      navigate("/");
    } catch (error) {
      if (error.response) {
        // Handle server errors
        console.error("Error creating post:", error.response.data);
        // You can display an error message to the user based on error.response.data
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response from server:", error.request);
        // You can display a general connection error message
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error sending request:", error.message);
        // You can display a general error message
      }
      // Handle network errors or other errors
      // You can display an error message to the user
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Create New Post
      </h1>
      <div>
        <div className="flex flex-col items-center justify-center space-x-4 text-center gap-4">
          {/* {imageUrl && (
              <img
                src={imageUrl}
                alt="Event"
                className="w-1/4 sm:w-1/2 ml-2 h-full object-cover"
              />
            )} */}
        </div>
        <form onSubmit={handleSubmit} className="w-1/2 sm:w-full space-y-4">
          <div className="flex flex-col items-center">
            <label htmlFor="name" className="text-sm font-medium text-gray-200">
              Title
            </label>
            <input
              className="w-full h-10 rounded-md border-2 border-gray-300 p-2"
              type="text"
              id="name"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title"
            />
          </div>
          <div className="flex flex-col items-center">
            <label
              htmlFor="cover"
              className="text-sm font-medium text-gray-200"
            >
              Cover
            </label>
            <input
              className="w-full h-10 rounded-md border-2 border-gray-300 p-2"
              type="text"
              id="cover"
              name="cover"
              value={formData.cover}
              onChange={handleChange}
              placeholder="Enter post cover"
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="date" className="text-sm font-medium text-gray-200">
              Date
            </label>
            <input
              className="w-full h-10 rounded-md border-2 border-gray-300 p-2"
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col items-center">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-200"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full h-32 rounded-md border-2 border-gray-300 p-1"
              placeholder="Enter event description"
            ></textarea>
          </div>
          <button
            className="w-full py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
            type="submit"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPost;
