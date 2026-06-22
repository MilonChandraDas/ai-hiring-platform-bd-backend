# 🤖 AI Developer Hiring Platform — Backend

A production-ready, AI-powered hiring platform built with NestJS, PostgreSQL, and Gemini AI.

## 🌐 Live Demo

- **Frontend:** https://ai-hiring-platform-frontend.vercel.app
- **Backend API:** https://ai-hiring-platform-backend-1.onrender.com

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | NestJS + TypeScript |
| Database | PostgreSQL + Prisma ORM |
| Authentication | JWT + bcrypt |
| AI | Google Gemini API |
| File Storage | Cloudinary |
| Deployment | Render |

---

## ✨ Features

- ✅ **Role-based Authentication** — Candidate, Recruiter, Admin
- ✅ **Company Management** — Create and manage company profiles
- ✅ **Job Posting** — Post, list, and filter job openings
- ✅ **Resume System** — Upload CV with Cloudinary, AI-powered ATS scoring
- ✅ **Application Tracking** — Apply for jobs, track application status
- ✅ **Interview Scheduling** — Schedule and manage interviews
- ✅ **Coding Tests** — Create and manage coding assessments
- ✅ **AI Resume Analysis** — Gemini AI analyzes resumes and gives ATS score + feedback

---

## 📊 Database Schema

```
Users ──────── Resumes
  │               │
  ├── Jobs ────── Applications
  │       │           │
  │    Companies   Interviews
  │
  └── CodingTests
```

**Tables:** users, companies, jobs, resumes, applications, interviews, coding_tests

---

## 🔑 API Endpoints

### Auth
```
POST /auth/register   — Register new user
POST /auth/login      — Login and get JWT token
```

### Users
```
GET    /users/me      — Get current user profile
PATCH  /users/me      — Update profile
```

### Companies
```
POST   /companies     — Create company (Recruiter only)
GET    /companies     — List all companies
```

### Jobs
```
POST   /jobs          — Post a job (Recruiter only)
GET    /jobs          — List all jobs
GET    /jobs/:id      — Get job details
```

### Resumes
```
POST   /resumes       — Create resume + AI analysis
GET    /resumes/me    — Get my resumes
```

### Applications
```
POST   /applications      — Apply for a job
GET    /applications/me   — Get my applications
```

### Interviews
```
POST   /interviews        — Schedule interview
GET    /interviews/me     — Get my interviews
```

### Coding Tests
```
POST   /coding-tests      — Create coding test
GET    /coding-tests/me   — Get my tests
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- PostgreSQL
- Git

### Installation

```bash
# Clone the repo
git clone https://github.com/MilonDas22/ai-hiring-platform-backend.git
cd ai-hiring-platform-backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Fill in your .env values

# Setup database
npx prisma db push

# Run development server
npm run start:dev
```

### Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/ai_hiring_platform
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🏗️ Project Structure

```
src/
├── auth/           — Authentication (JWT, bcrypt)
├── users/          — User profile management
├── companies/      — Company CRUD
├── jobs/           — Job posting and listing
├── resumes/        — Resume with AI analysis
├── applications/   — Job applications
├── interviews/     — Interview scheduling
├── coding-tests/   — Coding assessments
├── ai/             — Gemini AI integration
├── cloudinary/     — File upload service
└── prisma/         — Database service
```

---

## 👨‍💻 Author

Built by **Milon Das** as a production-ready portfolio project demonstrating:
- Full-stack development
- AI integration
- Scalable backend architecture
- Database design
- Cloud deployment