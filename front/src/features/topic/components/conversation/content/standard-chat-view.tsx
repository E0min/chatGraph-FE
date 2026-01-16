"use client";

import { useTopicSuspenseQuery } from "@/features/topic/hooks/conversation/use-topic-data";
import { useQuestionTree } from "@/features/topic/hooks/conversation/breadcrumb/use-question-tree";
import { QuestionTreeContext } from "@/features/topic/contexts/conversation/breadcrumb/question-tree-context";
import { TopicChatView } from "@/features/topic/components/conversation/content/topic-chat-view";
import { TopicGraphView } from "@/features/topic/components/conversation/content/topic-graph-view";
import { TopicGlobalDialogs } from "@/features/topic/components/conversation/modals/topic-global-dialogs";
import { useSearchParams } from "next/navigation";

interface StandardChatViewProps {
    topicId: string;
}

export function StandardChatView({ topicId }: StandardChatViewProps) {
    const searchParams = useSearchParams();
    const questionIdFromSearch = searchParams.get("question");

    // Suspense-enabled query: will throw promise if data is missing, triggering fallback
    const { data: apiResponse } = useTopicSuspenseQuery(topicId);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const questionTree = useQuestionTree(apiResponse, topicId, questionIdFromSearch);
    const { viewMode } = questionTree;

    return (
        <QuestionTreeContext.Provider value={questionTree}>
            {viewMode === "graph" ? <TopicGraphView /> : <TopicChatView />}
            <TopicGlobalDialogs />
        </QuestionTreeContext.Provider>
    );
}
