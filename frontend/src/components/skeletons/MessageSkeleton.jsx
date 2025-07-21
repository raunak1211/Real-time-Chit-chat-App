const MessageSkeleton = () => {
  // 6 placeholder messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"} animate-pulse`}
        >
          {/* Avatar */}
          <div className="chat-image avatar">
            <div className="size-10 rounded-full bg-base-300" />
          </div>

          {/* Header */}
          <div className="chat-header mb-1">
            <div className="h-3 w-20 bg-base-300 rounded" />
          </div>

          {/* Bubble */}
          <div className="chat-bubble bg-base-300 w-max p-4 rounded-xl">
            <div className="h-4 w-48 bg-base-200 rounded mb-2" />
            <div className="h-4 w-36 bg-base-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
