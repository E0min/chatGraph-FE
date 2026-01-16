"use client";

import { QuestionTreeContext } from "@/features/topic/hooks/conversation/breadcrumb/use-question-tree-context";
import { BreadcrumbFocusViewProps } from "@/features/topic/types/ui";
import { useQuestionTree } from "@/features/topic/hooks/conversation/breadcrumb/use-question-tree";
import { TopicChatView } from "@/features/topic/components/conversation/content/topic-chat-view";
import { TopicGraphView } from "@/features/topic/components/conversation/visualizer/topic-graph-view";
import { TopicGlobalDialogs } from "@/features/topic/components/conversation/modals/topic-global-dialogs";

export function BreadcrumbFocusView({
  initialResponse,
  initialQuestionId,
}: BreadcrumbFocusViewProps) {
  const topicId = initialResponse.topic;
  const questionTree = useQuestionTree(initialResponse, topicId, initialQuestionId);
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
