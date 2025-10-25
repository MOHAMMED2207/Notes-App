import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import NotesList from '../components/NotesList';
import NoteEditor from '../components/NoteEditor';
import NoteViewer from '../components/NoteViewer';
import DeleteModal from '../components/DeleteModal';
import SearchBar from '../components/SearchBar';
import TagFilter from '../components/TagFilter';
import Pagination from '../components/Pagination';
import { Plus, Search, Filter, SortAsc, SortDesc } from 'lucide-react';

export default function Home() {
  // State management
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'editor', 'viewer'
  const [editingNote, setEditingNote] = useState(null);
  const [viewingNote, setViewingNote] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, note: null });
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('updatedAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [availableTags, setAvailableTags] = useState([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalNotes, setTotalNotes] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const limit = 12; // Notes per page

  // Fetch notes from API
  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        search: searchQuery,
        tag: selectedTag,
        page: currentPage.toString(),
        limit: limit.toString(),
        sort: sortBy,
        order: sortOrder
      });

      const response = await fetch(`/api/notes?${params}`);
      const data = await response.json();

      if (data.success) {
        setNotes(data.data);
        setTotalPages(data.pagination.totalPages);
        setTotalNotes(data.pagination.totalNotes);
        setHasNext(data.pagination.hasNext);
        setHasPrev(data.pagination.hasPrev);
      } else {
        console.error('Failed to fetch notes:', data.error);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch available tags
  const fetchTags = async () => {
    try {
      const response = await fetch('/api/notes');
      const data = await response.json();
      if (data.success) {
        const allTags = data.data.flatMap(note => note.tags || []);
        const uniqueTags = [...new Set(allTags)].sort();
        setAvailableTags(uniqueTags);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  // Load notes on component mount and when filters change
  useEffect(() => {
    fetchNotes();
  }, [searchQuery, selectedTag, currentPage, sortBy, sortOrder]);

  // Load tags on mount
  useEffect(() => {
    fetchTags();
  }, []);

  // Handle note creation/editing
  const handleSaveNote = async (noteData) => {
    try {
      const url = editingNote ? `/api/notes/${editingNote._id}` : '/api/notes';
      const method = editingNote ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });

      const data = await response.json();

      if (data.success) {
        setCurrentView('list');
        setEditingNote(null);
        fetchNotes();
        fetchTags();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Failed to save note');
    }
  };

  // Handle note deletion
  const handleDeleteNote = async () => {
    if (!deleteModal.note) return;

    try {
      const response = await fetch(`/api/notes/${deleteModal.note._id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setDeleteModal({ isOpen: false, note: null });
        fetchNotes();
        fetchTags();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note');
    }
  };

  // Event handlers
  const handleCreateNew = () => {
    setEditingNote(null);
    setCurrentView('editor');
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setCurrentView('editor');
  };

  const handleView = (note) => {
    setViewingNote(note);
    setCurrentView('viewer');
  };

  const handleDelete = (note) => {
    setDeleteModal({ isOpen: true, note });
  };

  const handleCancel = () => {
    setCurrentView('list');
    setEditingNote(null);
    setViewingNote(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  return (
    <>
      <Head>
        <title>Notes App</title>
        <meta name="description" content="A simple notes application built with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Notes</h1>
            <p className="text-muted-foreground">
              {totalNotes} {totalNotes === 1 ? 'note' : 'notes'} total
            </p>
          </div>

          {currentView === 'list' && (
            <>
              {/* Search and Filter Controls */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Search & Filter
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-2">
                      <SearchBar
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search notes by title or content..."
                      />
                    </div>
                    
                    <TagFilter
                      selectedTag={selectedTag}
                      onTagChange={handleTagChange}
                      availableTags={availableTags}
                    />
                    
                    <div className="flex gap-2">
                      <Select value={sortBy} onValueChange={handleSortChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="updatedAt">Last Updated</SelectItem>
                          <SelectItem value="createdAt">Date Created</SelectItem>
                          <SelectItem value="title">Title</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleSortOrder}
                        title={`Sort ${sortOrder === 'desc' ? 'Ascending' : 'Descending'}`}
                      >
                        {sortOrder === 'desc' ? (
                          <SortDesc className="h-4 w-4" />
                        ) : (
                          <SortAsc className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Create New Note Button */}
              <div className="mb-6">
                <Button onClick={handleCreateNew} size="lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Note
                </Button>
              </div>

              {/* Notes List */}
              <NotesList
                notes={notes}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
                onCreateNew={handleCreateNew}
                isLoading={isLoading}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    hasNext={hasNext}
                    hasPrev={hasPrev}
                  />
                </div>
              )}
            </>
          )}

          {currentView === 'editor' && (
            <NoteEditor
              note={editingNote}
              onSave={handleSaveNote}
              onCancel={handleCancel}
              isEditing={!!editingNote}
            />
          )}

          {currentView === 'viewer' && viewingNote && (
            <NoteViewer
              note={viewingNote}
              onEdit={handleEdit}
              onClose={handleCancel}
            />
          )}

          {/* Delete Confirmation Modal */}
          <DeleteModal
            isOpen={deleteModal.isOpen}
            onClose={() => setDeleteModal({ isOpen: false, note: null })}
            onConfirm={handleDeleteNote}
            noteTitle={deleteModal.note?.title}
          />
        </div>
      </div>
    </>
  );
}
