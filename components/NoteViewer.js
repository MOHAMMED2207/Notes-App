import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Edit, Calendar, Tag } from 'lucide-react';

const NoteViewer = ({ note, onEdit, onClose }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto ">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-2xl mb-2">{note.title}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Created {formatDate(note.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Updated {formatDate(note.updatedAt)}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => onEdit(note)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {note.content}
          </ReactMarkdown>
        </div>
        
        {note.tags && note.tags.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="h-4 w-4" />
              <span className="text-sm font-medium">Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {note.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NoteViewer;
