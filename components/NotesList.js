import { useState } from 'react';
import NoteCard from './NoteCard';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

const NotesList = ({ 
  notes, 
  onEdit, 
  onDelete, 
  onView, 
  onCreateNew,
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-64"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <Plus className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No notes yet</h3>
        <p className="text-muted-foreground mb-4">
          Create your first note to get started
        </p>
        <Button onClick={onCreateNew}>
          <Plus className="h-4 w-4 mr-2" />
          Create Note
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
};

export default NotesList;
