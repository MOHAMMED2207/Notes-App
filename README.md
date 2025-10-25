# Next.js Notes App

A full-stack notes application built with Next.js, MongoDB, and shadcn/ui. Features include CRUD operations, search, filtering, pagination, and markdown support.

## Features

- ✅ **Full CRUD Operations**: Create, read, update, and delete notes
- ✅ **MongoDB Integration**: Persistent storage with Mongoose ODM
- ✅ **Client-side Fallback**: localStorage backup for offline functionality
- ✅ **Search & Filter**: Search by title/content and filter by tags
- ✅ **Sorting**: Sort by creation date, update date, or title
- ✅ **Pagination**: Efficient pagination for large note collections
- ✅ **Markdown Support**: Rich text editing with markdown preview
- ✅ **Autosave**: Automatic draft saving to localStorage
- ✅ **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- ✅ **Modern UI**: Beautiful components with shadcn/ui
- ✅ **Type Safety**: Built with JavaScript (ES6+)
- ✅ **Testing**: Jest and React Testing Library tests

## Tech Stack

- **Frontend**: Next.js 14, React 18, JavaScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Testing**: Jest, React Testing Library
- **Markdown**: react-markdown with GitHub Flavored Markdown

## Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd nextjs-notes-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install shadcn/ui Components

This project uses shadcn/ui components. The components are already included, but if you need to add more:

```bash
# Install shadcn/ui CLI (if not already installed)
npm install -g shadcn-ui@latest

# Initialize shadcn/ui in your project
npx shadcn-ui@latest init

# Add additional components as needed
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
# ... etc
```

### 4. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp env.example .env.local
```

Edit `.env.local` with your MongoDB connection string:

```env
MONGODB_URI=mongodb://localhost:27017/notes-app
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

### 5. Database Setup

Make sure MongoDB is running on your system:

**Local MongoDB:**
```bash
# Start MongoDB service
mongod

# Or if using MongoDB as a service
sudo systemctl start mongod
```

**MongoDB Atlas (Cloud):**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a new cluster
- Get your connection string and update `MONGODB_URI` in `.env.local`

### 6. Run the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
nextjs-notes-app/
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── NoteCard.js      # Individual note display
│   ├── NoteEditor.js    # Note creation/editing
│   ├── NoteViewer.js    # Full note view
│   ├── NotesList.js     # Notes grid layout
│   ├── SearchBar.js     # Search functionality
│   ├── TagFilter.js     # Tag filtering
│   ├── Pagination.js    # Pagination controls
│   └── DeleteModal.js   # Delete confirmation
├── lib/                 # Utility functions
│   ├── db.js           # MongoDB connection
│   └── utils.js        # Helper functions
├── models/              # Database models
│   └── Note.js         # Note schema
├── pages/               # Next.js pages
│   ├── api/            # API routes
│   │   └── notes/      # Notes CRUD endpoints
│   ├── _app.js         # App wrapper
│   └── index.js        # Main page
├── styles/              # Global styles
│   └── globals.css     # Tailwind CSS
├── __tests__/          # Test files
├── package.json        # Dependencies
├── tailwind.config.js  # Tailwind configuration
├── next.config.js      # Next.js configuration
└── README.md          # This file
```

## API Endpoints

### Notes API

- `GET /api/notes` - Get all notes with pagination, search, and filtering
- `GET /api/notes/[id]` - Get a specific note
- `POST /api/notes` - Create a new note
- `PUT /api/notes/[id]` - Update a note
- `DELETE /api/notes/[id]` - Delete a note

### Query Parameters (GET /api/notes)

- `search` - Search in title and content
- `tag` - Filter by tag
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sort` - Sort field (createdAt, updatedAt, title)
- `order` - Sort order (asc, desc)

## Usage

### Creating Notes

1. Click "Create New Note" button
2. Enter title and content (markdown supported)
3. Add tags (optional)
4. Click "Save" or press Ctrl+Enter

### Editing Notes

1. Click the edit button on any note card
2. Modify the content
3. Save changes

### Searching and Filtering

- Use the search bar to find notes by title or content
- Select a tag from the dropdown to filter by tag
- Choose sort field and order

### Markdown Support

The app supports GitHub Flavored Markdown:

```markdown
# Headers
**Bold text**
*Italic text*
- Lists
- More items

`Code blocks`

[Links](https://example.com)
```

## Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### Test Files

- `__tests__/NoteCard.test.js` - NoteCard component tests
- `__tests__/SearchBar.test.js` - SearchBar component tests

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Node.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `NEXTAUTH_URL` | Application URL | No |
| `NEXTAUTH_SECRET` | Secret for session encryption | No |

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Add tests for new functionality
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## Changelog

### v1.0.0
- Initial release
- Full CRUD operations
- Search and filtering
- Pagination
- Markdown support
- Responsive design
- MongoDB integration
- Client-side fallback
