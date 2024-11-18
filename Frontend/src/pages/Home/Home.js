import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress, TextField, MenuItem } from "@mui/material"; 
import PostCard from "../../components/PostCard";

const Base_url = process.env.REACT_APP_BACKEND_URL;

function Home() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [tags, setTags] = useState([]); 
  const [selectedTag, setSelectedTag] = useState(""); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${Base_url}/fetch/post`);
        setPosts(data);
        setFilteredPosts(data);

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

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    if (tag === "") {
      setFilteredPosts(posts); 
    } else {
      setFilteredPosts(posts.filter((post) => post.tags.includes(tag)));
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="text-center py-10 text-white rounded-lg shadow-lg mb-8 bg-[linear-gradient(151.71deg,_#29C986_0%,_#2FC8E5_100%)] mobile:py-7 md:py-12">
        <h1 className="text-4xl font-bold mb-4 mobile:text-2xl md:text-3xl">
          Welcome to Our Blogging Platform
        </h1>
        <p className="text-lg mb-6 mobile:text-sm md:text-lg">
          Discover, create, and share your thoughts with the world!
        </p>
      </div>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800 mobile:text-[17px] md:text-xl">Recent Posts</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-gray-800 mobile:text-[17px] md:text-xl">Filter by Tag</h3>
              <TextField
                select
                label="Select Tag"
                value={selectedTag}
                onChange={(e) => handleTagChange(e.target.value)}
                variant="outlined"
                className="w-60 text-md mobile:w-40 md:w-60"
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
