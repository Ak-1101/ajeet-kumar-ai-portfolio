# Ajeet Kumar – Full-Stack Personal Portfolio, Blog & Admin Management Platform

A modern, responsive, and production-ready personal digital platform for **Ajeet Kumar**, focused on Artificial Intelligence (AI), Machine Learning (ML), Generative AI, Agentic AI, Data Science, and EdTech Innovation.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase PostgreSQL**, with a complete content management administration console.

---

## 🌟 Professional Identity & Positioning

- **Name:** Ajeet Kumar
- **Current Role:** Software Engineer (AI/ML Trainer | SME) @ SmartBridge
- **Tagline:** *"Bridging AI, Industry & Education"*
- **Email:** [ajeetkumar.ak1101@gmail.com](mailto:ajeetkumar.ak1101@gmail.com)
- **Phone:** +91 7078546789
- **LinkedIn:** [https://www.linkedin.com/in/itsajeetkumar/](https://www.linkedin.com/in/itsajeetkumar/)
- **GitHub:** [https://github.com/Ak-1101](https://github.com/Ak-1101)
- **Location:** Rudrapur, Uttarakhand, India

---

## 🚀 Key Features

### 1. Public Portfolio & Academic Platform
- **Hero Section:** Profile portrait, professional headline, verified focus areas, and quick actions.
- **Dynamic CV Download:** Top navigation and mobile menu feature a dedicated **Download CV** button routed via `/api/cv/download`, which always points to the latest active CV assigned in the admin panel.
- **About Me (`/about`):** Detailed professional bio, teaching philosophy on experiential learning, career journey, vision, and verified degrees (MCA Honours from AKTU, BCA from MJPRU).
- **Professional Experience Timeline (`/experience`):** Chronological history across SmartBridge, CollegeDekho (Dev Bhoomi Uttarakhand University & Sigma University deployments), Drona Foundation, NASSCOM FutureSkills Prime, and Droan College.
- **Skills & Technical Domains (`/skills`):** 14 structured categories with clean tags and verified proficiency levels (no fabricated percentage bars).
- **Project Portfolio Gallery (`/projects`):** Interactive gallery covering all 10 verified projects (Generative AI, Agentic AI, Multimodal systems, Computer Vision, and Data Science) with status badges distinguishing concepts and mentored projects from completed software.
- **Research & Publications (`/research`):** Dedicated presentation profile for *"LowRankAutoT: Low-Rank Autoencoder Transformer for Lossy Compression on Edge IoT Infrastructure"* presented at **CIGAI 2026** (AITAM, Andhra Pradesh) with verified presentation certificate view.
- **Certifications & Credentials (`/certifications`):** Authentic certificates from CollegeDekho (Gold Badge FDP, TEQ 9.4), Cisco Networking Academy, AWS, Databricks Academy, NASSCOM/SFJ, and IIT Bombay.
- **Blog & Personal Daily Journal (`/blog`):** Technical article publication hub alongside a daily personal journal section with category filtering, reading time, and syntax highlighting.
- **Direct Contact Channel (`/contact`):** Validated contact form with anti-spam honeypot storing inquiries directly into the database.

### 2. Secure Admin Management System (`/admin`)
- **Dashboard (`/admin/dashboard`):** Real-time analytics, post status, project counters, and contact inquiry alerts.
- **Full Content CRUD:**
  - `/admin/profile`: Update bio, headline, philosophy, vision, and contact details.
  - `/admin/experience`: Add, edit, or delete professional work milestones.
  - `/admin/education`: Maintain degree qualifications and attached certificates.
  - `/admin/skills`: Manage competencies across 14 technical domains.
  - `/admin/projects`: Manage problem statements, solutions, technologies, and status flags.
  - `/admin/research`: Manage paper presentation records and certificate URLs.
  - `/admin/certifications`: Register new credentials, issue dates, and certificate files.
  - `/admin/documents`: Document manager to upload new CV PDFs, toggle public/private visibility, and set the **Current Active CV**.
  - `/admin/blogs`: Blog and journal article creator with markdown formatting shortcuts and SEO metadata.
  - `/admin/media`: Central media library for inspecting, copying, and organizing asset URLs.
  - `/admin/messages`: View submissions, mark inquiries as read, and trigger email responses.
  - `/admin/settings`: Manage site title, meta description, and maintenance mode.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS & CSS Variables |
| **Icons** | Lucide React |
| **Database** | Supabase PostgreSQL |
| **Authentication** | Supabase Auth & Secure Session Cookies |
| **File Storage** | Supabase Storage & Local Public Fallback |
| **Forms & Validation**| React Hook Form & Zod |
| **Deployment** | Vercel Ready |

---

## 💻 Local Setup & Execution

### Prerequisites
- Node.js `v18.18+` or `v20+` (tested on Node `v26.13.1` on Windows 11)
- npm `v9+` or `v10+`

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ak-1101/ajeet-kumar-ai-portfolio.git
   cd ajeet-kumar-ai-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file based on `.env.example`:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

   # Initial Admin Credentials
   ADMIN_EMAIL=ajeetkumar.ak1101@gmail.com
   ADMIN_INITIAL_PASSWORD=AjeetAdmin2026!

   # Site URL
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Access the Admin Panel:**
   Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
   - **Email:** `ajeetkumar.ak1101@gmail.com`
   - **Password:** `AjeetAdmin2026!`

6. **Production Build & Type Check:**
   ```bash
   npm run build
   npm run start
   ```

---

## 🗄️ Database Setup (Supabase)

1. Create a new project in [Supabase](https://supabase.com).
2. Open the **SQL Editor** in the Supabase Dashboard.
3. Open `supabase/migrations/20261123000000_init_schema_and_seed.sql` and run the script.
4. This script will:
   - Create all 15 relational tables (`profiles`, `experiences`, `education`, `skills`, `projects`, `research`, `certifications`, `documents`, `blog_posts`, `blog_categories`, `media`, `contact_messages`, etc.).
   - Configure Row Level Security (RLS) policies allowing public read access for published assets and full access for authenticated admins.
   - Seed all verified data, project histories, certificates, and publications.
5. In **Storage**, create public buckets:
   - `docs` (for CV and public papers)
   - `certs` (for degree and credential scans)
   - `media` (for blog and profile imagery)

---

## ☁️ Vercel Deployment Instructions

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Ajeet Kumar AI Portfolio"
   git remote add origin https://github.com/Ak-1101/ajeet-kumar-ai-portfolio.git
   git branch -M main
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the `ajeet-kumar-ai-portfolio` GitHub repository.
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_EMAIL` (`ajeetkumar.ak1101@gmail.com`)
   - `ADMIN_INITIAL_PASSWORD`
   - `NEXT_PUBLIC_SITE_URL` (your custom Vercel domain)
5. Click **Deploy**. Vercel will build and deploy the production bundle with 0 errors.

---

## 📄 License
Created for **Ajeet Kumar**. All rights reserved.
