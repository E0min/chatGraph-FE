"use client";

import { QuestionTreeProvider } from "./question-tree-context";
import { BreadcrumbFocusViewContent } from "./breadcrumb-focus-view-content";
import { BreadcrumbFocusViewProps } from "@/features/topic/types/ui";

export function BreadcrumbFocusView({
  initialResponse,
  initialQuestionId,
}: BreadcrumbFocusViewProps) {
  const topicId = initialResponse.topic;
  return (
    <QuestionTreeProvider
      initialResponse={initialResponse}
      topicId={topicId}
      initialQuestionId={initialQuestionId}
    >
      <BreadcrumbFocusViewContent initialResponse={initialResponse} />
    </QuestionTreeProvider>
  );
}
