import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Chip, Box } from "@mui/material";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Base_url = process.env.REACT_APP_BACKEND_URL;

function BlogForm({
  isEditMode = false,
  existingPost = {},
  onClose,
  onSuccess,
}) {
  const [title, setTitle] = useState(existingPost.title || "");
  const [content, setContent] = useState(existingPost.content || "");
  const [tags, setTags] = useState(existingPost.tags || []);
  const [tagInput, setTagInput] = useState("");
  const { userData } = useAuth();

  useEffect(() => {
    if (isEditMode && existingPost) {
      setTitle(existingPost.title);
      setContent(existingPost.content);
      setTags(existingPost.tags || []);
    }
  }, [isEditMode, existingPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData || !userData._id) {
      toast.error("You need to be logged in to proceed.");
      return;
    }

    const obj = { title, content, tags, authorId: String(userData._id) };

    try {
      const url = isEditMode
        ? `${Base_url}/update/post/${existingPost._id}`
        : `${Base_url}/create/post`;
      const method = isEditMode ? axios.put : axios.post;

      const res = await method(url, obj);

      if (res.status === (isEditMode ? 200 : 201)) {
        if(!toast.isActive("create blog")){
          toast.success(`Post ${isEditMode ? "updated" : "created"} successfully!`,{toastId:"create blog"});
        }
        onSuccess();
        if (onClose) onClose();
      }
    } catch (error) {
      console.error("Error submitting post:", error.response || error.message);
      toast.error(`Failed to ${isEditMode ? "update" : "create"} post.`);
    }
  };

  const handleAddTag = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <div className="flex justify-center items-center min-h-[87.9vh]">
      <div className="bg-white w-[512px] shadow-md rounded-lg p-6 max-w-lg mt-[-50px]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isEditMode ? "Edit Blog Post" : "Create a New Blog Post"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextField
              label="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
              variant="outlined"
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
              required
              multiline
              rows={4}
              variant="outlined"
            />
          </div>
          <div className="mb-4">
            <TextField
              label="Add Tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              fullWidth
              variant="outlined"
              placeholder="Press Enter or ',' to add tags"
            />
            <Box className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => handleDeleteTag(tag)}
                  color="primary"
                />
              ))}
            </Box>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="contained"
              onClick={onClose}
              className="bg-gray-200 text-gray-800"
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {isEditMode ? "Save Changes" : "Create Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BlogForm;
