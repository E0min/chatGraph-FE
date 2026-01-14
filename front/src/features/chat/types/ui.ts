export interface MessageBubbleProps {
    questionText: string;
    answer?: string;
    isUser?: boolean;
    isToggleable?: boolean;
    isAnswerVisible?: boolean;
    isFavorite?: boolean;
    onToggleAnswer?: () => void;
    onEdit?: (newText: string) => void;
    onDelete?: () => void;
    onToggleFavorite?: () => void;
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
