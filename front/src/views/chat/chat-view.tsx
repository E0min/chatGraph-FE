"use client";

import { Suspense } from "react";
import LoadingSpinner from "@/shared/ui/loading-spinner";
import { TopicPageContent } from "@/features/topic/components/conversation/topic-page-content";

export default function ChatView() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner />
        </div>
      }
    >
      <TopicPageContent />
    </Suspense>
  );
}
