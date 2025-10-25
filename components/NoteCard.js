import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Edit, Trash2, Calendar } from 'lucide-react'

const NoteCard = ({ note, onEdit, onDelete, onView }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <Card className="h-full flex flex-col transition-all bg-card/80 backdrop-blur-md border border-border hover:shadow-xl hover:shadow-primary/20 rounded-2xl">
      {/* Header */}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-2 flex-1 mr-2 text-card-foreground">
            {note.title}
          </CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(note)}
              className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(note)}
              className="h-8 w-8 text-destructive hover:bg-destructive/20 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          <Calendar className="h-3.5 w-3.5" />
          <span>Updated {formatDate(note.updatedAt)}</span>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex-1 flex flex-col">
        <div className="prose prose-sm dark:prose-invert max-w-none flex-1 text-muted-foreground">
          <ReactMarkdown remarkPlugins={[remarkGfm]} className="line-clamp-6">
            {note.content}
          </ReactMarkdown>
        </div>

        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {note.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs rounded-full px-2 py-0.5 bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(note)}
            className="w-full rounded-lg border-primary/30 text-primary hover:bg-primary/10 transition-colors"
          >
            View Full Note
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default NoteCard
