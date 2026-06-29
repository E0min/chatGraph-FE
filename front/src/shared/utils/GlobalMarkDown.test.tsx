import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GlobalMarkdown } from './GlobalMarkDown';

describe('GlobalMarkDown', () => {
  it('should render simple markdown text', () => {
    const markdown = 'Hello **World**';
    render(<GlobalMarkdown>{markdown}</GlobalMarkdown>);
    
    // "Hello " 와 "World" (strong) 텍스트가 렌더링되었는지 확인
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('World')).toBeInTheDocument();
    expect(screen.getByText('World').tagName).toBe('STRONG');
  });

  it('should render headings properly', () => {
    const markdown = '# Heading 1\n## Heading 2';
    render(<GlobalMarkdown>{markdown}</GlobalMarkdown>);

    const h1 = screen.getByRole('heading', { level: 1, name: 'Heading 1' });
    const h2 = screen.getByRole('heading', { level: 2, name: 'Heading 2' });

    expect(h1).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
  });

  it('should render links properly', () => {
    const markdown = '[OpenAI](https://openai.com)';
    render(<GlobalMarkdown>{markdown}</GlobalMarkdown>);

    const link = screen.getByRole('link', { name: 'OpenAI' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://openai.com');
  });

  it('should render lists properly', () => {
    const markdown = '- Item 1\n- Item 2';
    render(<GlobalMarkdown>{markdown}</GlobalMarkdown>);

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Item 1');
    expect(items[1]).toHaveTextContent('Item 2');
  });

  it('should render GitHub Flavored Markdown (GFM) tables', () => {
    const markdown = `
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
    `;
    render(<GlobalMarkdown>{markdown}</GlobalMarkdown>);

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Header 1' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Cell 1' })).toBeInTheDocument();
  });
});
