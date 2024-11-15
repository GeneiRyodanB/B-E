# Historical Timeline Project

A full-stack application for exploring historical events with associated resources and topics.

## Project Structure

- `backend/` - Quarkus backend with PostgreSQL
- `frontend/` - Next.js frontend with Tailwind CSS

## Backend Setup

1. Requirements:
   - Java 17+
   - Maven 3.8.2+
   - PostgreSQL 15+

```bash
# Start PostgreSQL
docker run -d \
  --name historical-db \
  -e POSTGRES_DB=historical_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:15

# Run backend
cd backend
./mvnw quarkus:dev
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Features

- Historical events timeline
- Resource management for each event
- Topic-based categorization
- Search and filtering capabilities
- Responsive design
- RESTful API

## API Endpoints

- `GET /api/historical` - Get all events
- `GET /api/historical/{id}` - Get specific event
- `POST /api/historical` - Create new event
- `PUT /api/historical/{id}` - Update event
- `DELETE /api/historical/{id}` - Delete event
- `GET /api/historical/topics` - Get all topics
- `POST /api/historical/init` - Initialize sample data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License