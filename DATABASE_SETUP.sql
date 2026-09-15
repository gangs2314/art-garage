-- SQL to run once in Neon SQL editor to create the portfolio_items table

CREATE TABLE portfolio_items (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL CHECK (type IN ('photo', 'video')),
  title VARCHAR(255) NOT NULL,
  bio TEXT,
  artist VARCHAR(50) NOT NULL CHECK (artist IN ('sude', 'sagar')),
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on artist for faster queries
CREATE INDEX idx_portfolio_items_artist ON portfolio_items(artist);

-- Create index on created_at for sorting
CREATE INDEX idx_portfolio_items_created_at ON portfolio_items(created_at DESC);
