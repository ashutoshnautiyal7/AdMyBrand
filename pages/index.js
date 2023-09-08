import React, { useState, useEffect } from "react";

import FormControl from "@/components /FormControl";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserData, setSelectedUserData] = useState("");
  const [selectedUserError, setSelectedUserError] = useState("");

  // data postinng
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postError, setPostError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleUserChange = (value) => {
    setSelectedUser(value);
    setSelectedUserError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedUser) {
      setSelectedUserError("Please select a user");
      return;
    }

    fetch(`https://jsonplaceholder.typicode.com/users/${selectedUser}`)
      .then((response) => response.json())
      .then((data) => setSelectedUserData(data))
      .then(console.log("the selected user data is ", selectedUserData))
      .catch((error) =>
        console.error("Error fetching selected user data:", error)
      );
  };

  const handleSubmitPostForm = (e) => {
    e.preventDefault();

    // Validate the post title and body
    if (!postTitle || !postBody) {
      setPostError("Please enter both title and body");
      return;
    }

    // Create a new post
    const newPost = {
      title: postTitle,
      body: postBody,
      userId: selectedUser,
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(" some eror occured ");
          throw new Error("Failed to create a new post");
        }
        return response.json();
      })
      .then((data) => {
        setPostTitle("");
        setPostBody("");
        setPostError("");
        console.log("New Post Created:", data);
      })
      .catch((error) => {
        setPostError("Failed to create a new post. Please try again later.");
        console.error("Error creating a new post:", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl
          label="Select a User"
          type="select"
          options={users.map((user) => ({ value: user.id, label: user.name }))}
          value={selectedUser}
          onChange={handleUserChange}
          errorMessage={selectedUserError}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
          Submit
        </button>
      </form>

      {/* for displaying the userDAta  */}

      <div>{<h1>{selectedUserData.id}</h1>}</div>
      <div>{<h1>{selectedUserData.name}</h1>}</div>
      <div>{<h1>{selectedUserData.username}</h1>}</div>
      <div>{<h1>{selectedUserData.email}</h1>}</div>
      <div> {<h1>{selectedUserData.phone}</h1>}</div>
      <div> {<h1>{selectedUserData.website}</h1>}</div>

      {/* Post Form */}
      <form onSubmit={handleSubmitPostForm}>
        <div className="my-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Post Title
          </label>
          <input
            type="text"
            className={`border rounded w-full py-2 px-3 ${
              postError ? "border-red-500" : "border-gray-300"
            }`}
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Post Body
          </label>
          <textarea
            className={`border rounded w-full py-2 px-3 ${
              postError ? "border-red-500" : "border-gray-300"
            }`}
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          />
          {postError && (
            <p className="text-red-500 text-xs mt-1">{postError}</p>
          )}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Create Post
        </button>
      </form>
    </div>
  );
}
