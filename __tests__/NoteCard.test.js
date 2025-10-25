import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoteCard from '../components/NoteCard';

const mockNote = {
  _id: '1',
  title: 'Test Note',
  content: '# Hello World\n\nThis is a **test** note.',
  tags: ['test', 'example'],
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z'
};

const mockHandlers = {
  onEdit: jest.fn(),
  onDelete: jest.fn(),
  onView: jest.fn()
};

describe('NoteCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders note title and content', () => {
    render(<NoteCard note={mockNote} {...mockHandlers} />);
    
    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.getByText('This is a test note.')).toBeInTheDocument();
  });

  it('renders tags correctly', () => {
    render(<NoteCard note={mockNote} {...mockHandlers} />);
    
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('example')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    render(<NoteCard note={mockNote} {...mockHandlers} />);
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    expect(mockHandlers.onEdit).toHaveBeenCalledWith(mockNote);
  });

  it('calls onDelete when delete button is clicked', () => {
    render(<NoteCard note={mockNote} {...mockHandlers} />);
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(mockNote);
  });

  it('calls onView when view button is clicked', () => {
    render(<NoteCard note={mockNote} {...mockHandlers} />);
    
    const viewButton = screen.getByRole('button', { name: /view full note/i });
    fireEvent.click(viewButton);
    
    expect(mockHandlers.onView).toHaveBeenCalledWith(mockNote);
  });

  it('displays formatted date', () => {
    render(<NoteCard note={mockNote} {...mockHandlers} />);
    
    expect(screen.getByText(/Updated/)).toBeInTheDocument();
  });

  it('handles note without tags', () => {
    const noteWithoutTags = { ...mockNote, tags: [] };
    render(<NoteCard note={noteWithoutTags} {...mockHandlers} />);
    
    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.queryByText('test')).not.toBeInTheDocument();
  });
});
