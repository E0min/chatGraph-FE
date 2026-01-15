"use client";

import { SidebarMenu } from "@/shared/ui/sidebar";
// import { TopicHistoryItem } from "@/features/topic/api/topics-history"; // Removed unused import
import { TopicListItem } from "./topic-list-item";

import { TopicListProps } from "@/features/sidebar/types/ui";

export function TopicList({
  topics,
  editingTopic,
  editingNewName,
  glassDropdownClass,
  setEditingNewName,
  onStartEdit,
  onConfirmEdit,
  onConfirmDelete,
  onToggleFavorite,
}: TopicListProps) {
  return (
    <SidebarMenu className="gap-1 w-full">
      {topics.map((item) => (
        <TopicListItem
          key={item.topicId}
          topic={item}
          isEditing={editingTopic?.topicId === item.topicId}
          onStartEdit={onStartEdit}
          onConfirmEdit={onConfirmEdit}
          onConfirmDelete={onConfirmDelete}
          onToggleFavorite={onToggleFavorite}
          editingNewName={editingNewName}
          setEditingNewName={setEditingNewName}
          glassDropdownClass={glassDropdownClass}
        />
      ))}
    </SidebarMenu>
  );
}

