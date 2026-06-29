import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useStartNewTopic } from './use-start-new-topic';
import { useRouter } from 'next/navigation';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('useStartNewTopic', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({ push: mockPush });
    
    // Clear browser storage
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should initialize with empty prompt and isLogin false', () => {
    const { result } = renderHook(() => useStartNewTopic());
    
    expect(result.current.prompt).toBe('');
    expect(result.current.isLogin).toBe(false);
  });

  it('should set isLogin true if token exists in localStorage', () => {
    localStorage.setItem('token', 'mock-token');
    
    const { result } = renderHook(() => useStartNewTopic());
    
    expect(result.current.isLogin).toBe(true);
  });

  it('should update prompt value', () => {
    const { result } = renderHook(() => useStartNewTopic());
    
    act(() => {
      result.current.setPrompt('Hello Topic');
    });
    
    expect(result.current.prompt).toBe('Hello Topic');
  });

  it('should save to sessionStorage and redirect on handleStartNewTopic', async () => {
    const { result } = renderHook(() => useStartNewTopic());
    
    act(() => {
      result.current.setPrompt('New Question');
    });

    await act(async () => {
      await result.current.handleStartNewTopic();
    });

    // Check if redirect was called
    expect(mockPush).toHaveBeenCalledWith(expect.stringMatching(/^\/temp-.+\?optimistic=true$/));
    
    // Check sessionStorage
    const storageKeys = Object.keys(sessionStorage);
    const tempKey = storageKeys.find(k => k.startsWith('temp-'));
    expect(tempKey).toBeDefined();
    
    const storedData = JSON.parse(sessionStorage.getItem(tempKey!) || '{}');
    expect(storedData.prompt).toBe('New Question');
    expect(storedData.timestamp).toBeDefined();
  });

  it('should NOT redirect if prompt is empty', async () => {
    const { result } = renderHook(() => useStartNewTopic());
    
    await act(async () => {
      await result.current.handleStartNewTopic();
    });

    expect(mockPush).not.toHaveBeenCalled();
  });
});
