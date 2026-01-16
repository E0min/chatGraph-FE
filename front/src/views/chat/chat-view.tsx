"use client";

import { useParams, useSearchParams } from "next/navigation";
import LoadingSpinner from "@/shared/ui/loading-spinner";
import { useTopicData } from "@/features/topic/hooks/conversation/use-topic-data";
import { useQuestionTree } from "@/features/topic/hooks/conversation/breadcrumb/use-question-tree";
import { QuestionTreeContext } from "@/features/topic/contexts/conversation/breadcrumb/question-tree-context";
import { TopicChatView } from "@/features/topic/components/conversation/content/topic-chat-view";
import { TopicGraphView } from "@/features/topic/components/conversation/content/topic-graph-view";
import { TopicGlobalDialogs } from "@/features/topic/components/conversation/modals/topic-global-dialogs";

export default function ChatView() {
  const params = useParams();
  const searchParams = useSearchParams();

  const topicId = params.id as string;
  const isOptimistic = searchParams.get("optimistic") === "true";
  const questionIdFromSearch = searchParams.get("question");

  const { data: apiResponse, isLoading } = useTopicData({
    topicId,
    isOptimistic
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!apiResponse) {
    return (
      <div className="flex items-center justify-center h-screen">
        Topic not found.
      </div>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const questionTree = useQuestionTree(apiResponse, topicId, questionIdFromSearch);
  const { currentQuestion, viewData, viewMode } = questionTree;

  if (!currentQuestion || !viewData) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <QuestionTreeContext.Provider value={questionTree}>
      {viewMode === "graph" ? <TopicGraphView /> : <TopicChatView />}
      <TopicGlobalDialogs />
    </QuestionTreeContext.Provider>
  );
}
