import dbConnect from '../../../lib/db';
import Note from '../../../models/Note';

export default async function handler(req, res) {
  const { method } = req;
  
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const {
          search = '',
          tag = '',
          page = 1,
          limit = 10,
          sort = 'updatedAt',
          order = 'desc'
        } = req.query;

        const query = {};
        
        // Search functionality
        if (search) {
          query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } }
          ];
        }

        // Tag filter
        if (tag) {
          query.tags = { $in: [tag] };
        }

        // Sort options
        const sortOptions = {};
        sortOptions[sort] = order === 'desc' ? -1 : 1;

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const notes = await Note.find(query)
          .sort(sortOptions)
          .skip(skip)
          .limit(parseInt(limit))
          .lean();

        const total = await Note.countDocuments(query);
        const totalPages = Math.ceil(total / parseInt(limit));

        res.status(200).json({
          success: true,
          data: notes,
          pagination: {
            currentPage: parseInt(page),
            totalPages,
            totalNotes: total,
            hasNext: parseInt(page) < totalPages,
            hasPrev: parseInt(page) > 1
          }
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to fetch notes',
          message: error.message
        });
      }
      break;

    case 'POST':
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

        const note = await Note.create({
          title: title.trim(),
          content: content.trim(),
          tags: tags.filter(tag => tag.trim().length > 0)
        });

        res.status(201).json({
          success: true,
          data: note
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to create note',
          message: error.message
        });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({
        success: false,
        error: `Method ${method} not allowed`
      });
  }
}
