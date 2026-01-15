"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/shared/ui/alert-dialog";
import { TopicSelectorModal } from "./topic-selector-modal";
import { ShareEmailModal } from "@/features/share/components/share-email-modal";
import { useQuestionTreeContext } from "@/features/topic/hooks/conversation/breadcrumb/use-question-tree-context";

export function TopicGlobalDialogs() {
    const {
        reparentRequest,
        cancelModifyMode,
        confirmReparenting,
        splitRequest,
        confirmSplitTopic,
        isTopicSelectorOpen,
        setIsTopicSelectorOpen,
        nodeToMove,
        setMoveTopicRequest,
        moveToTopicRequest,
        confirmMoveToOtherTopic,
        shareRequest,
        setShareRequest,
        confirmShare,
    } = useQuestionTreeContext();

    const glassmorphismAlertStyle =
        "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 shadow-2xl";

    return (
        <>
            <ShareEmailModal
                isOpen={!!shareRequest}
                onClose={() => setShareRequest(null)}
                onConfirm={(email) => confirmShare(email)}
            />

            {/* 1. 노드 이동 확인 Alert */}
            <AlertDialog
                open={!!reparentRequest}
                onOpenChange={(open) => {
                    if (!open) {
                        cancelModifyMode();
                    }
                }}
            >
                <AlertDialogContent className={glassmorphismAlertStyle}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>노드 이동 확인</AlertDialogTitle>
                        <AlertDialogDescription>
                            <b>{reparentRequest?.movedNode.questionText}</b> 노드를
                            <br />
                            <b>{reparentRequest?.newParentNode.questionText}</b>의 하위 노드로
                            이동하시겠습니까?
                            <br />
                            <span className="text-xs text-muted-foreground">
                                (이 노드에 연결된 모든 하위 줄기가 함께 이동합니다.)
                            </span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={cancelModifyMode}>
                            취소
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={confirmReparenting}>
                            이동
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* 2. 새 토픽으로 분리 Alert */}
            <AlertDialog
                open={!!splitRequest}
                onOpenChange={(open) => {
                    if (!open) cancelModifyMode();
                }}
            >
                <AlertDialogContent className={glassmorphismAlertStyle}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>새 토픽으로 분리</AlertDialogTitle>
                        <AlertDialogDescription>
                            <b>{splitRequest?.nodeToSplit.questionText}</b> 질문과
                            <br />그 하위 줄기 전체를 <b>새로운 토픽</b>으로 분리하시겠습니까?
                            <br />
                            <span className="text-xs text-muted-foreground">
                                (현재 토픽에서는 해당 줄기가 삭제되고, 새 토픽 페이지로
                                이동합니다.)
                            </span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={cancelModifyMode}>
                            취소
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={confirmSplitTopic}>
                            분리하기
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <TopicSelectorModal
                isOpen={isTopicSelectorOpen}
                onClose={cancelModifyMode}
                currentNodeToMove={nodeToMove}
                onNodeSelected={(targetTopic, targetParentNode) => {
                    setIsTopicSelectorOpen(false);
                    setMoveTopicRequest({
                        movedNode: nodeToMove!,
                        targetTopic: {
                            id: targetTopic.topicId,
                            name: targetTopic.topicName,
                        },
                        targetParentId: targetParentNode.id,
                        targetParentNode: {
                            id: targetParentNode.id,
                            name: targetParentNode.name,
                        },
                    });
                }}
            />

            {/* 3. 다른 토픽으로 이동 확인 Alert */}
            <AlertDialog
                open={!!moveToTopicRequest}
                onOpenChange={(open) => {
                    if (!open) setMoveTopicRequest(null);
                }}
            >
                <AlertDialogContent className={glassmorphismAlertStyle}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>다른 토픽으로 이동 확인</AlertDialogTitle>
                        <AlertDialogDescription>
                            <b>{moveToTopicRequest?.movedNode.questionText}</b> 질문 줄기를
                            <br />
                            <b>{moveToTopicRequest?.targetParentNode.name}</b> 하위로
                            이동하시겠습니까?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setMoveTopicRequest(null)}>
                            취소
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={confirmMoveToOtherTopic}>
                            이동
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
