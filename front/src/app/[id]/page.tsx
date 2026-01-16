import { Suspense } from "react";
import ChatView from "@/views/chat/chat-view";
import LoadingSpinner from "@/shared/ui/loading-spinner";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner />
        </div>
      }
    >
      <ChatView />
    </Suspense>
  );
}
