"use client";

import { useOptimisticTopicData } from "@/features/topic/hooks/conversation/use-topic-data";
import { useQuestionTree } from "@/features/topic/hooks/conversation/breadcrumb/use-question-tree";
import { QuestionTreeContext } from "@/features/topic/contexts/conversation/breadcrumb/question-tree-context";
import { TopicChatView } from "@/features/topic/components/conversation/content/topic-chat-view";
import { TopicGraphView } from "@/features/topic/components/conversation/content/topic-graph-view";
import { TopicGlobalDialogs } from "@/features/topic/components/conversation/modals/topic-global-dialogs";
import LoadingSpinner from "@/shared/ui/loading-spinner";

interface OptimisticChatViewProps {
    topicId: string;
}

export function OptimisticChatView({ topicId }: OptimisticChatViewProps) {
    const { data: apiResponse, isLoading } = useOptimisticTopicData(topicId);

    // Initial loading or error state for optimistic flow
    if (isLoading || !apiResponse) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const questionTree = useQuestionTree(apiResponse, topicId, null);
    const { viewMode } = questionTree;

    return (
        <QuestionTreeContext.Provider value={questionTree}>
            {viewMode === "graph" ? <TopicGraphView /> : <TopicChatView />}
            <TopicGlobalDialogs />
        </QuestionTreeContext.Provider>
    );
}
