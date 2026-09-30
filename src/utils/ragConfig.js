/**
 * RAG System Infrastructure
 * This module prepares the foundation for Retrieval Augmented Generation
 * allowing the chatbot to pull from a knowledge base beyond predefined FAQs
 */

export const ragConfig = {
  // Vector database configuration (placeholder for future integration)
  vectorDb: {
    provider: 'vercel-postgres', // Can be switched to Pinecone, Weaviate, etc.
    embedding: 'openai', // or 'local' for on-device embeddings
    dimension: 1536, // OpenAI embedding dimension
  },

  // Knowledge base sources
  knowledgeSources: {
    faqs: {
      type: 'predefined',
      weight: 1.0,
      updateFrequency: 'manual'
    },
    portfolio: {
      type: 'dynamic',
      weight: 0.8,
      updateFrequency: 'on-upload'
    },
    artistBios: {
      type: 'semi-dynamic',
      weight: 0.9,
      updateFrequency: 'manual'
    },
    processDocs: {
      type: 'static',
      weight: 0.7,
      updateFrequency: 'manual'
    },
    studioInfo: {
      type: 'static',
      weight: 0.95,
      updateFrequency: 'manual'
    }
  },

  // Retrieval settings
  retrieval: {
    topK: 3, // Return top 3 most relevant results
    similarityThreshold: 0.6, // Only return results above 60% similarity
    reranking: true, // Re-rank results for relevance
    contextWindow: 2000, // Max tokens for context
  },

  // LLM settings
  llm: {
    provider: 'anthropic', // or 'openai'
    model: 'claude-opus-5', // or 'gpt-4'
    temperature: 0.7,
    maxTokens: 500,
  }
};

/**
 * Vector store schema for future implementation
 */
export const vectorStoreSchema = {
  documents: {
    id: 'uuid primary key',
    content: 'text - actual knowledge content',
    source: 'enum - which knowledge base this came from',
    embedding: 'vector - 1536-dimensional vector',
    metadata: 'jsonb - additional context',
    created_at: 'timestamp',
    updated_at: 'timestamp'
  }
};

/**
 * Knowledge indexing strategy
 */
export const indexingStrategy = {
  // Chunk documents into optimal sizes for retrieval
  chunkSize: 300, // tokens per chunk
  chunkOverlap: 50, // tokens of overlap between chunks

  // Metadata to extract and index
  metadata: [
    'category',
    'artist',
    'date',
    'relevance_score',
    'source_url',
    'tags'
  ],

  // Update triggers
  triggers: [
    'new_portfolio_item_uploaded',
    'admin_updates_faq',
    'admin_updates_artist_bio',
    'periodic_reindex_weekly'
  ]
};

/**
 * Query expansion for better retrieval
 */
export function expandQuery(userQuery) {
  // Expand user queries with synonyms and related terms
  const expansions = {
    book: ['schedule', 'reserve', 'appointment', 'consultation', 'session'],
    tattoo: ['ink', 'design', 'artwork', 'piece'],
    price: ['cost', 'rate', 'fee', 'amount', 'charge'],
    studio: ['location', 'shop', 'place', 'venue'],
    artist: ['tattooist', 'designer', 'creator', 'pro'],
    healing: ['recovery', 'aftercare', 'maintenance', 'care'],
  };

  let expandedQuery = userQuery.toLowerCase();

  Object.entries(expansions).forEach(([term, synonyms]) => {
    if (expandedQuery.includes(term)) {
      expandedQuery += ` ${synonyms.join(' ')}`;
    }
  });

  return expandedQuery;
}

/**
 * Relevance scoring for hybrid search
 */
export function scoreRelevance(query, document) {
  let score = 0;

  // Exact match bonus
  if (document.content.toLowerCase().includes(query.toLowerCase())) {
    score += 0.3;
  }

  // Category match
  if (document.category === extractCategory(query)) {
    score += 0.2;
  }

  // Recency bonus (fresher content scores higher)
  const daysSinceUpdate = (Date.now() - new Date(document.updated_at)) / (1000 * 60 * 60 * 24);
  if (daysSinceUpdate < 30) score += 0.1;

  // Source weight
  score *= (document.source_weight || 1.0);

  return Math.min(score, 1.0); // Cap at 1.0
}

function extractCategory(query) {
  const categories = ['booking', 'aftercare', 'design', 'studio', 'artists', 'general'];
  for (const cat of categories) {
    if (query.toLowerCase().includes(cat)) return cat;
  }
  return 'general';
}

/**
 * Future integration point for vector embeddings
 */
export async function generateEmbedding(text) {
  // This will integrate with OpenAI or local embeddings
  // For now, returns a placeholder
  console.log('Generating embedding for:', text);
  // TODO: Implement actual embedding generation
  return new Array(1536).fill(0); // Placeholder vector
}

/**
 * Prepare documents for vector storage
 */
export async function prepareDocumentsForRAG(documents) {
  return Promise.all(
    documents.map(async (doc) => ({
      ...doc,
      embedding: await generateEmbedding(doc.content),
      indexed_at: new Date().toISOString()
    }))
  );
}

export default ragConfig;
