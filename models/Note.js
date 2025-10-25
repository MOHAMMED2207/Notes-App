import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
    maxlength: [10000, 'Content cannot be more than 10000 characters'],
  },
  tags: {
    type: [String],
    default: [],
    validate: {
      validator: function(tags) {
        return tags.length <= 10;
      },
      message: 'Cannot have more than 10 tags'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
NoteSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create text index for search functionality
NoteSchema.index({ title: 'text', content: 'text' });

export default mongoose.models.Note || mongoose.model('Note', NoteSchema);
