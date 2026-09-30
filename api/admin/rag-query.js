import { sql } from '@vercel/postgres';
import { requireAuth } from './middleware.js';

/**
 * RAG Query Handler - Retrieves relevant context from knowledge base
 * Future: Will integrate with vector database for semantic search
 */
async function ragQueryHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, limit = 3 } = req.body;

    if (!query || query.trim().length < 2) {
      return res.status(400).json({ error: 'Query must be at least 2 characters' });
    }

    // For now, use simple text search on the FAQ database
    // Future: Replace with vector similarity search
    const searchQuery = `%${query.toLowerCase()}%`;

    // Search across multiple knowledge sources
    const faqResults = await sql`
      SELECT
        'faq' as source,
        question as title,
        answer as content,
        category,
        0.9 as relevance_score
      FROM faq_items
      WHERE
        question ILIKE ${searchQuery}
        OR answer ILIKE ${searchQuery}
        OR keywords::text ILIKE ${searchQuery}
      LIMIT ${limit};
    `;

    // Search portfolio items for context
    const portfolioResults = await sql`
      SELECT
        'portfolio' as source,
        title,
        CONCAT(bio, ' - Artist: ', artist) as content,
        type as category,
        0.7 as relevance_score
      FROM portfolio_items
      WHERE
        title ILIKE ${searchQuery}
        OR bio ILIKE ${searchQuery}
        OR artist ILIKE ${searchQuery}
      LIMIT ${Math.floor(limit / 2)};
    `;

    // Combine and rank results
    const allResults = [
      ...faqResults.rows,
      ...portfolioResults.rows
    ].sort((a, b) => b.relevance_score - a.relevance_score)
      .slice(0, limit);

    return res.status(200).json({
      success: true,
      query,
      results: allResults,
      resultCount: allResults.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('RAG query error:', error);
    return res.status(500).json({ error: 'Search failed' });
  }
}

export default ragQueryHandler;
