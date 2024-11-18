import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ editMode, post, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
      <p className="text-gray-600 mt-2 text-sm line-clamp-3">{post.content}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {post.tags?.map((tag, index) => (
          <span key={index} className="text-blue-600 text-sm">
            #{tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-4">
        {editMode && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(post)}
              className="bg-teal-500 text-white font-medium px-3 py-2 rounded-lg text-sm hover:bg-teal-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(post)}
              className="bg-red-500 text-white font-medium px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        )}
        <Link
          to={`/posts/${post._id}`}
          className="inline-block bg-gray-200 text-gray-800 font-medium px-3 py-2 rounded-lg text-sm hover:bg-gray-300 transition"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
