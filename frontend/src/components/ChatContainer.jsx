import React, { useEffect, useRef } from "react";
import { useChatStore } from "../stores/chatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../stores/authStore";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageDateTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    suscribeToMessages,
    unSuscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  // Corrected: messageEndRef should be on an empty div at the end of the messages list
  const messageEndRef = useRef(null);

  useEffect(() => {
    // Fetch messages for the selected user
    getMessages(selectedUser._id);
    // Subscribe to new messages via socket
    suscribeToMessages();

    // Cleanup function to unsubscribe when component unmounts or selectedUser changes
    return () => {
      unSuscribeFromMessages();
    };
  }, [
    selectedUser._id,
    getMessages,
    suscribeToMessages,
    unSuscribeFromMessages,
  ]);

  useEffect(() => {
    // Scroll to the latest message whenever messages array updates
    if (messageEndRef.current && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Dependency on messages array to trigger scroll

  // Display skeleton loader while messages are loading
  if (isMessagesLoading)
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        {" "}
        {/* Changed overflow-auto to overflow-hidden to prevent double scrollbars during loading */}
        <ChatHeader />
        <MessageSkeleton />{" "}
        {/* Assuming MessageSkeleton provides a full-height loading state */}
        <MessageInput />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col h-full bg-base-100 rounded-lg overflow-hidden">
      <ChatHeader />

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.length === 0 && !isMessagesLoading ? (
          // Display a message when there are no messages
          <div className="flex flex-col items-center justify-center h-full text-base-content/70">
            <p className="text-lg font-medium">No messages yet!</p>
            <p className="text-sm">
              Start a conversation with {selectedUser.fullName}.
            </p>
          </div>
        ) : (
          messages.map((message) => {
            const isSentByAuthUser = message.senderId === authUser._id;
            const senderProfilePic = isSentByAuthUser
              ? authUser.profilePic || "/avatar.png"
              : selectedUser.profilePic || "/avatar.png";
            const senderName = isSentByAuthUser
              ? "You"
              : selectedUser.fullName.split(" ")[0];

            return (
              <div
                key={message._id}
                className={`chat ${
                  isSentByAuthUser ? "chat-end" : "chat-start"
                } space-y-1`}
              >
                {/* Avatar */}
                <div className="chat-image avatar">
                  <div className="size-7 sm:size-8 rounded-full border border-base-300 overflow-hidden">
                    <img
                      src={senderProfilePic}
                      alt={`${senderName}'s profile`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Name + Time */}
                <div className="chat-header flex items-center gap-1 text-[10px] sm:text-xs text-base-content/70">
                  <span className="font-medium">{senderName}</span>
                  <time className="opacity-50">
                    {formatMessageDateTime(message.createdAt)}
                  </time>
                </div>

                {/* Bubble */}
                <div
                  className={`chat-bubble p-2 sm:p-3 rounded-xl shadow
                    ${isSentByAuthUser? "bg-primary text-primary-content"
                    : "bg-base-200 text-base-content" }
                    max-w-[75%] sm:max-w-[50%]
                  `}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="message"
                      className="w-full max-w-[150px] sm:max-w-[200px] max-h-[200px]
                        rounded-md mb-1 object-contain cursor-pointer bg-base-300 "
                      onClick={() => window.open(message.image, "_blank")}
                    />
                  )}

                  {message.text && (
                    <p className="text-xs sm:text-sm leading-normal whitespace-pre-wrap break-words">
                      {message.text}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messageEndRef}></div>
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
