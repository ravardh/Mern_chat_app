import { useState, useEffect } from "react";
import axios from "../lib/axios";
import dummy from "../assests/dummyPP.png";


const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [contacts, setContacts] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    profilePic: "",
  });

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    try {
      const newMessage = {
        senderID: user._id,
        receiverID: selectedChat._id,
        text: input,
      };

      const response = await axios.post(
        "/api/messages/send/" + selectedChat._id,
        newMessage
      );
      setMessages((prev) => [...prev, response.data]);
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const loadData = async () => {
    try {
      const response = await axios.get("/api/auth/check");
      setUser({
        _id: response.data._id,
        name: response.data.fullName,
        email: response.data.email,
        profilePic: response.data.profilePic || dummy,
      });
      
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "An error occurred while fetching user data."
      );
    }
  };

  const getContacts = async () => {
    try {
      const response = await axios.get("/api/messages/users");
      setContacts(response.data);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "An error occurred while fetching Contacts data."
      );
    }
  };

  const getMessages = async (contact) => {
    try {
      setSelectedChat(contact);
      const response = await axios.get(`/api/messages/${contact._id}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedChat) {
        getMessages(selectedChat);
      }
    }, 2000);
  
    return () => clearInterval(interval);
  }, [selectedChat]); 

  useEffect(() => {
    loadData();
    getContacts();
  }, []);


  return (
    <div className="h-[80vh] flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/3 bg-white shadow-md p-4">
        <div className="flex items-center space-x-3 mb-4 border-b pb-2">
          <img
            src={user.profilePic}
            className="w-10 h-10 rounded-full"
            alt="Profile"
          />
          <h2 className="text-lg font-semibold">{user.name}</h2>
        </div>
        <h3 className="text-md font-semibold mb-2">Contacts</h3>
        <div>
          {contacts.map((contact) => (
            <div
              key={contact._id}
              onClick={() => getMessages(contact)}
              className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer hover:bg-gray-200 ${
                selectedChat?._id === contact._id ? "bg-gray-300" : ""
              }`}
            >
              <img
                src={contact.profilePic || dummy}
                className="w-8 h-8 rounded-full"
                alt={contact.fullName}
              />
              <p>{contact.fullName}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="w-2/3 flex flex-col bg-white shadow-md p-4">
        {selectedChat ? (
          <>
            <div className="flex items-center space-x-3 border-b pb-2 mb-4">
              <img
                src={selectedChat.profilePic || dummy}
                className="w-10 h-10 rounded-full"
                alt={selectedChat.fullName}
              />
              <h2 className="text-lg font-semibold">{selectedChat.fullName}</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-2 h-80 border rounded-md bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-lg max-w-xs ${
                    msg.senderID === user._id
                      ? "bg-blue-600 text-white ml-auto self-end"
                      : "bg-gray-200 text-black self-start"
                  } flex flex-col`}
                  style={{
                    alignSelf:
                      msg.senderID === user._id ? "flex-end" : "flex-start",
                  }}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Sent"
                      className="mb-1 rounded-md max-w-full"
                    />
                  )}
                  <span>{msg.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center">
              <input
                type="text"
                className="flex-1 p-2 border rounded-md"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a contact to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
