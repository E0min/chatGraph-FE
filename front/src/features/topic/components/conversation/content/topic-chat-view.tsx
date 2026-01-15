"use client";

import { useEffect, useState } from "react";
import { Separator } from "@/shared/ui/separator";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { MessageBubble } from "@/shared/ui/message-bubble";
import { FocusViewHeader } from "@/features/topic/components/conversation/breadcrumb/focus-view-header";
import { SubQuestionList } from "./sub-question-list";
import { NewQuestionForm } from "../input/new-question-form";
import { findPathToNode, cn } from "@/shared/lib/utils";
import { useSidebar } from "@/shared/ui/sidebar";
import { useQuestionTreeContext } from "@/features/topic/hooks/conversation/breadcrumb/use-question-tree-context";

export function TopicChatView() {
    const { state, isMobile } = useSidebar();
    const {
        viewData,
        currentPath,
        setCurrentPath,
        viewMode,
        scrollAreaRef,
        currentQuestion,
        handleSaveInPlaceEdit,
        handleDeleteQuestion,
        focusedNodeId,
        setFocusedNodeId,
        toggleFavoriteQuestion,
        addToPath,
        navigateToQuestion,
    } = useQuestionTreeContext();

    const [isMainAnswerVisible, setIsMainAnswerVisible] = useState(true);

    // Focus Logic
    useEffect(() => {
        if (viewMode === "chat" && focusedNodeId) {
            if (viewData && focusedNodeId) {
                const path = findPathToNode(viewData, focusedNodeId);
                if (path) {
                    setCurrentPath(path);
                }
            }
            setFocusedNodeId(null);
        }
    }, [viewMode, focusedNodeId, viewData, setCurrentPath, setFocusedNodeId]);

    if (!currentQuestion) return null;

    return (
        <div className="h-screen flex flex-col bg-white">
            {/* 1. 헤더 영역 (Sticky & Z-index 적용) */}
            <div className="sticky top-0 z-20">
                <FocusViewHeader
                    currentPath={currentPath}
                    navigateToQuestion={navigateToQuestion}
                />
            </div>

            {/* 2. 스크롤 영역: 메시지 버블을 이 안으로 이동 */}
            <div className="relative flex-1 pb-[88px]">
                <ScrollArea className="absolute inset-0" ref={scrollAreaRef}>
                    <div className="max-w-4xl mx-auto p-4">
                        {currentPath.length > 1 && (
                            <div className="mb-6">
                                <MessageBubble
                                    questionText={currentQuestion.questionText}
                                    answer={currentQuestion.answerText}
                                    isUser={true}
                                    isToggleable={true}
                                    isAnswerVisible={isMainAnswerVisible}
                                    isFavorite={currentQuestion.favorite}
                                    onToggleAnswer={() =>
                                        setIsMainAnswerVisible(!isMainAnswerVisible)
                                    }
                                    onEdit={(newText) =>
                                        handleSaveInPlaceEdit(currentQuestion.id, newText)
                                    }
                                    onDelete={() => handleDeleteQuestion(currentQuestion.id)}
                                    onToggleFavorite={() =>
                                        toggleFavoriteQuestion(currentQuestion.id)
                                    }
                                />
                                <Separator className="my-4" />
                            </div>
                        )}
                        {/* 하위 질문 리스트 */}
                        {currentQuestion.children.length > 0 && (
                            <SubQuestionList
                                key={currentQuestion.id}
                                questions={currentQuestion.children}
                                addToPath={addToPath}
                                onSave={handleSaveInPlaceEdit}
                                showTitle={currentPath.length > 1}
                            />
                        )}
                    </div>
                </ScrollArea>
            </div>

            {/* 입력 폼 영역 */}
            <div
                className={cn(
                    "fixed bottom-0 right-0 z-30",
                    isMobile
                        ? "left-0"
                        : state === "expanded"
                            ? "left-[16rem]"
                            : "left-[3rem]"
                )}
            >
                <NewQuestionForm />
            </div>
        </div>
    );
}
