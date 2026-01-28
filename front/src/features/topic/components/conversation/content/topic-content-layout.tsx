"use client";

import { useQuestionTreeContext } from "@/features/topic/contexts/conversation/breadcrumb/question-tree-context";
import { TopicChatView } from "@/features/topic/components/conversation/content/topic-chat-view";
import { TopicGraphView } from "@/features/topic/components/conversation/content/topic-graph-view";
import { TopicGlobalDialogs } from "@/features/topic/components/conversation/modals/topic-global-dialogs";

export function TopicContentLayout() {
    const { viewMode } = useQuestionTreeContext();

    return (
        <>
            {viewMode === "graph" ? <TopicGraphView /> : <TopicChatView />}
            <TopicGlobalDialogs />
        </>
    );
}
