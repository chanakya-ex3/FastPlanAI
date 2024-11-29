# FastPlanAI

FastPlanAI is an intelligent project management application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) integrated with Generative AI (GenAI). It assists users in efficiently planning, managing, and executing projects with AI-driven features like roadmap generation, tech stack suggestions, and skill-based task allocation.

## Features

- **AI-Driven Tech Stack Suggestions**: Recommends optimal technology stacks based on the project description.
- **Automated Task Allocation**: Assigns tasks dynamically based on user skills and experience.
- **Dynamic Roadmaps**: Generates predictive deadlines and personalized learning paths for project team members.
- **Interactive Dashboard**: Provides a user-friendly interface to track project progress and updates.
- **Cloud-Based Solution**: Hosted on [FastPlanAI](https://fastplanai.web.app).

---

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Cloud Services**: AWS (Bedrock for GenAI, S3 for storage, Lambda for serverless functions)
- **Generative AI**: OpenAI or AWS Bedrock for AI capabilities

## Demo
 - [Video Link](https://drive.google.com/file/d/1JzmaQHuLbizMb_iiE_smvAtQ1MMfpJ5p/view?usp=sharing)
---

## Getting Started

### Prerequisites
1. Node.js and npm installed.


## Setup Instructions

### Step 1: Clone the repository

```sh
git clone https://github.com/chanakya-ex3/FastPlanAI.git
cd FastPlanAI
```
### Step 2: Setup Backend
```sh
cd backend
npm i
```
### Step 3: ENV Variables in Backend Folder
- MONGO_URI = ""
-  JWT_SECRET=""
- GEMINI_API_KEY = ""

### Step 4: Run Backend
```sh
node index.js
```

### Step 5: Setup frontend
```sh
cd frontend
npm i
```
### Step 6: ENV Variables in Frontned Folder
- VITE_APP_BASE_URL = (API_URL)

### Step 4: Run Frontend
```sh
npm run dev
```
