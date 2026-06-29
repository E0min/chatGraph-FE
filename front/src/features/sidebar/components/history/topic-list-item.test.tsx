import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TopicListItem } from './topic-list-item';

describe('TopicListItem', () => {
  const mockTopic = {
    topicId: 't-1',
    topicName: 'Short Name',
    createdAt: '2023-01-01T00:00:00Z',
    favorite: false,
  };

  const mockProps = {
    topic: mockTopic,
    isEditing: false,
    onStartEdit: vi.fn(),
    onConfirmEdit: vi.fn(),
    onConfirmDelete: vi.fn(),
    onToggleFavorite: vi.fn(),
    editingNewName: '',
    setEditingNewName: vi.fn(),
    glassDropdownClass: 'glass-dropdown',
  };

  it('should render topic name', () => {
    render(<TopicListItem {...mockProps} />);
    expect(screen.getByText('Short Name')).toBeInTheDocument();
  });

  it('should truncate long topic name', () => {
    const longTopic = { ...mockTopic, topicName: 'This is a very long topic name that should be truncated' };
    render(<TopicListItem {...mockProps} topic={longTopic} />);
    
    // "This is a ver..." (12 chars + ...)
    expect(screen.getByText('This is a ve...')).toBeInTheDocument();
  });

  it('should show star icon if favorite is true', () => {
    const favoriteTopic = { ...mockTopic, favorite: true };
    const { container } = render(<TopicListItem {...mockProps} topic={favoriteTopic} />);
    
    // Star icon is from lucide-react
    const starIcon = container.querySelector('.text-yellow-500');
    expect(starIcon).toBeInTheDocument();
  });

  it('should show input field when isEditing is true', () => {
    render(<TopicListItem {...mockProps} isEditing={true} editingNewName="Editing Name" />);
    
    const input = screen.getByDisplayValue('Editing Name');
    expect(input).toBeInTheDocument();
  });

  it('should call setEditingNewName when typing in edit mode', () => {
    render(<TopicListItem {...mockProps} isEditing={true} />);
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: 'New Name' } });
    
    expect(mockProps.setEditingNewName).toHaveBeenCalledWith('New Name');
  });

  it('should call onConfirmEdit when Enter is pressed in edit mode', () => {
    render(<TopicListItem {...mockProps} isEditing={true} />);
    const input = screen.getByRole('textbox');
    
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(mockProps.onConfirmEdit).toHaveBeenCalled();
  });

  it('should call onStartEdit(null) when Escape is pressed in edit mode', () => {
    render(<TopicListItem {...mockProps} isEditing={true} />);
    const input = screen.getByRole('textbox');
    
    fireEvent.keyDown(input, { key: 'Escape' });
    
    expect(mockProps.onStartEdit).toHaveBeenCalledWith(null);
  });
});
