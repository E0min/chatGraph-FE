import { useQuery, useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getTopicById, askQuestion, TopicTreeResponse, TopicNode } from "@/features/topic/api/questions";
import { useTopicStore } from "@/shared/lib/topic-store";
import { toast } from "sonner";

// 1. Standard Suspense Query Hook
export function useTopicSuspenseQuery(topicId: string) {
    const { prefetchedResponse, setPrefetchedResponse } = useTopicStore();

    // useSuspenseQuery 사용 (데이터가 없으면 로딩 서스펜드 발생)
    const query = useSuspenseQuery({
        queryKey: ["topic", topicId],
        queryFn: () => getTopicById(topicId),
        // 스토어에 있는 프리패치 데이터를 초기 데이터로 사용
        initialData: () => {
            if (prefetchedResponse?.topic === topicId) {
                return prefetchedResponse;
            }
            return undefined;
        },
        initialDataUpdatedAt: () => {
            return prefetchedResponse?.topic === topicId ? Date.now() : 0
        },
    });

    // 스토어 데이터 사용 후 정리
    useEffect(() => {
        if (prefetchedResponse?.topic === topicId) {
            setPrefetchedResponse(null);
        }
    }, [topicId, prefetchedResponse, setPrefetchedResponse]);

    return query;
}

// 2. Optimistic Data Hook (Fallback for newly created topics)
export function useOptimisticTopicData(topicId: string) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { addTopic, setPrefetchedResponse } = useTopicStore();
    const [optimisticStepData, setOptimisticStepData] = useState<TopicTreeResponse | null>(null);
    const apiCallStarted = useRef(false);

    // 낙관적 토픽 생성 (뮤테이션)
    const createTopicMutation = useMutation({
        mutationFn: askQuestion,
        onSuccess: (realResponse) => {
            const topicNode = realResponse.nodes[realResponse.topic] as TopicNode;

            addTopic({
                topicId: realResponse.topic,
                topicName: topicNode.topicName,
                createdAt: topicNode.createdAt,
                favorite: false,
            });

            setPrefetchedResponse(realResponse);
            queryClient.setQueryData(["topic", realResponse.topic], realResponse);
            queryClient.invalidateQueries({ queryKey: ["topics"] });

            // Optimistic 쿼리 파라미터 제거하여 표준 뷰로 전환
            router.replace(`/${realResponse.topic}`);
        },
        onError: (error) => {
            console.error("Optimistic question asking failed:", error);
            toast.error("대화를 생성하지 못했습니다. 다시 시도해주세요.");
            router.replace("/");
        },
    });

    useEffect(() => {
        if (!topicId) return;
        if (apiCallStarted.current) return;

        apiCallStarted.current = true;

        const optimisticDataString = sessionStorage.getItem(topicId);
        if (!optimisticDataString) {
            // 정보가 없으면 홈으로
            router.replace("/");
            return;
        }

        try {
            const { prompt, timestamp } = JSON.parse(optimisticDataString);

            const fakeResponse: TopicTreeResponse = {
                topic: topicId,
                nodes: {
                    [topicId]: {
                        topicId: topicId,
                        topicName: prompt,
                        createdAt: timestamp,
                        children: [`question-${topicId}`],
                    },
                    [`question-${topicId}`]: {
                        questionId: `question-${topicId}`,
                        questionText: prompt,
                        level: 1,
                        answerId: `answer-${topicId}`,
                        answerText: "",
                        createdAt: timestamp,
                        children: [],
                    },
                },
            };

            setOptimisticStepData(fakeResponse);
            createTopicMutation.mutate({ questionText: prompt });

        } catch (e) {
            console.error("Failed to parse optimistic data", e);
            router.replace("/");
        }
    }, [topicId, router, createTopicMutation]);

    return { data: optimisticStepData, isLoading: !optimisticStepData };
}

// Deprecated: 하위 호환성을 위해 남겨두거나, 점진적 마이그레이션이 필요한 경우 사용
// 현재 ChatView Refactoring이 완료되면 삭제 가능
interface UseTopicDataProps {
    topicId: string;
    isOptimistic: boolean;
}

export function useTopicData({ topicId, isOptimistic }: UseTopicDataProps) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const optimistic = isOptimistic ? useOptimisticTopicData(topicId) : { data: null, isLoading: false };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const standard = !isOptimistic ? useQuery({
        queryKey: ["topic", topicId],
        queryFn: () => getTopicById(topicId),
        enabled: !!topicId
    }) : { data: null, isLoading: false, error: null };

    if (isOptimistic) return { ...optimistic, error: null };
    return { data: standard.data, isLoading: standard.isLoading, error: standard.error };
}

