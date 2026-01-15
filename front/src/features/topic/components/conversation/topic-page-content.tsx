"use client";

import { useParams, useSearchParams } from "next/navigation";
import { BreadcrumbFocusView } from "@/features/topic/components/conversation/breadcrumb/breadcrumb-focus-view";
import LoadingSpinner from "@/shared/ui/loading-spinner";
import { useTopicData } from "@/features/topic/hooks/conversation/use-topic-data";

export function TopicPageContent() {
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

    return (
        <BreadcrumbFocusView
            initialResponse={apiResponse}
            initialQuestionId={questionIdFromSearch}
        />
    );
}
