import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { X, Save, XCircle } from 'lucide-react'

const NoteEditor = ({ note, onSave, onCancel, isEditing = false }) => {
  const [title, setTitle] = useState(note?.title || '')
  const [content, setContent] = useState(note?.content || '')
  const [tags, setTags] = useState(note?.tags || [])
  const [newTag, setNewTag] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  // Autosave to localStorage
  useEffect(() => {
    const autosaveData = { title, content, tags, timestamp: Date.now() }
    localStorage.setItem('note-draft', JSON.stringify(autosaveData))
  }, [title, content, tags])

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('note-draft')
    if (draft && !isEditing) {
      const parsedDraft = JSON.parse(draft)
      if (Date.now() - parsedDraft.timestamp < 24 * 60 * 60 * 1000) {
        setTitle(parsedDraft.title || '')
        setContent(parsedDraft.content || '')
        setTags(parsedDraft.tags || [])
      }
    }
  }, [isEditing])

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Title and content are required')
      return
    }

    setIsSaving(true)
    try {
      await onSave({
        title: title.trim(),
        content: content.trim(),
        tags: tags.filter((tag) => tag.trim().length > 0),
      })
      localStorage.removeItem('note-draft')
    } catch (error) {
      console.error('Error saving note:', error)
      alert('Failed to save note')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    localStorage.removeItem('note-draft')
    onCancel()
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 10) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave()
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-card/80 backdrop-blur-md border border-border rounded-2xl shadow-lg hover:shadow-primary/10 transition-all ">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-card-foreground">
          {isEditing ? '✏️ Edit Note' : '📝 Create New Note'}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
              className="rounded-lg border-destructive/40 text-destructive hover:bg-destructive/10"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || !title.trim() || !content.trim()}
              className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          💡 Tip: Press <kbd className="px-1 py-0.5 rounded bg-muted text-xs">Ctrl+Enter</kbd> to save quickly
        </p>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Title */}
        <div>
          <label className="text-sm font-medium text-muted-foreground">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title..."
            className="mt-1 rounded-lg bg-background/50 border-border focus:ring-2 focus:ring-primary"
            maxLength={200}
          />
          <p className="text-xs text-muted-foreground mt-1">{title.length}/200 characters</p>
        </div>

        {/* Content */}
        <div>
          <label className="text-sm font-medium text-muted-foreground">Content</label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note content here... (Markdown supported)"
            className="mt-1 min-h-[200px] rounded-lg bg-background/50 border-border focus:ring-2 focus:ring-primary"
            maxLength={10000}
            onKeyDown={handleKeyPress}
          />
          <p className="text-xs text-muted-foreground mt-1">{content.length}/10000 characters</p>
        </div>

        {/* Tags */}
        <div>
          <label className="text-sm font-medium text-muted-foreground">Tags</label>
          <div className="flex gap-2 mt-1">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag..."
              onKeyPress={(e) => e.key === 'Enter' && addTag()}
              maxLength={50}
              className="rounded-lg bg-background/50 border-border focus:ring-2 focus:ring-primary"
            />
            <Button
              type="button"
              variant="outline"
              onClick={addTag}
              disabled={!newTag.trim() || tags.includes(newTag.trim()) || tags.length >= 10}
              className="rounded-lg border-primary/40 text-primary hover:bg-primary/10"
            >
              Add
            </Button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white px-3 py-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-1">{tags.length}/10 tags</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default NoteEditor
