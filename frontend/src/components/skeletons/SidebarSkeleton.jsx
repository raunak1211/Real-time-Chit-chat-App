import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // Create an array of 8 placeholders
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col">
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <div
            key={idx}
            className="w-full px-4 py-3 flex items-center gap-4 animate-pulse"
          >
            {/* Avatar Skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="bg-base-300 size-12 rounded-full" />
            </div>

            {/* Text Skeletons */}
            <div className="hidden lg:block flex-1 space-y-2">
              <div className="h-4 w-32 bg-base-300 rounded" />
              <div className="h-3 w-16 bg-base-300 rounded" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
