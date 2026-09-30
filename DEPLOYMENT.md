# Art Garage Tattoo Studio - Deployment Guide

## Fresh Vercel Deployment Setup

This guide walks you through deploying the Art Garage site with chatbot, admin dashboard, and secure photo management to Vercel from scratch.

### Prerequisites

- Vercel account (free tier works fine)
- GitHub/GitLab/Bitbucket account with this repo pushed
- PostgreSQL database (Vercel Postgres recommended)
- Vercel Blob storage token

### Step 1: Push Code to GitHub

```bash
git add .
git commit -m "Add chatbot, secure auth, RAG infrastructure"
git push origin main
```

### Step 2: Create New Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Select your repository
4. Choose framework: **Other** (we use Vite)
5. Build command: `npm run build`
6. Output directory: `dist`

### Step 3: Configure Environment Variables

In Vercel dashboard, add these environment variables:

#### Security & Session
```
SESSION_SECRET=generate-a-strong-random-32-character-string-here
```

#### Admin Credentials (Encrypted)
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=<generate-using-script-below>
```

**To generate secure password hash:**
```bash
node scripts/generate-password-hash.js
```
This will prompt you to enter a password and output a bcrypt hash. Copy that hash to `ADMIN_PASSWORD_HASH`.

#### Database
```
POSTGRES_URL=postgresql://user:password@your-host:5432/art_garage
```

Get this from Vercel Postgres dashboard.

#### Blob Storage
```
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

Generate in Vercel → Settings → Blob Storage

### Step 4: Set Up Database

Create the required tables in PostgreSQL:

```sql
-- Portfolio Items Table
CREATE TABLE IF NOT EXISTS portfolio_items (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL CHECK (type IN ('photo', 'video')),
  title VARCHAR(100) NOT NULL,
  bio TEXT,
  artist VARCHAR(50) NOT NULL,
  url VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_portfolio_artist ON portfolio_items(artist);
CREATE INDEX IF NOT EXISTS idx_portfolio_type ON portfolio_items(type);
```

### Step 5: Deploy

1. In Vercel dashboard, click "Deploy"
2. Wait for build to complete
3. Visit your deployment URL

### Features Included

✅ **Responsive Chatbot**
- Works on mobile, tablet, desktop
- Predefined FAQ system with 12+ common questions
- Advanced animations and typing indicators
- Smart keyword matching

✅ **Secure Admin Panel**
- Encrypted password hashing with bcrypt
- Secure session management
- Photo & video upload to Vercel Blob
- Portfolio management dashboard

✅ **Photo Management**
- Upload photos/videos directly from admin panel
- Image validation and compression
- Associate content with artists
- Delete/manage portfolio items

✅ **Navigation**
- Admin login button in navbar
- Quick access from any page
- Protected routes

✅ **RAG Infrastructure**
- Foundation for AI-powered search
- Extensible knowledge base system
- Prepared for vector embeddings
- Multi-source retrieval ready

### Future Enhancements (RAG System)

The foundation is ready for:
1. Vector embeddings via OpenAI
2. Semantic search using Pinecone/Weaviate
3. AI-powered responses beyond FAQs
4. Automatic knowledge base indexing

### Troubleshooting

**Build fails:**
- Check Node.js version: `node -v` (should be 18+)
- Clear cache: `npm ci` and rebuild

**Login not working:**
- Verify `SESSION_SECRET` is set
- Confirm `ADMIN_PASSWORD_HASH` is a valid bcrypt hash
- Check browser cookies are enabled

**Photos not uploading:**
- Verify `BLOB_READ_WRITE_TOKEN` is correct
- Check file size limits (10MB for photos, 100MB for videos)
- Ensure PostgreSQL connection is working

**Chatbot not appearing:**
- Clear browser cache
- Check console for JS errors
- Verify ChatBot component is imported in App.jsx

### Local Development

```bash
# Install dependencies
npm install

# Generate admin password hash
node scripts/generate-password-hash.js

# Create .env.local with test values
cp .env.example .env.local

# Start dev server
npm run dev

# Visit http://localhost:3000
```

### Security Notes

- ✅ Passwords are bcrypt-hashed (salted, not reversible)
- ✅ Sessions use HMAC signing
- ✅ Cookies are HttpOnly and Secure
- ✅ Admin endpoints require authentication
- ✅ CORS restrictions on API endpoints

### Support

For issues:
1. Check Vercel logs: `vercel logs`
2. Verify environment variables in Vercel dashboard
3. Check PostgreSQL connection string
4. Ensure Blob storage token has write permissions
