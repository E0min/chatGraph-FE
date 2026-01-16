"use client";

import { useParams, useSearchParams } from "next/navigation";
import { StandardChatView } from "@/features/topic/components/conversation/content/standard-chat-view";
import { OptimisticChatView } from "@/features/topic/components/conversation/content/optimistic-chat-view";

export default function ChatView() {
  const params = useParams();
  const searchParams = useSearchParams();

  const topicId = params.id as string;
  const isOptimistic = searchParams.get("optimistic") === "true";

  if (isOptimistic) {
    return <OptimisticChatView topicId={topicId} />;
  }

  return <StandardChatView topicId={topicId} />;
}

