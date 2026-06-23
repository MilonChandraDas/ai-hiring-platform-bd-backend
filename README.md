# 🤖 AI Hiring Platform — Backend

A robust REST API for an AI-powered hiring platform built with **NestJS** and **TypeScript**. Features JWT authentication, AI resume analysis via Google Gemini, file uploads via Cloudinary, and a PostgreSQL database managed with Prisma ORM.

🔗 **Live API:** [ai-hiring-platform-bd-backend.onrender.com](https://ai-hiring-platform-bd-backend.onrender.com)  
🔗 **Frontend Repo:** [ai-hiring-platform-bd](https://github.com/MilonChandraDas/ai-hiring-platform-bd)  
🔗 **API Docs (Swagger):** [/api](https://ai-hiring-platform-bd-backend.onrender.com/api)

---

## ✨ Features

- 🔐 JWT Authentication with bcrypt password hashing
- 🤖 AI Resume Analysis with Google Gemini (ATS Score + Feedback)
- 📁 PDF Resume Upload via Cloudinary
- 🏢 Company & Job Management
- 📋 Application Tracking System
- 🎙️ Interview Scheduling
- 📚 Swagger API Documentation

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| NestJS | Node.js framework |
| TypeScript | Type safety |
| PostgreSQL | Database |
| Prisma ORM v6 | Database management |
| JWT + bcrypt | Authentication |
| Google Gemini AI | Resume analysis |
| Cloudinary | File storage |
| Swagger | API documentation |
| pdf-parse | PDF text extraction |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v20+
- PostgreSQL database

### Installation

```bash
# Clone the repository
git clone https://github.com/MilonChandraDas/ai-hiring-platform-bd-backend.git
cd ai-hiring-platform-bd-backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@host/dbname"
JWT_SECRET="your-jwt-secret"
GEMINI_API_KEY="your-gemini-api-key"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio
npx prisma studio
```

### Run Development Server

```bash
npm run start:dev
```

API will be available at [http://localhost:3000](http://localhost:3000)  
Swagger docs at [http://localhost:3000/api](http://localhost:3000/api)

---

## 📁 Project Structure

```
src/
├── auth/                   # JWT auth, login, register
├── users/                  # User management
├── companies/              # Company CRUD
├── jobs/                   # Job postings
├── resumes/                # Resume upload + AI analysis
├── applications/           # Job applications
├── interviews/             # Interview scheduling
├── ai/                     # Gemini AI integration
├── prisma/                 # Prisma service
└── main.ts
prisma/
└── schema.prisma           # Database schema
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login user |

### Companies
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/companies` | Create company |
| GET | `/companies` | Get all companies |
| GET | `/companies/my-company` | Get my company |

### Jobs
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/jobs` | Post a job |
| GET | `/jobs` | Get all jobs |
| GET | `/jobs/:id` | Get job by ID |

### Applications
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/applications` | Apply to job |
| GET | `/applications/me` | My applications |
| GET | `/applications/recruiter` | Recruiter's applications |

### Interviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/interviews` | Schedule interview |
| GET | `/interviews/me` | My interviews |

### Resumes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/resumes` | Create resume (with AI analysis) |
| GET | `/resumes/me` | My resumes |

---

## 🌐 Deployment

Deployed on **Render** with a managed PostgreSQL database.

```bash
# Build for production
npm run build

# Start production server
npm run start:prod
```

---

## 👨‍💻 Author

**Milon Chandra Das**  
GitHub: [@MilonChandraDas](https://github.com/MilonChandraDas)