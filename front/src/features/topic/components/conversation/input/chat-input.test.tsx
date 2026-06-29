import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatInput } from './chat-input';

describe('ChatInput', () => {
  const mockProps = {
    prompt: '',
    setPrompt: vi.fn(),
    onSubmit: vi.fn(),
    isLoading: false,
    disabled: false,
    placeholder: '메시지를 입력하세요...',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockProps.prompt = '';
    mockProps.isLoading = false;
    mockProps.disabled = false;
  });

  it('should render the textarea with placeholder', () => {
    render(<ChatInput {...mockProps} />);
    expect(screen.getByPlaceholderText('메시지를 입력하세요...')).toBeInTheDocument();
  });

  it('should call setPrompt when typing', () => {
    render(<ChatInput {...mockProps} />);
    const textarea = screen.getByPlaceholderText('메시지를 입력하세요...');
    
    fireEvent.change(textarea, { target: { value: 'Hello' } });
    
    expect(mockProps.setPrompt).toHaveBeenCalledWith('Hello');
  });

  it('should disable textarea and button when isLoading is true', () => {
    render(<ChatInput {...mockProps} isLoading={true} prompt="Test" />);
    
    const textarea = screen.getByPlaceholderText('메시지를 입력하세요...');
    const button = screen.getByRole('button');
    
    expect(textarea).toBeDisabled();
    expect(button).toBeDisabled();
    // Loading spinner should be visible
    expect(button.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('should call onSubmit when button is clicked', () => {
    render(<ChatInput {...mockProps} prompt="Valid message" />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    
    expect(mockProps.onSubmit).toHaveBeenCalled();
  });

  it('should call onSubmit when Enter is pressed without Shift', () => {
    render(<ChatInput {...mockProps} prompt="Valid message" />);
    const textarea = screen.getByPlaceholderText('메시지를 입력하세요...');
    
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });
    
    expect(mockProps.onSubmit).toHaveBeenCalled();
  });

  it('should NOT call onSubmit when Enter is pressed with Shift', () => {
    render(<ChatInput {...mockProps} prompt="Valid message" />);
    const textarea = screen.getByPlaceholderText('메시지를 입력하세요...');
    
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true });
    
    expect(mockProps.onSubmit).not.toHaveBeenCalled();
  });

  it('should disable button when prompt is empty or whitespace', () => {
    const { rerender } = render(<ChatInput {...mockProps} prompt="" />);
    expect(screen.getByRole('button')).toBeDisabled();
    
    rerender(<ChatInput {...mockProps} prompt="   " />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
