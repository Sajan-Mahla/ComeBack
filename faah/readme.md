# Mini Search API

A simple Node.js + Express API to search items from a static dataset.

## Features
- Search items using query params
- Case insensitive search
- Handles empty queries
- Returns JSON response

## Tech Stack
- Node.js
- Express

## API Endpoint

GET /api/search?q=your_query

## Example

/search?q=chai

Response:
{
  "search": "chai",
  "results": ["chai"]
}

## Author
Sajan(apple i'm coming 🚀)
