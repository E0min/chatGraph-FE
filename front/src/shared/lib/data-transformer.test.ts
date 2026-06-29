import { describe, it, expect } from 'vitest';
import { transformApiDataToViewData, TopicTreeResponse } from './data-transformer';

describe('data-transformer/transformApiDataToViewData', () => {
  it('should transform a simple topic with no questions', () => {
    const apiData: TopicTreeResponse = {
      topic: 'topic-1',
      nodes: {
        'topic-1': {
          topicId: 'topic-1',
          topicName: 'Root Topic',
          createdAt: '2023-01-01T00:00:00Z',
          children: [],
          favorite: true
        }
      }
    };

    const viewData = transformApiDataToViewData(apiData);
    expect(viewData.id).toBe('topic-1');
    expect(viewData.questionText).toBe('Root Topic');
    expect(viewData.answerText).toBe('토픽 질문: Root Topic');
    expect(viewData.favorite).toBe(true);
    expect(viewData.children).toEqual([]);
  });

  it('should transform a topic with direct question children', () => {
    const apiData: TopicTreeResponse = {
      topic: 'topic-1',
      nodes: {
        'topic-1': {
          topicId: 'topic-1',
          topicName: 'Root Topic',
          createdAt: '2023-01-01T00:00:00Z',
          children: ['q-1', 'q-2'],
          favorite: false
        },
        'q-1': {
          questionId: 'q-1',
          questionText: 'Question 1',
          answerText: 'Answer 1',
          level: 1,
          createdAt: '2023-01-01T00:00:00Z',
          children: [],
        },
        'q-2': {
          questionId: 'q-2',
          questionText: 'Question 2',
          answerText: 'Answer 2',
          level: 1,
          createdAt: '2023-01-01T00:00:00Z',
          children: [],
          favorite: true
        }
      }
    };

    const viewData = transformApiDataToViewData(apiData);
    expect(viewData.children).toHaveLength(2);
    
    expect(viewData.children[0].id).toBe('q-1');
    expect(viewData.children[0].questionText).toBe('Question 1');
    expect(viewData.children[0].answerText).toBe('Answer 1');
    expect(viewData.children[0].favorite).toBe(false);

    expect(viewData.children[1].id).toBe('q-2');
    expect(viewData.children[1].favorite).toBe(true);
  });

  it('should correctly include unreferenced level 1 questions', () => {
    const apiData: TopicTreeResponse = {
      topic: 'topic-1',
      nodes: {
        'topic-1': {
          topicId: 'topic-1',
          topicName: 'Root Topic',
          createdAt: '2023-01-01T00:00:00Z',
          children: ['q-1'],
        },
        'q-1': {
          questionId: 'q-1',
          questionText: 'Question 1',
          answerText: 'Answer 1',
          level: 1,
          createdAt: '2023-01-01T00:00:00Z',
          children: [],
        },
        'q-unref': {
          questionId: 'q-unref',
          questionText: 'Unreferenced Question',
          answerText: 'Unreferenced Answer',
          level: 1,
          createdAt: '2023-01-01T00:00:00Z',
          children: [],
        }
      }
    };

    const viewData = transformApiDataToViewData(apiData);
    expect(viewData.children).toHaveLength(2); // q-1 + q-unref
    expect(viewData.children.some(c => c.id === 'q-unref')).toBe(true);
  });
});
