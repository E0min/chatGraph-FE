"use client";

import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/shared/ui/sidebar";

import { SearchResultsListProps } from "@/features/sidebar/types/ui";

export function SearchResultsList({
  searchResults,
  itemClass,
}: SearchResultsListProps) {
  return (
    <SidebarMenu className="gap-1">
      {searchResults.map((item) => (
        <SidebarMenuItem key={item.questionId}>
          <SidebarMenuButton asChild className={itemClass}>
            <Link href={`/${item.topicId}?question=${item.questionId}`}>
              <span className="truncate text-sm">{item.questionText}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

