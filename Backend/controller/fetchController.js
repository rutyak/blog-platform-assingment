const Post = require("../model/postSchema");

const fetchController = async (req, res) => {
  try {
    const { id } = req.params;


    if (id) {
      // Find posts by authorId instead of _id
      const posts = await Post.find({ authorId: id });
      
      if (posts.length === 0) {
        return res.status(404).json({ message: "No posts found for this author" });
      }
      
      res.status(200).json(posts);
    } else {
      // If no id is provided, fetch all posts
      const posts = await Post.find();
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = fetchController;
