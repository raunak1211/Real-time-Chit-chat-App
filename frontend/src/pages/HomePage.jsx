import React from 'react'
import { useChatStore } from '../stores/chatStore';
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/ChatContainer';  
import NoChatSelected from '../components/NoChatSelected';

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl h-[calc(100vh-5rem)] bg-base-100 border border-base-300 rounded-2xl shadow-lg overflow-hidden flex">
        <Sidebar />
        {selectedUser ? <ChatContainer /> : <NoChatSelected />}
      </div>
    </div>
  );
};

export default HomePage;
