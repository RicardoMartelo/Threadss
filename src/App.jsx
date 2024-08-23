// src/App.js
import React, { useState } from "react";
import Navbar from "./components/navbar";
import Thread from "./components/Thread";

const App = () => {
  const [threads, setThreads] = useState([
    {
      title: "Discussion Thread",
      messages: [
        {
          username: "Simon Holland",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          content:
            'It took 3 employees to help me complete "self-checkout" today.',
          file: null,
          liked: false,
          comments: [],
        },
        {
          username: "thevkohilfan",
          avatar: "https://randomuser.me/api/portraits/men/33.jpg",
          content: "#viratkohli #cricket #india #love",
          file: null,
          liked: false,
          comments: [],
        },
      ],
    },
  ]);

  const handleAddMessage = (newMessage) => {
    const updatedThreads = [...threads];
    updatedThreads[0].messages.push(newMessage);
    setThreads(updatedThreads);
  };

  const handleDeleteMessage = (threadIndex, messageIndex) => {
    const updatedThreads = [...threads];
    updatedThreads[threadIndex].messages.splice(messageIndex, 1);
    setThreads(updatedThreads);
  };

  const handleLike = (threadIndex, messageIndex) => {
    const updatedThreads = [...threads];
    updatedThreads[threadIndex].messages[messageIndex].liked =
      !updatedThreads[threadIndex].messages[messageIndex].liked;
    setThreads(updatedThreads);
  };

  const handleAddComment = (threadIndex, messageIndex, comment) => {
    const updatedThreads = [...threads];
    updatedThreads[threadIndex].messages[messageIndex].comments.push(comment);
    setThreads(updatedThreads);
  };

  const handleShare = (threadIndex, messageIndex) => {
    console.log(`Compartir el mensaje ${messageIndex} del hilo ${threadIndex}`);
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Threads */}
      <div className="container mx-auto p-4">
        {threads.map((thread, index) => (
          <Thread
            key={index}
            title={thread.title}
            messages={thread.messages}
            onAddMessage={handleAddMessage}
            onDeleteMessage={(messageIndex) =>
              handleDeleteMessage(index, messageIndex)
            }
            onLike={(messageIndex) => handleLike(index, messageIndex)}
            onAddComment={(messageIndex, comment) =>
              handleAddComment(index, messageIndex, comment)
            }
            onShare={(messageIndex) => handleShare(index, messageIndex)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
