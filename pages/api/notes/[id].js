import dbConnect from '../../../lib/db';
import Note from '../../../models/Note';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  
  await dbConnect();

  // Validate ObjectId
  if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid note ID'
    });
  }

  switch (method) {
    case 'GET':
      try {
        const note = await Note.findById(id);
        
        if (!note) {
          return res.status(404).json({
            success: false,
            error: 'Note not found'
          });
        }

        res.status(200).json({
          success: true,
          data: note
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to fetch note',
          message: error.message
        });
      }
      break;

    case 'PUT':
      try {
        const { title, content, tags = [] } = req.body;

        // Validation
        if (!title || !content) {
          return res.status(400).json({
            success: false,
            error: 'Title and content are required'
          });
        }

        if (title.length > 200) {
          return res.status(400).json({
            success: false,
            error: 'Title cannot be more than 200 characters'
          });
        }

        if (content.length > 10000) {
          return res.status(400).json({
            success: false,
            error: 'Content cannot be more than 10000 characters'
          });
        }

        if (tags.length > 10) {
          return res.status(400).json({
            success: false,
            error: 'Cannot have more than 10 tags'
          });
        }

        const note = await Note.findByIdAndUpdate(
          id,
          {
            title: title.trim(),
            content: content.trim(),
            tags: tags.filter(tag => tag.trim().length > 0),
            updatedAt: new Date()
          },
          { new: true, runValidators: true }
        );

        if (!note) {
          return res.status(404).json({
            success: false,
            error: 'Note not found'
          });
        }

        res.status(200).json({
          success: true,
          data: note
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to update note',
          message: error.message
        });
      }
      break;

    case 'DELETE':
      try {
        const note = await Note.findByIdAndDelete(id);
        
        if (!note) {
          return res.status(404).json({
            success: false,
            error: 'Note not found'
          });
        }

        res.status(200).json({
          success: true,
          message: 'Note deleted successfully'
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to delete note',
          message: error.message
        });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({
        success: false,
        error: `Method ${method} not allowed`
      });
  }
}
