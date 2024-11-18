import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress, TextField, MenuItem } from "@mui/material"; // Material-UI components
import PostCard from "../../components/PostCard";

const Base_url = process.env.REACT_APP_BACKEND_URL;

function Home() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [tags, setTags] = useState([]); // Unique tags for filtering
  const [selectedTag, setSelectedTag] = useState(""); // Selected tag for filtering
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${Base_url}/fetch/post`);
        setPosts(data);
        setFilteredPosts(data);

        // Extract unique tags from posts
        const uniqueTags = Array.from(
          new Set(data.flatMap((post) => post.tags || []))
        );
        setTags(uniqueTags);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Handle tag selection
  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    if (tag === "") {
      setFilteredPosts(posts); // Show all posts if no tag is selected
    } else {
      setFilteredPosts(posts.filter((post) => post.tags.includes(tag)));
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="text-center py-12 text-white rounded-lg shadow-lg mb-8 bg-[linear-gradient(151.71deg,_#29C986_0%,_#2FC8E5_100%)]">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Our Blogging Platform
        </h1>
        <p className="text-lg mb-6">
          Discover, create, and share your thoughts with the world!
        </p>
      </div>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Recent Posts</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-gray-800">Filter by Tag</h3>
              <TextField
                select
                label="Select Tag"
                value={selectedTag}
                onChange={(e) => handleTagChange(e.target.value)}
                variant="outlined"
                className="w-60 text-md"
              >
                <MenuItem value="">All Tags</MenuItem>
                {tags.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    {tag}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center space-x-2">
            <CircularProgress size={30} color="primary" />
            <span>Loading posts...</span>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...filteredPosts].reverse().map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">
            No posts available for the selected tag.
          </p>
        )}
      </section>
    </div>
  );
}

export default Home;
