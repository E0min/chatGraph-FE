import { describe, it, expect } from 'vitest';
import { cn, findPathToNode } from './utils';
import { ViewData } from './data-transformer';

describe('utils/cn', () => {
  it('should merge tailwind classes properly', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
    expect(cn('bg-red-500', { 'text-white': true, 'text-black': false })).toBe('bg-red-500 text-white');
  });

  it('should override classes according to tailwind-merge', () => {
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
  });
});

describe('utils/findPathToNode', () => {
  const mockTree: ViewData = {
    id: 'root',
    questionText: 'Root',
    answerText: 'Root Answer',
    favorite: false,
    children: [
      {
        id: 'child-1',
        questionText: 'Child 1',
        answerText: 'Answer 1',
        favorite: false,
        children: [
          {
            id: 'grandchild-1',
            questionText: 'Grandchild 1',
            answerText: 'Answer G1',
            favorite: false,
            children: []
          }
        ]
      },
      {
        id: 'child-2',
        questionText: 'Child 2',
        answerText: 'Answer 2',
        favorite: false,
        children: []
      }
    ]
  };

  it('should find path to the target node', () => {
    const path = findPathToNode(mockTree, 'grandchild-1');
    expect(path).not.toBeNull();
    expect(path).toHaveLength(3);
    expect(path?.map(n => n.id)).toEqual(['root', 'child-1', 'grandchild-1']);
  });

  it('should find path to a direct child', () => {
    const path = findPathToNode(mockTree, 'child-2');
    expect(path).not.toBeNull();
    expect(path).toHaveLength(2);
    expect(path?.map(n => n.id)).toEqual(['root', 'child-2']);
  });

  it('should return null if target node does not exist', () => {
    const path = findPathToNode(mockTree, 'non-existent');
    expect(path).toBeNull();
  });

  it('should return path to root if target is root', () => {
    const path = findPathToNode(mockTree, 'root');
    expect(path).not.toBeNull();
    expect(path).toHaveLength(1);
    expect(path?.[0].id).toBe('root');
  });
});
