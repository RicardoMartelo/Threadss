// src/components/Thread.js
import React, { useState } from "react";

const Thread = ({
  title,
  messages,
  onAddMessage,
  onDeleteMessage,
  onLike,
  onAddComment,
  onShare,
}) => {
  const [newMessageContent, setNewMessageContent] = useState("");
  const [newComment, setNewComment] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleAddMessage = () => {
    const newMessage = {
      username: "New User",
      avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
      content: newMessageContent,
      file: selectedFile,
      liked: false,
      comments: [],
    };
    onAddMessage(newMessage);
    setNewMessageContent("");
    setSelectedFile(null);
  };

  const handleAddComment = (index) => {
    onAddComment(index, newComment);
    setNewComment("");
  };

  return (
    <div className="bg-white shadow-md rounded-lg mb-4 p-4">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className="flex flex-col items-start space-y-2 p-4 border-b last:border-none"
          >
            <div className="flex items-center space-x-4">
              <img
                src={message.avatar}
                alt={message.username}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">{message.username}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onLike(index)}
                      className="text-blue-500"
                    >
                      {message.liked ? "❤️" : "♡"}
                    </button>
                    <button
                      onClick={() => handleAddComment(index)}
                      className="text-gray-500"
                    >
                      💬
                    </button>
                    <button
                      onClick={() => onShare(index)}
                      className="text-green-500"
                    >
                      🔄
                    </button>
                    <button
                      onClick={() => onDeleteMessage(index)}
                      className="text-red-500"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <p>{message.content}</p>
                {message.file &&
                  (message.file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(message.file)}
                      alt="User upload"
                      className="mt-2 max-h-64"
                    />
                  ) : (
                    <video
                      controls
                      className="mt-2 max-h-64"
                      src={URL.createObjectURL(message.file)}
                    />
                  ))}
                {/* Display Comments */}
                <div className="mt-4">
                  {message.comments.map((comment, cIndex) => (
                    <div key={cIndex} className="border-t pt-2">
                      <strong>Comment:</strong> {comment}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Comment Input */}
            <div className="w-full mt-2">
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                className="mt-2 bg-blue-500 text-white p-2 rounded"
                onClick={() => handleAddComment(index)}
              >
                Add Comment
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Message Input */}
      <div className="mt-4">
        <input
          type="text"
          className="w-full p-2 border rounded mb-2"
          placeholder="Write a message..."
          value={newMessageContent}
          onChange={(e) => setNewMessageContent(e.target.value)}
        />
        <input
          type="file"
          className="mb-2"
          onChange={handleFileChange}
          accept="image/*,video/*"
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handleAddMessage}
        >
          Añadir Mensaje
        </button>
      </div>
    </div>
  );
};

export default Thread;
