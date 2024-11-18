const Post = require("../model/postSchema");

const updateController = async (req, res) =>{
        const { id } = req.params;

        try {
            const updateUser = await Post.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
            if(!updateUser){
                return res.status(404).json({message: "User not found"});
            }
            res.status(200).json(updateUser);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
}

module.exports = updateController;