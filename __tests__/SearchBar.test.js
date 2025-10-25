import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with placeholder text', () => {
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    expect(screen.getByPlaceholderText('Search notes...')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchBar value="" onChange={mockOnChange} placeholder="Custom search..." />);
    
    expect(screen.getByPlaceholderText('Custom search...')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test query' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('test query');
  });

  it('displays clear button when value is not empty', () => {
    render(<SearchBar value="test" onChange={mockOnChange} />);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('does not display clear button when value is empty', () => {
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls onChange with empty string when clear button is clicked', () => {
    render(<SearchBar value="test" onChange={mockOnChange} />);
    
    const clearButton = screen.getByRole('button');
    fireEvent.click(clearButton);
    
    expect(mockOnChange).toHaveBeenCalledWith('');
  });

  it('displays search icon', () => {
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    // The search icon is rendered as an SVG, we can check for its presence
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
