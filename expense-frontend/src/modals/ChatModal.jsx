import { useState } from "react";
import { sendMessage } from "../services/aiService.js";

const ChatModal = ({ setShowModal }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    // if message is empty 
    if (!message.trim()) return;

    const userMsg = message;

    // save user's chat
    setChat((prev) => [...prev, { role: "user", text: userMsg }]);
    setMessage("");

    try {
      setLoading(true);

      const data = await sendMessage(userMsg);

      // save AI's chat
      setChat((prev) => [
        ...prev,
        { role: "ai", text: data.reply },
      ]);
    } catch (error) {
      console.log("Chat error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4">

      {/* Overlay */}
      <div
        onClick={() => setShowModal(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Chat Window */}
      <div className="
        relative
        w-full max-w-md
        h-[75vh]
        bg-white/10
        backdrop-blur-xl
        border border-white/20
        rounded-3xl
        shadow-2xl
        flex flex-col
        overflow-hidden
      ">

        {/* Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-white font-semibold">
           Chat Assistant
          </h2>

          <button
            onClick={() => setShowModal(false)}
            className="text-white/70 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">

          {chat.length === 0 && (
            <div className="bg-white/10 p-3 rounded-xl text-white text-sm w-fit">
              Hello 👋 Ask me about your expenses
            </div>
          )}

          {chat.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl text-sm w-fit ${
                msg.role === "user"
                  ? "ml-auto bg-blue-500 text-white"
                  : "bg-white/10 text-white"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="text-white/70 text-sm">
              Thinking...
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="
              flex-1
              p-3
              rounded-xl
              bg-white/10
              text-white
              placeholder-white/50
              outline-none
            "
          />

          <button
            onClick={handleSend}
            className="
              px-4
              rounded-xl
              bg-linear-to-r from-blue-500 to-purple-600
              text-white
            "
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;