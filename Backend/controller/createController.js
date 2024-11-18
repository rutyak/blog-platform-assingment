const Post = require("../model/postSchema");

const createController = async (req, res) => {
  const { title, content, tags, authorId } = req.body;

  console.log("tags: ",tags);

  try {
    const newPost = await Post.create({ title, content, tags, authorId });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).json({ message: "Failed to create post." });
  }
};

module.exports = createController;
