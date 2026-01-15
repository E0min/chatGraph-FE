
import { ViewData, TopicTreeResponse } from "@/shared/lib/data-transformer";

export interface QuestionCardProps {
    question: ViewData;
    addToPath?: (question: ViewData) => void;
    isModalMode?: boolean;
    defaultAnswerExpanded?: boolean;
}

export interface EnhancedBreadcrumbFocusViewProps {
    initialResponse: TopicTreeResponse;
    initialQuestionId?: string | null;
}

export interface FocusViewHeaderProps {
    currentPath: ViewData[];
    navigateToQuestion: (question: ViewData, index: number) => void;
}

export interface TopicHistoryItem {
    topicId: string;
    topicName: string;
    createdAt: string;
}

export interface TopicSelectorModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentNodeToMove: ViewData | null;
    onNodeSelected: (
        targetTopic: TopicHistoryItem,
        targetParentNode: { id: string; name: string }
    ) => void;
}

export interface ChatInputProps {
    prompt: string;
    setPrompt: (value: string) => void;
    onSubmit: () => void;
    isLoading: boolean;
    disabled?: boolean;
    placeholder?: string;
}

export interface QuestionDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    onJumpToChat: () => void;
    children: React.ReactNode;
}
