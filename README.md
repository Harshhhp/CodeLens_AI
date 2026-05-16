# CodeLens AI

<div align="center">

### AI-Powered GitHub Repository Analyzer

Understand any codebase instantly with intelligent AI-driven insights, architecture analysis, and repository summaries.

<br />
Live Demo

https://code-lens-ai-iota.vercel.app

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge\&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Blue?style=for-the-badge\&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38BDF8?style=for-the-badge\&logo=tailwindcss\&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge\&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge\&logo=postgresql\&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-8E75B2?style=for-the-badge\&logo=google-gemini\&logoColor=white)

</div>

---

## Overview

**CodeLens AI** is an AI-powered GitHub repository analyzer that helps developers quickly understand complex codebases through intelligent summaries, architecture insights, repository analysis, and AI-generated explanations.

Instead of manually exploring hundreds of files, developers can simply provide a GitHub repository URL and instantly receive meaningful insights about the project structure, technologies, and functionality.

---

## Features

### AI Repository Analysis

* Analyze public GitHub repositories using AI
* Generate intelligent project summaries
* Understand repository architecture instantly
* Detect technologies and frameworks used

### Smart Insights

* AI-generated code explanations
* Repository structure understanding
* Key functionality breakdown
* Important file identification

### Developer Friendly UI

* Modern responsive design
* Beautiful dark-themed interface
* Fast and interactive experience
* Clean dashboard and repository cards

### Authentication & User Experience

* GitHub authentication
* Personalized dashboard
* Repository analysis history
* Secure user sessions

---

## Tech Stack

### Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* ShadCN UI

### Backend

* Next.js Server Actions
* Prisma ORM
* PostgreSQL

### AI Integration

* Gemini AI API

### Authentication

* NextAuth.js
* GitHub OAuth

---


## Installation

Clone the repository:

```bash
git clone https://github.com/Harshhhp/CodeLens-AI.git
```

Move into the project folder:

```bash
cd CodeLens-AI
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory and add:

```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GITHUB_ID=
GITHUB_SECRET=
GEMINI_API_KEY=
```

---

## Database Setup

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Generate Prisma client:

```bash
npx prisma generate
```

---

## Run the Project

Start the development server:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## Project Structure

```bash
CodeLens-AI/
│
├── app/
├── actions/
├── components/
├── lib/
├── prisma/
├── public/
├── styles/
└── utils/
```

---

## How It Works

1. User logs in with GitHub
2. Paste a GitHub repository URL
3. CodeLens AI fetches repository data
4. AI analyzes the repository structure and files
5. Intelligent insights and summaries are generated
6. Results are displayed in a clean dashboard

---

## Future Improvements

* Multi-repository comparison
* AI-generated documentation
* Code quality scoring
* Bug detection
* Pull request analysis
* Team collaboration features
* Repository visualization graphs
* AI chat with repository context

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Author

### Harsh Pandey

* GitHub: [https://github.com/Harshhhp](https://github.com/Harshhhp)

---

<div align="center">

### Built with ❤️ using Next.js, AI, and modern web technologies.

</div>
