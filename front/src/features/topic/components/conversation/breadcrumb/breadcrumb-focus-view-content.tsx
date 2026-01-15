"use client";

import { useQuestionTreeContext } from "@/features/topic/hooks/conversation/breadcrumb/use-question-tree-context";
import { TopicChatView } from "@/features/topic/components/conversation/content/topic-chat-view";
import { TopicGraphView } from "@/features/topic/components/conversation/visualizer/topic-graph-view";
import { TopicGlobalDialogs } from "@/features/topic/components/conversation/modals/topic-global-dialogs";
import { BreadcrumbFocusViewProps } from "@/features/topic/types/ui";

export function BreadcrumbFocusViewContent({ }: BreadcrumbFocusViewProps) {
    const { currentQuestion, viewData, viewMode } = useQuestionTreeContext();

    if (!currentQuestion || !viewData) {
        return (
            <div className="flex items-center justify-center h-screen">
                Loading...
            </div>
        );
    }

    return (
        <>
            {viewMode === "graph" ? <TopicGraphView /> : <TopicChatView />}
            <TopicGlobalDialogs />
        </>
    );
}
