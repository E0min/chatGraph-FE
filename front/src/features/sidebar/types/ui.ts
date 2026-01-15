import { QuestionNode } from "@/features/topic/api/questions";
import { TopicHistoryItem } from "@/features/topic/api/topics-history";

// 검색 결과 노드 인터페이스 (토픽 ID 포함)
export interface SearchResultNode extends QuestionNode {
    topicId: string;
}

// TopicList 컴포넌트 Props
export interface TopicListProps {
    topics: TopicHistoryItem[];
    editingTopic: TopicHistoryItem | null;
    editingNewName: string;
    glassDropdownClass: string;
    setEditingNewName: (name: string) => void;
    onStartEdit: (topic: TopicHistoryItem | null) => void;
    onConfirmEdit: () => void;
    onConfirmDelete: (topicId: string) => void;
    onToggleFavorite: (topicId: string) => void;
}

// SearchResultsList 컴포넌트 Props
export interface SearchResultsListProps {
    searchResults: SearchResultNode[];
    itemClass: string;
}
