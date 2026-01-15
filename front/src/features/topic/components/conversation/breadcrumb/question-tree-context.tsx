import React, { createContext } from "react";
import { useQuestionTree } from "@/features/topic/hooks/conversation/breadcrumb/use-question-tree";
import { TopicTreeResponse } from "@/shared/lib/data-transformer";

// useQuestionTree 훅의 반환 타입 정의
type UseQuestionTreeReturn = ReturnType<typeof useQuestionTree>;

// Context 생성
export const QuestionTreeContext = createContext<UseQuestionTreeReturn | undefined>(
  undefined
);

// Provider 컴포넌트
export const QuestionTreeProvider: React.FC<{
  children: React.ReactNode;
  initialResponse: TopicTreeResponse;
  topicId: string;
  initialQuestionId?: string | null;
}> = ({ children, initialResponse, topicId, initialQuestionId }) => {
  const questionTree = useQuestionTree(initialResponse, topicId, initialQuestionId);
  return (
    <QuestionTreeContext.Provider value={questionTree}>
      {children}
    </QuestionTreeContext.Provider>
  );
};
