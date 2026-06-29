import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTopicStore } from './topic-store';

// Mock dependencies
vi.mock('@/features/topic/api/topics-history', () => ({
  getTopicsHistory: vi.fn(),
}));

vi.mock('@/features/topic/api/topics', () => ({
  toggleFavoriteTopic: vi.fn(),
}));

describe('topic-store', () => {
  beforeEach(() => {
    // Zustand 스토어 초기화
    useTopicStore.setState({
      currentTopicId: null,
      currentTopicName: null,
      prefetchedResponse: null,
      topics: [],
    });
    vi.clearAllMocks();
  });

  it('should set current topic', () => {
    const { setTopic } = useTopicStore.getState();
    
    setTopic('topic-1', 'Topic One');
    
    const state = useTopicStore.getState();
    expect(state.currentTopicId).toBe('topic-1');
    expect(state.currentTopicName).toBe('Topic One');
  });

  it('should set prefetched response', () => {
    const { setPrefetchedResponse } = useTopicStore.getState();
    const mockResponse: any = { topic: 'topic-1', nodes: {} };
    
    setPrefetchedResponse(mockResponse);
    
    expect(useTopicStore.getState().prefetchedResponse).toBe(mockResponse);
  });

  it('should manage topics list (add, update, remove)', () => {
    const { addTopic, updateTopic, removeTopic } = useTopicStore.getState();
    
    const mockTopic = {
      topicId: 't-1',
      topicName: 'Initial Topic',
      createdAt: '2023-01-01T00:00:00Z',
      favorite: false
    };

    // Add
    addTopic(mockTopic);
    expect(useTopicStore.getState().topics).toHaveLength(1);
    expect(useTopicStore.getState().topics[0]).toEqual(mockTopic);

    // Update
    updateTopic('t-1', 'Updated Topic');
    expect(useTopicStore.getState().topics[0].topicName).toBe('Updated Topic');

    // Remove
    removeTopic('t-1');
    expect(useTopicStore.getState().topics).toHaveLength(0);
  });

  it('should optimistic update favorite status', async () => {
    const { addTopic, toggleFavorite } = useTopicStore.getState();
    
    addTopic({
      topicId: 't-1',
      topicName: 'T1',
      createdAt: '2023-01-01T00:00:00Z',
      favorite: false
    });

    // toggleFavorite는 비동기 함수
    const promise = toggleFavorite('t-1');
    
    // Optimistic update 확인
    expect(useTopicStore.getState().topics[0].favorite).toBe(true);

    await promise;
  });
});
