# Task: Connect MongoDB data to frontend via backend

## Current Project Status:
The project already has all the necessary code in place:
- ✅ MongoDB models (Resource, Classroom, Lab, Library, Seminar, SpecialLab)
- ✅ Backend API routes with endpoints
- ✅ Frontend components that fetch from API
- ✅ Seed data script ready
- ✅ Dependencies installed (node_modules exists)

## Plan:
1. [x] Analyze project structure - COMPLETED
2. [ ] Start MongoDB (if not running)
3. [ ] Start backend server
4. [ ] Run seed script to populate database
5. [ ] Start frontend

## API Endpoints:
- GET /api/resources/classrooms - Get classrooms
- GET /api/resources/labs - Get labs
- GET /api/resources/libraries - Get libraries
- GET /api/resources/seminars - Get seminars
- GET /api/resources/speciallabs - Get special labs
- POST /api/resources/seed - Seed database with sample data

## To Run:
1. Backend: `cd backend && npm run dev` (starts on port 5000)
2. Seed data: `cd backend && node seed.js`
3. Frontend: `cd CRN && npm run dev`
