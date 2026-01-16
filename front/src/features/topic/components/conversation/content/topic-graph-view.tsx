"use client";

import { InteractiveD3Graph } from "@/features/topic/components/visualizer";
import { FocusViewHeader } from "@/features/topic/components/conversation/breadcrumb/focus-view-header";
import { QuestionCard } from "@/features/topic/components/conversation/content/question-card";
import QuestionDetailModal from "@/features/topic/components/conversation/modals/question-detail-modal";
import { useQuestionTreeContext } from "@/features/topic/contexts/conversation/breadcrumb/question-tree-context";

export function TopicGraphView() {
    const {
        currentPath,
        navigateToQuestion,
        viewData,
        handleGraphNodeClick,
        selectedNode,
        setSelectedNode,
        setFocusedNodeId,
        setViewMode,
    } = useQuestionTreeContext();

    return (
        <div className="h-screen flex flex-col bg-white">
            <FocusViewHeader
                currentPath={currentPath}
                navigateToQuestion={navigateToQuestion}
            />
            <div className="flex-1 p-4">
                <InteractiveD3Graph
                    data={viewData!} // main index checks viewData existence before rendering
                    onNodeClick={handleGraphNodeClick}
                />
                <QuestionDetailModal
                    isOpen={!!selectedNode}
                    onClose={() => setSelectedNode(null)}
                    onJumpToChat={() => {
                        setFocusedNodeId(selectedNode?.id || null);
                        setSelectedNode(null);
                        setViewMode("chat");
                    }}
                >
                    {selectedNode && (
                        <QuestionCard
                            question={selectedNode}
                            isModalMode={true}
                            defaultAnswerExpanded={true}
                        />
                    )}
                </QuestionDetailModal>
            </div>
        </div>
    );
}
