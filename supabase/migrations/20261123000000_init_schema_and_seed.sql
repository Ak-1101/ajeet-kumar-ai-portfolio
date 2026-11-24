-- =======================================================================
-- AJEET KUMAR - PORTFOLIO, BLOG & ADMIN DATABASE SCHEMA
-- Compatible with Supabase PostgreSQL & Row Level Security (RLS)
-- =======================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS & DOMAINS
DO $$ BEGIN
  CREATE TYPE project_status AS ENUM ('completed', 'concept', 'prototype', 'mentored', 'in_progress');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE document_visibility AS ENUM ('public', 'private');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE blog_status AS ENUM ('draft', 'published', 'scheduled', 'archived');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL DEFAULT 'Ajeet Kumar',
  headline TEXT NOT NULL DEFAULT 'Software Engineer – AI/ML Trainer | Subject Matter Expert (SME)',
  tagline TEXT NOT NULL DEFAULT 'Bridging AI, Industry & Education',
  short_bio TEXT NOT NULL DEFAULT 'I work at the intersection of Artificial Intelligence, technology and education. My focus includes AI/ML, Generative AI, Agentic AI, technical training, academic innovation and developing industry-ready learning experiences.',
  detailed_bio TEXT,
  teaching_philosophy TEXT,
  career_journey TEXT,
  career_vision TEXT,
  avatar_url TEXT DEFAULT '/assets/ajeet-kumar-profile.jpg',
  email TEXT NOT NULL DEFAULT 'ajeetkumar.ak1101@gmail.com',
  phone TEXT DEFAULT '7078546789',
  location TEXT DEFAULT 'Rudrapur, Uttarakhand, India',
  linkedin_url TEXT DEFAULT 'https://www.linkedin.com/in/itsajeetkumar/',
  github_url TEXT DEFAULT 'https://github.com/Ak-1101',
  cv_url TEXT DEFAULT '/docs/Ajeet_Kumar_CV.pdf',
  is_available_for_hire BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company TEXT NOT NULL,
  deployment_details TEXT,
  role TEXT NOT NULL,
  location TEXT,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  is_current BOOLEAN DEFAULT false,
  description TEXT NOT NULL,
  responsibilities JSONB DEFAULT '[]'::jsonb,
  technologies JSONB DEFAULT '[]'::jsonb,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS public.education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  university TEXT,
  location TEXT,
  start_year TEXT NOT NULL,
  end_year TEXT NOT NULL,
  grade TEXT,
  honors TEXT,
  certificate_url TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  proficiency_level TEXT DEFAULT 'Advanced', -- e.g. 'Advanced', 'Proficient', 'Core'
  featured BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT NOT NULL,
  problem_statement TEXT,
  solution TEXT,
  detailed_explanation TEXT,
  category TEXT NOT NULL,
  status project_status DEFAULT 'completed',
  technologies JSONB DEFAULT '[]'::jsonb,
  thumbnail_url TEXT,
  github_url TEXT,
  live_url TEXT,
  demo_video_url TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. PROJECT MEDIA TABLE
CREATE TABLE IF NOT EXISTS public.project_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL DEFAULT 'image', -- image or video
  url TEXT NOT NULL,
  caption TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. RESEARCH TABLE
CREATE TABLE IF NOT EXISTS public.research (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  conference_name TEXT NOT NULL,
  conference_dates TEXT NOT NULL,
  location TEXT NOT NULL,
  publishing_partner TEXT,
  authors TEXT NOT NULL,
  abstract TEXT,
  paper_url TEXT,
  certificate_url TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. CERTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  issuing_organization TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  credential_id TEXT,
  credential_url TEXT,
  certificate_file_url TEXT,
  badge_details TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size TEXT,
  is_current_cv BOOLEAN DEFAULT false,
  visibility document_visibility DEFAULT 'public',
  featured BOOLEAN DEFAULT false,
  download_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. BLOG CATEGORIES & TAGS
CREATE TABLE IF NOT EXISTS public.blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.blog_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image_url TEXT,
  category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  status blog_status DEFAULT 'published',
  is_journal BOOLEAN DEFAULT false,
  is_private BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  reading_time_minutes INT DEFAULT 5,
  views INT DEFAULT 0,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  scheduled_at TIMESTAMPTZ,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.blog_post_tags (
  post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- 14. MEDIA LIBRARY
CREATE TABLE IF NOT EXISTS public.media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  alt_text TEXT,
  file_type TEXT NOT NULL, -- image, video, pdf, document
  mime_type TEXT,
  file_url TEXT NOT NULL,
  file_size INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. CONTACT MESSAGES
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  inquiry_type TEXT NOT NULL DEFAULT 'Professional', -- Professional, Collaboration, Training, General
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. SITE SETTINGS
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_title TEXT NOT NULL DEFAULT 'Ajeet Kumar | AI/ML Trainer & Generative AI Specialist',
  site_description TEXT NOT NULL DEFAULT 'Personal Portfolio, Blog & Academic Platform of Ajeet Kumar.',
  current_cv_id UUID REFERENCES public.documents(id) ON DELETE SET NULL,
  contact_email TEXT DEFAULT 'ajeetkumar.ak1101@gmail.com',
  contact_phone TEXT DEFAULT '7078546789',
  linkedin_url TEXT DEFAULT 'https://www.linkedin.com/in/itsajeetkumar/',
  github_url TEXT DEFAULT 'https://github.com/Ak-1101',
  maintenance_mode BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public experiences are viewable by everyone" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Public education is viewable by everyone" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public skills are viewable by everyone" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public projects are viewable by everyone" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public project_media is viewable by everyone" ON public.project_media FOR SELECT USING (true);
CREATE POLICY "Public research is viewable by everyone" ON public.research FOR SELECT USING (true);
CREATE POLICY "Public certifications are viewable by everyone" ON public.certifications FOR SELECT USING (true);
CREATE POLICY "Public documents are viewable by everyone" ON public.documents FOR SELECT USING (visibility = 'public');
CREATE POLICY "Public blog categories are viewable by everyone" ON public.blog_categories FOR SELECT USING (true);
CREATE POLICY "Public blog tags are viewable by everyone" ON public.blog_tags FOR SELECT USING (true);
CREATE POLICY "Published public blogs are viewable by everyone" ON public.blog_posts FOR SELECT USING (status = 'published' AND is_private = false);
CREATE POLICY "Public blog_post_tags are viewable by everyone" ON public.blog_post_tags FOR SELECT USING (true);
CREATE POLICY "Public media is viewable by everyone" ON public.media FOR SELECT USING (true);
CREATE POLICY "Public site_settings are viewable by everyone" ON public.site_settings FOR SELECT USING (true);

-- CONTACT INSERT POLICY (Anyone can submit contact form)
CREATE POLICY "Anyone can submit contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- ADMIN AUTH POLICIES (Authenticated users have full access)
CREATE POLICY "Admins have full access to profiles" ON public.profiles FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins have full access to experiences" ON public.experiences FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins have full access to education" ON public.education FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins have full access to skills" ON public.skills FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins have full access to projects" ON public.projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins have full access to project_media" ON public.project_media FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins have full access to research" ON public.research FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins have full access to certifications" ON public.certifications FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins have full access to documents" ON public.documents FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins have full access to blog_categories" ON public.blog_categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins have full access to blog_tags" ON public.blog_tags FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins have full access to blog_posts" ON public.blog_posts FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins have full access to blog_post_tags" ON public.blog_post_tags FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins have full access to media" ON public.media FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins have full access to contact_messages" ON public.contact_messages FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins have full access to site_settings" ON public.site_settings FOR ALL TO authenticated USING (true);

-- =======================================================================
-- SEED DATA (VERIFIED DIRECTLY FROM AJEET KUMAR'S RESUME & CERTIFICATES)
-- =======================================================================

-- 1. Profile Seed
INSERT INTO public.profiles (
  full_name, headline, tagline, short_bio, detailed_bio, teaching_philosophy,
  career_journey, career_vision, avatar_url, email, phone, location,
  linkedin_url, github_url, cv_url
) VALUES (
  'Ajeet Kumar',
  'Software Engineer – AI/ML Trainer | Subject Matter Expert (SME)',
  'Bridging AI, Industry & Education',
  'I work at the intersection of Artificial Intelligence, technology and education. My focus includes AI/ML, Generative AI, Agentic AI, technical training, academic innovation and developing industry-ready learning experiences.',
  'AI/ML Trainer and Software Engineering professional with experience in technical training, curriculum development, academic program coordination, and hands-on project mentoring. Specializes in Generative AI (GenAI), Agentic AI, prompt engineering, machine learning, deep learning, NLP, Python programming, data science, and application development. Experienced in explaining technical concepts through practical demonstrations, real-world use cases, experiential-learning projects, and learner-focused instruction.',
  'My teaching philosophy is rooted in Experiential Learning: demystifying complex mathematical and algorithmic AI concepts through intuitive analogies, hands-on architectural diagrams, live coding demonstrations, and real-world capstone projects that cultivate critical problem-solving and industry readiness.',
  'Graduated with BCA (First Division) and MCA (First Division with Honours), advancing from foundational software engineering into academia as Assistant Professor and Program Coordinator, and subsequently into specialized industry AI/ML training and SME roles with organizations like SmartBridge, Dev Bhoomi Uttarakhand University, Sigma University, Drona Foundation, and NASSCOM FutureSkills Prime.',
  'To lead cutting-edge AI and data science education programs at scale, building transformative curricula in Generative AI and Agentic Systems that empower next-generation engineers and foster high-impact academic-industry collaboration.',
  '/assets/ajeet-kumar-profile.jpg',
  'ajeetkumar.ak1101@gmail.com',
  '7078546789',
  'Rudrapur, Uttarakhand, India',
  'https://www.linkedin.com/in/itsajeetkumar/',
  'https://github.com/Ak-1101',
  '/docs/Ajeet_Kumar_CV.pdf'
) ON CONFLICT DO NOTHING;

-- 2. Experiences Seed (Exact from CV)
INSERT INTO public.experiences (company, deployment_details, role, location, start_date, end_date, is_current, description, responsibilities, technologies, display_order)
VALUES
(
  'SmartBridge',
  NULL,
  'Software Engineer (AI/ML Trainer | SME)',
  'India',
  'Aug 2026',
  'Present',
  true,
  'Deliver technical training and hands-on learning sessions in Generative AI (GenAI), Agentic AI, AI/ML, Python, prompt engineering, and related emerging technologies.',
  '[
    "Deliver technical training and hands-on learning sessions in Generative AI (GenAI), Agentic AI, AI/ML, Python, prompt engineering, and related emerging technologies.",
    "Explain LLM concepts, AI agent workflows, tool use, retrieval-based applications, and practical GenAI development through demonstrations and project-based exercises.",
    "Mentor learners through experiential-learning (EL) and capstone projects, supporting ideation, requirement analysis, solution design, Agile planning, development, and testing.",
    "Guide teams in preparing project artefacts such as problem statements, use cases, user stories, work breakdown structures (WBS), Software Requirements Specifications (SRS), data-flow diagrams, and solution architecture.",
    "Support coding practices, debugging, code quality, functional testing, performance testing fundamentals, and technical documentation.",
    "Facilitate learner engagement and doubt resolution through live sessions, project discussions, and digital learning channels.",
    "Develop training materials, practical labs, examples, assessments, and industry-oriented learning activities aligned with current AI/ML practices."
  ]'::jsonb,
  '["Generative AI", "Agentic AI", "AI Agents", "Tool Calling", "RAG", "Gemini API", "Prompt Engineering", "Python", "Streamlit", "SDLC", "Agile"]'::jsonb,
  1
),
(
  'CollegeDekho',
  'Deployed at Dev Bhoomi Uttarakhand University (DBUU)',
  'Assistant Professor / BCA-MCA Program Coordinator',
  'Dehradun, Uttarakhand',
  'Oct 2025',
  'Aug 2026',
  false,
  'Coordinated BCA and MCA academic programs and supported academic operations, scheduling, faculty coordination, and student progress.',
  '[
    "Coordinated BCA and MCA academic programs and supported academic operations, scheduling, faculty coordination, and student progress.",
    "Delivered lectures and practical sessions in Artificial Intelligence, Machine Learning, Data Science, Python, and related computer science subjects.",
    "Mentored students on academic projects, research activities, technical documentation, and presentations.",
    "Contributed to curriculum planning, lesson plans, assessments, academic records, workshops, seminars, and masterclasses."
  ]'::jsonb,
  '["Artificial Intelligence", "Machine Learning", "Data Science", "Python", "Curriculum Design", "Program Coordination", "Academic Administration"]'::jsonb,
  2
),
(
  'CollegeDekho',
  'Deployed at Sigma University, Vadodara',
  'Assistant Professor | Tech Faculty (AI & Data Science)',
  'Vadodara, Gujarat',
  'Aug 2024',
  'Oct 2025',
  false,
  'Delivered lectures, tutorials, and practical sessions in Artificial Intelligence, Data Science, and related computing subjects.',
  '[
    "Delivered lectures, tutorials, and practical sessions in Artificial Intelligence, Data Science, and related computing subjects.",
    "Guided students on projects, research work, and technical presentations.",
    "Supported curriculum development and course-content updates to align learning outcomes with academic and industry requirements.",
    "Participated in departmental coordination, academic administration, and student mentoring."
  ]'::jsonb,
  '["AI & Data Science", "Curriculum Development", "Student Mentoring", "Python", "Applied AI"]'::jsonb,
  3
),
(
  'Drona Foundation',
  NULL,
  'Guest Faculty / IT Trainer',
  'India',
  'Oct 2024',
  'Oct 2025',
  false,
  'Conducted hands-on Python programming sessions covering programming fundamentals, data structures, file handling, and object-oriented programming (OOP).',
  '[
    "Conducted hands-on Python programming sessions covering programming fundamentals, data structures, file handling, and object-oriented programming (OOP).",
    "Used real-world examples and assignments to reinforce programming concepts and practical problem-solving.",
    "Contributed to curriculum design, experiential learning, and program evaluation and improvement."
  ]'::jsonb,
  '["Python Programming", "Data Structures", "OOP", "Hands-on Labs"]'::jsonb,
  4
),
(
  'Self-Initiated',
  NULL,
  'Freelance Project Developer | AI-Based Design Tool',
  'Remote',
  '2024',
  '2024',
  false,
  'Developed a web-based AI design tool concept for generating social media creatives, YouTube thumbnails, and product logos using prompts.',
  '[
    "Developed a web-based AI design tool concept for generating social media creatives, YouTube thumbnails, and product logos using prompts.",
    "Explored prompt engineering and AI image-generation workflows to convert text prompts into visual outputs."
  ]'::jsonb,
  '["Generative AI", "Prompt Engineering", "Image Generation", "Web Development"]'::jsonb,
  5
),
(
  'NASSCOM FutureSkills Prime / Uptoskills',
  NULL,
  'Guest Faculty / IT Trainer',
  'India',
  'Jul 2023',
  'Aug 2024',
  false,
  'Delivered an 18-hour Digital 101 training program across two days on Artificial Intelligence, Machine Learning, Deep Learning, Cybersecurity, and emerging technologies.',
  '[
    "Delivered an 18-hour Digital 101 training program across two days on Artificial Intelligence, Machine Learning, Deep Learning, Cybersecurity, and emerging technologies.",
    "Facilitated interactive discussions, hands-on activities, and end-of-program assessments to reinforce learner understanding."
  ]'::jsonb,
  '["AI/ML", "Deep Learning", "Cybersecurity", "Emerging Tech Training"]'::jsonb,
  6
),
(
  'Droan College of Education and Technology',
  NULL,
  'Assistant Professor, Computer Science and Engineering',
  'Rudrapur, Uttarakhand',
  'Jun 2022',
  'Jul 2023',
  false,
  'Taught C, C++, Python, DBMS, Discrete Mathematics, Business Mathematics, Cloud Computing, and Artificial Intelligence.',
  '[
    "Taught C, C++, Python, DBMS, Discrete Mathematics, Business Mathematics, Cloud Computing, and Artificial Intelligence.",
    "Prepared lesson plans, course materials, assessments, and academic records; mentored students on academic and research projects.",
    "Supported curriculum delivery and student learning through structured lectures and practical exercises."
  ]'::jsonb,
  '["C", "C++", "Python", "DBMS", "Discrete Mathematics", "Cloud Computing", "AI"]'::jsonb,
  7
);

-- 3. Education Seed (Verified with uploaded certificates)
INSERT INTO public.education (degree, institution, university, location, start_year, end_year, grade, honors, certificate_url, display_order)
VALUES
(
  'Master of Computer Applications (MCA)',
  'Khandelwal College of Management and Technology, Bareilly',
  'Dr. A.P.J. Abdul Kalam Technical University (AKTU), Uttar Pradesh',
  'Bareilly, UP',
  '2020',
  '2022',
  'CGPA: 7.6 / 10',
  'First Division with Honours',
  '/certs/mca-degree-certificate.jpg',
  1
),
(
  'Bachelor of Computer Applications (BCA)',
  'Apex College of Management & Computer Applications, Rampur',
  'M.J.P. Rohilkhand University, Bareilly',
  'Rampur / Bareilly, UP',
  '2017',
  '2020',
  'CGPA: 6.8 / 10',
  'First Division',
  '/certs/bca-degree-certificate.jpg',
  2
);

-- 4. Research Seed (Verified with uploaded certificate)
INSERT INTO public.research (title, conference_name, conference_dates, location, publishing_partner, authors, abstract, certificate_url, display_order)
VALUES
(
  'LowRankAutoT: Low-Rank Autoencoder Transformer for Lossy Compression on Edge IoT Infrastructure',
  '2nd International Conference on Mathematical Modelling in Computational Intelligence and Generative AI (CIGAI 2026)',
  '16–17 July 2026',
  'Aditya Institute of Technology and Management (AITAM), Tekkali, Andhra Pradesh, India',
  'Springer Publishing Partner',
  'Ajeet Kumar (School of Engineering & Computing, Dev Bhoomi Uttarakhand University / ImaginXP, CollegeDekho)',
  'Presents an innovative Low-Rank Autoencoder Transformer architecture designed for resource-constrained Edge IoT devices. Addresses critical bottlenecks in sensory and high-dimensional streaming data transmission by combining low-rank factorized representations with lightweight self-attention mechanisms to achieve efficient lossy compression while maintaining downstream reconstruction and inferencing fidelity.',
  '/certs/cigai-2026-research-certificate.jpg',
  1
);

-- 5. Certifications Seed (Chronological sequence verified with uploaded documents)
INSERT INTO public.certifications (title, issuing_organization, issue_date, credential_id, credential_url, certificate_file_url, badge_details, display_order)
VALUES
(
  'Generative AI Fundamentals',
  'Databricks Academy',
  '12 Nov 2026',
  'DB-GENAI-2026',
  NULL,
  '/certs/databricks-generative-ai.pdf',
  'Databricks Certified Associate',
  1
),
(
  'Certificate of Completion on GEN AI NASSCOM',
  'SFJ / NASSCOM Industry Competency Standards',
  '18 Sep 2026',
  'SFJ-GENAI-NASSCOM',
  NULL,
  '/certs/sfj-genai-nasscom.jpg',
  'Aligned with Industry Competency Standards & Approved by Central Government',
  2
),
(
  'AWS Cloud Practitioner Essentials',
  'AWS Training & Certification',
  '15 Sep 2026',
  'AWS-CPE-2026',
  NULL,
  '/certs/aws-cloud-practitioner.pdf',
  'AWS Official Completion Certificate',
  3
),
(
  'Introduction to Data Science',
  'Cisco Networking Academy',
  '12 Sep 2026',
  'b79a0f66-a00c-4d29-98ed-862c92e969bb',
  NULL,
  '/certs/cisco-intro-data-science.pdf',
  'Networking Academy Verified Credential | Director: Lynn Bloomer',
  4
),
(
  'CIGAI 2026 Research Paper Presentation Certificate (LowRankAutoT)',
  'Aditya Institute of Technology and Management (AITAM) / Springer Partner',
  '16–17 Jul 2026',
  'CIGAI-2026-PRES-01',
  NULL,
  '/certs/cigai-2026-research-certificate.jpg',
  '2nd Int Conference on Mathematical Modelling, CI & GenAI',
  5
),
(
  'Upskilling Faculty Development Program (FDP)',
  'CollegeDekho / ImaginXP',
  'Oct 2025',
  'TEQ-9.4',
  NULL,
  '/certs/collegedekho-fdp-gold.jpg',
  'Gold Badge | Tech Excellence Quotient (TEQ): 9.4/10 | CAO: Prof. Abhayjeet Singh',
  6
),
(
  'Data Analytics Essentials',
  'Cisco Networking Academy',
  '13 Mar 2024',
  '3a5bd8c7-d283-420f-86a9-a6b90be79456',
  NULL,
  '/certs/cisco-data-analytics.pdf',
  'Cisco Certified Credential',
  7
),
(
  'TCS MasterCraft DataPlus Overview Course',
  'TCS MasterCraft Academy',
  '22 Feb 2024',
  'TCS-MC-DATAPLUS-2024',
  NULL,
  '/certs/tcs-mastercraft-dataplus.pdf',
  'Certificate of Appreciation',
  8
),
(
  'Digital 101 Journey',
  'NASSCOM FutureSkills Prime',
  '17 Dec 2023',
  'FSP/2023/12/0148257',
  NULL,
  '/certs/nasscom-digital-101.pdf',
  'MeitY & NASSCOM Digital Skilling Initiative',
  9
),
(
  'Python for Beginners - Python Programming',
  'Udemy (Start-Tech Trainings)',
  '25 Feb 2022',
  'UC-3ed4c05a-75a8-47fb-bd23-e66ae0d471d2',
  'https://ude.my/UC-3ed4c05a-75a8-47fb-bd23-e66ae0d471d2',
  '/certs/udemy-python-for-beginners.pdf',
  'Certificate of Completion (3 total hours) | Ref: 0004',
  10
),
(
  'Certificate for Completion of C Training',
  'Spoken Tutorial Project, IIT Bombay',
  '22 Mar 2018',
  'IITB-ST-C-2018',
  NULL,
  '/certs/iit-bombay-c-programming.jpg',
  'National Mission on Education through ICT (MHRD, Govt. of India) | APEX College',
  11
);

-- 6. Documents Seed
INSERT INTO public.documents (name, description, category, file_url, file_size, is_current_cv, visibility, featured, download_count)
VALUES
(
  'Ajeet Kumar - Comprehensive Curriculum Vitae (CV)',
  'Official professional curriculum vitae detailing AI/ML training, Generative AI & Agentic AI expertise, academic credentials, and project history.',
  'CV / Resume',
  '/docs/Ajeet_Kumar_CV.pdf',
  '192 KB',
  true,
  'public',
  true,
  42
),
(
  'Master of Computer Applications Degree Certificate',
  'Official AKTU Degree Certificate awarded with First Division with Honours in MCA.',
  'Degree Certificate',
  '/certs/mca-degree-certificate.jpg',
  '278 KB',
  false,
  'public',
  true,
  18
),
(
  'Bachelor of Computer Applications Degree Certificate',
  'Official MJPRU Degree Certificate awarded in BCA.',
  'Degree Certificate',
  '/certs/bca-degree-certificate.jpg',
  '260 KB',
  false,
  'public',
  true,
  12
),
(
  'CIGAI 2026 Research Conference Presentation Certificate',
  'Research paper presentation certificate for LowRankAutoT at CIGAI 2026 (Springer Partner).',
  'Research Paper & Conference',
  '/certs/cigai-2026-research-certificate.jpg',
  '150 KB',
  false,
  'public',
  true,
  25
),
(
  'CollegeDekho ImaginXP Faculty Development Gold Badge',
  'Certificate of Appreciation with Tech Excellence Quotient (TEQ) 9.4/10.',
  'Faculty Development Program',
  '/certs/collegedekho-fdp-gold.jpg',
  '70 KB',
  false,
  'public',
  true,
  15
);

-- 7. Projects Seed (All 10 verified projects from CV with explicit status distinctions)
INSERT INTO public.projects (title, slug, short_description, problem_statement, solution, detailed_explanation, category, status, technologies, featured, display_order)
VALUES
(
  'AI-Based Design Tool',
  'ai-based-design-tool',
  'Prompt-driven web application concept for generating digital creatives, social media assets, YouTube thumbnails, and product logos.',
  'Content creators and small businesses often struggle with complex design software and lack rapid ideation workflows to turn marketing concepts into polished visual assets.',
  'Designed a prompt-engineered generation workflow converting natural language prompts into high-fidelity image outputs, tailored styles, and graphic formats.',
  'Explored prompt engineering patterns, text-to-image synthesis, and automated thumbnail structuring to build a fast generative design studio concept.',
  'Generative AI & Prompt Engineering',
  'concept',
  '["Generative AI", "Prompt Engineering", "Image Generation Models", "Web Application", "Python"]'::jsonb,
  true,
  1
),
(
  'Personalized Travel Itinerary Planner',
  'personalized-travel-itinerary-planner',
  'GenAI-powered application structuring personalized travel recommendations and day-wise itineraries based on preferences.',
  'Manual trip planning across multiple destinations is time-consuming, fragmented, and fails to dynamically adapt to varying budgets, travel durations, and interests.',
  'Developed an intelligent itinerary generation architecture using natural language understanding, destination knowledge extraction, and constraint-guided planning.',
  'Mentored and designed the system architecture to parse user input (dates, budget, interests) into structured day-by-day itineraries with activity highlights and logistical suggestions.',
  'GenAI Application',
  'mentored',
  '["Generative AI", "LLMs", "Prompt Design", "JSON Schema Extraction", "Python", "Streamlit"]'::jsonb,
  true,
  2
),
(
  'Multimodal Attendance & Engagement Agent',
  'multimodal-attendance-engagement-agent',
  'Intelligent agent combining attendance inputs with learner engagement signals to generate insightful session summaries.',
  'Traditional attendance tracking ignores student cognitive engagement, while educators lack actionable insights on session pacing and focus without violating privacy.',
  'Architected an agentic pipeline processing visual attendance cues and engagement indicators to provide aggregated, privacy-conscious session metrics.',
  'Guided student teams through responsible data handling, facial analysis privacy boundaries, and LLM-powered pedagogical summaries for classroom optimization.',
  'Agentic AI & Computer Vision',
  'mentored',
  '["Agentic AI", "Computer Vision", "Multimodal Analysis", "Privacy-Preserving AI", "Python"]'::jsonb,
  true,
  3
),
(
  'Multimodal Construction Intelligence Platform',
  'multimodal-construction-intelligence-platform',
  'Visual inspection workflow platform organizing construction-site images and spatial telemetry for progress tracking.',
  'Construction site supervisors face documentation delays, overlooked safety risks, and inconsistent progress monitoring across disparate physical sites.',
  'Formulated a multimodal image-and-metadata pipeline for automated site tagging, visual inspection tracking, and automated hazard and progress reporting.',
  'Mentored engineering teams on spatial image processing, visual change detection concepts, and automated architectural report generation.',
  'Multimodal AI',
  'mentored',
  '["Multimodal AI", "Computer Vision", "Visual Inspection", "Progress Analytics", "FastAPI"]'::jsonb,
  false,
  4
),
(
  'FoodVerse AI – Multimodal Food Intelligence Agent',
  'foodverse-ai',
  'Multimodal food recognition and conversational agent for ingredient understanding and intelligent dietary guidance.',
  'Users find it difficult to estimate culinary nutrition, identify unfamiliar ingredients, or find creative recipes based on refrigerator photos.',
  'Created an end-to-end multimodal conversational pipeline utilizing Gemini API vision capabilities to recognize meal components and offer contextual advice.',
  'Structured as an interactive GenAI lab for learners to practice prompt engineering, image token understanding, and nutritional database grounding.',
  'Generative AI & Multimodal',
  'mentored',
  '["Multimodal AI", "Gemini API", "Streamlit", "Prompt Engineering", "Python"]'::jsonb,
  false,
  5
),
(
  'CrimeVision AI – Multimodal Forensic Analysis Platform',
  'crimevision-ai',
  'AI-assisted platform for structured analysis of visual evidence and case documentation, emphasizing human-in-the-loop auditability.',
  'Forensic analysts must comb through vast volumes of video evidence, case notes, and scene photos under tight timelines with zero margin for unverified assertions.',
  'Designed a traceable multimodal investigative assistant providing evidence indexing, visual anomaly tagging, and human-verified timeline synthesis.',
  'Emphasized responsible AI, traceability, audit logs, and non-hallucinatory evidence citations during student mentorship.',
  'AI-Assisted Analysis',
  'mentored',
  '["AI Ethics", "Multimodal Forensics", "Auditability", "Python", "Data Pipeline"]'::jsonb,
  false,
  6
),
(
  'AI Policy Assistant',
  'ai-policy-assistant',
  'Retrieval-Augmented Generation (RAG) assistant for document-grounded question answering across complex policy documents.',
  'Employees and citizens struggle to navigate lengthy, jargon-dense compliance, university guidelines, and regulatory policy documentation.',
  'Implemented a RAG architecture parsing regulatory PDFs into chunked vector embeddings with dense retrieval and citation-grounded answering.',
  'Delivered as an advanced training module demonstrating chunking strategies, cosine similarity search, re-ranking, and hallucination reduction.',
  'LLMs & Retrieval-Augmented Generation',
  'concept',
  '["RAG", "LLMs", "Vector Embeddings", "Document Search", "Python", "Streamlit"]'::jsonb,
  true,
  7
),
(
  'Bike Sales Market Analysis',
  'bike-sales-market-analysis',
  'Comprehensive data cleaning, exploratory data analysis (EDA), and regression modeling for customer purchasing trend forecasting.',
  'Retailers lack clear statistical understanding of customer demographic drivers, income brackets, and regional trends influencing bike purchase decisions.',
  'Engineered an analytical pipeline performing rigorous data preprocessing, feature correlation, outlier treatment, and predictive regression modeling.',
  'Employed Python, Pandas, Matplotlib, and Scikit-learn to deliver actionable business intelligence and demand forecasting visualizations.',
  'Data Science & Machine Learning',
  'completed',
  '["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-learn", "Regression Analysis"]'::jsonb,
  false,
  8
),
(
  'Online Voting System',
  'online-voting-system',
  'Secure web-based voting portal featuring role-based admin and voter panels with encrypted ballot logging.',
  'Manual paper balloting in collegiate and local elections suffered from slow ballot counting, logistical friction, and lack of real-time auditability.',
  'Engineered a multi-tier web application featuring secure voter registration, ballot casting verification, and automated tallying.',
  'Developed with PHP, MySQL, HTML, and CSS, incorporating relational integrity constraints and role-based access controls.',
  'Web Development & Database',
  'completed',
  '["PHP", "MySQL", "HTML5", "CSS3", "RBAC", "Relational Database"]'::jsonb,
  false,
  9
),
(
  'QuizApp',
  'quizapp-android',
  'Native Android quiz application utilizing Java and Firebase for real-time score tracking, category quizzes, and live leaderboard.',
  'Students needed an interactive mobile tool to test their subject retention with instant feedback and competitive gamification.',
  'Built a native mobile client with Firebase Realtime Database and Authentication for seamless quiz synchronization.',
  'Designed custom UI layouts, dynamic timer components, and cloud synchronization in Java.',
  'Android Development',
  'completed',
  '["Java", "Android SDK", "Firebase Realtime DB", "Mobile UI"]'::jsonb,
  false,
  10
);

-- 8. Skills Seed (All 14 categories from prompt specifications)
INSERT INTO public.skills (category, name, proficiency_level, featured, display_order) VALUES
('Artificial Intelligence', 'Artificial Intelligence (AI) Principles', 'Advanced', true, 1),
('Artificial Intelligence', 'AI Solution Architecture', 'Advanced', true, 2),
('Machine Learning', 'Supervised & Unsupervised Learning', 'Advanced', true, 3),
('Machine Learning', 'Model Evaluation & Validation', 'Advanced', true, 4),
('Deep Learning', 'Neural Network Architectures', 'Advanced', true, 5),
('Deep Learning', 'TensorFlow & Keras', 'Advanced', true, 6),
('Generative AI', 'Generative AI (GenAI) Workflows', 'Advanced', true, 7),
('Generative AI', 'Prompt Engineering & System Directives', 'Advanced', true, 8),
('Generative AI', 'Gemini API & Multimodal Prototyping', 'Advanced', true, 9),
('Agentic AI', 'Agentic AI Architecture', 'Advanced', true, 10),
('Agentic AI', 'AI Agents & Multi-Agent Collaboration', 'Advanced', true, 11),
('Agentic AI', 'Tool Calling & Function Execution', 'Advanced', true, 12),
('Large Language Models', 'Transformer Architectures', 'Advanced', true, 13),
('Large Language Models', 'LLM Context Window & Token Management', 'Advanced', false, 14),
('RAG and AI Agents', 'Retrieval-Augmented Generation (RAG)', 'Advanced', true, 15),
('RAG and AI Agents', 'Document-Grounded Question Answering', 'Advanced', true, 16),
('RAG and AI Agents', 'Vector Embeddings & Semantic Search', 'Advanced', true, 17),
('Python Programming', 'Python (Core, OOP, Data Structures)', 'Advanced', true, 18),
('Python Programming', 'Streamlit & Rapid Prototyping', 'Advanced', true, 19),
('Python Programming', 'Flask Web Services', 'Proficient', false, 20),
('Data Science and Analytics', 'Data Cleaning & Preprocessing', 'Advanced', true, 21),
('Data Science and Analytics', 'Exploratory Data Analysis (EDA)', 'Advanced', true, 22),
('Data Science and Analytics', 'Pandas, NumPy, Matplotlib & Seaborn', 'Advanced', true, 23),
('NLP and Multimodal AI', 'Natural Language Processing (NLP)', 'Advanced', true, 24),
('NLP and Multimodal AI', 'Multimodal Image & Text Understanding', 'Advanced', true, 25),
('Web Development', 'HTML5, CSS3, Modern JavaScript/TypeScript', 'Proficient', true, 26),
('Web Development', 'Next.js & React Ecosystem', 'Proficient', true, 27),
('Web Development', 'PHP & Dynamic Web Applications', 'Proficient', false, 28),
('Database Management', 'Relational Database Management (RDBMS)', 'Advanced', true, 29),
('Database Management', 'SQL Query Design & Optimization', 'Advanced', true, 30),
('Database Management', 'MySQL & PostgreSQL', 'Advanced', true, 31),
('Cloud and Deployment', 'Cloud Computing Fundamentals', 'Proficient', true, 32),
('Cloud and Deployment', 'AWS Cloud Practitioner Concepts', 'Proficient', true, 33),
('Cloud and Deployment', 'Git & GitHub Version Control', 'Advanced', true, 34),
('Technical Training and Academic Leadership', 'Technical Training & Curriculum Design', 'Advanced', true, 35),
('Technical Training and Academic Leadership', 'Academic Program Coordination', 'Advanced', true, 36),
('Technical Training and Academic Leadership', 'Experiential Learning & Project Mentoring', 'Advanced', true, 37),
('Technical Training and Academic Leadership', 'SDLC, Agile & Technical Documentation', 'Advanced', true, 38);

-- 9. Blog Categories Seed
INSERT INTO public.blog_categories (name, slug, description) VALUES
('Generative AI', 'generative-ai', 'Modern GenAI workflows, prompt engineering, and multimodal intelligence.'),
('Agentic AI', 'agentic-ai', 'Autonomous AI agents, tool calling, multi-agent frameworks, and RAG architectures.'),
('Machine Learning', 'machine-learning', 'Practical ML algorithms, model evaluation, and predictive analytics.'),
('Data Science', 'data-science', 'Exploratory data analysis, feature engineering, and statistical modeling.'),
('Teaching and Education', 'teaching-and-education', 'Experiential learning methodologies, student mentoring, and technical curriculum design.'),
('Personal Life & Journal', 'personal-life-journal', 'Daily reflections, teaching experiences, milestones, and personal thoughts.'),
('Technology Tutorials', 'technology-tutorials', 'Step-by-step guides for developers, educators, and AI practitioners.')
ON CONFLICT DO NOTHING;

-- 10. Sample Verified Blog Articles & Journal Entries
INSERT INTO public.blog_posts (
  title, subtitle, slug, content, excerpt, cover_image_url, category_id,
  status, is_journal, is_private, featured, reading_time_minutes, published_at,
  seo_title, seo_description
) VALUES
(
  'Demystifying Agentic AI: From Passive LLMs to Autonomous Problem Solvers',
  'Understanding how tool use, decision loops, and RAG transform language models into practical task-executing agents.',
  'demystifying-agentic-ai',
  '## The Shift from Text Completion to Autonomous Action

For the past several years, the mainstream understanding of Large Language Models (LLMs) was centered on text generation: give a prompt, receive a completion. While powerful, passive models face severe boundaries—they cannot execute code, they cannot query live enterprise databases, and they cannot take verifiable real-world actions.

Enter **Agentic AI**.

### Core Pillars of an Agentic System

An AI Agent isn''t just a language model; it is an orchestrated architecture comprising four distinct layers:

1. **The Brain (LLM / Reasoning Engine):** Evaluates goals, breaks down problems into sub-tasks, and decides when additional information is required.
2. **Tool Use (Function Calling):** Connects the model to APIs, code execution environments, SQL databases, and file parsers.
3. **Memory Systems:** Short-term memory (conversation history and immediate context) paired with Long-Term Memory (vector databases, semantic caching).
4. **Action & Reflection Loops (ReAct Framework):** The agent observes the output of its own actions, checks whether the result meets the objective, and refines its next step dynamically.

```python
# Conceptual Agent Loop in Python
def agentic_loop(task, tools):
    state = initialize_state(task)
    while not state.is_complete():
        action = plan_next_step(state)
        result = execute_tool(action, tools)
        state.update(result)
        state.reflect()
    return state.get_final_answer()
```

### Why This Matters for Modern Learners

In my training sessions at SmartBridge and across universities, I emphasize to students that the future of software development isn''t writing boilerplate syntax—it''s orchestrating intelligent agents that can reason through requirements, test their own implementations, and reliably assist human domain experts.',
  'An in-depth look at how Agentic AI transforms standard LLMs into goal-driven systems through tool execution, cognitive memory, and feedback loops.',
  '/assets/ajeet-kumar-profile.jpg',
  (SELECT id FROM public.blog_categories WHERE slug = 'agentic-ai'),
  'published',
  false,
  false,
  true,
  6,
  NOW() - INTERVAL '3 days',
  'Demystifying Agentic AI | Ajeet Kumar',
  'Explore how Agentic AI elevates LLMs into autonomous problem solvers using tool use and iterative reasoning.'
),
(
  'Bridging the Academic-Industry Gap in AI/ML Education',
  'Why hands-on experiential learning and capstone mentoring are vital for engineering graduates.',
  'bridging-academic-industry-gap-ai-education',
  '## Beyond Textbook Algorithms

Having coordinated BCA and MCA programs at Dev Bhoomi Uttarakhand University and taught computing fundamentals across institutions, one pattern is strikingly clear: traditional curricula often lag behind rapid technological inflections.

Students may understand the gradient descent equation on paper, yet struggle when asked to:
- Structure a reproducible data pipeline with Pandas.
- Handle token limits and prompt injection in a production LLM wrapper.
- Formulate Software Requirement Specifications (SRS) or Work Breakdown Structures (WBS) for an AI initiative.

### The Power of Experiential Learning (EL)

To bridge this gap, technical instruction must revolve around **learner-focused experiential projects**:

- **Real-World Case Studies:** Replacing synthetic toy datasets with authentic messy data requiring anomaly detection and schema validation.
- **Hands-on Labs:** Giving learners immediate feedback through interactive environments (Colab, Streamlit, Jupyter Notebooks).
- **Engineering Rigor:** Instilling software engineering principles early—version control with Git, functional testing, code reviews, and structured documentation.

When learners build projects like multimodal assistants or RAG-based query engines, their confidence shifts from passive consumers of AI to active builders.',
  'Observations on transforming computer science education to produce industry-ready AI professionals through project mentoring and experiential labs.',
  '/assets/ajeet-kumar-profile.jpg',
  (SELECT id FROM public.blog_categories WHERE slug = 'teaching-and-education'),
  'published',
  false,
  false,
  true,
  5,
  NOW() - INTERVAL '10 days',
  'Bridging Academic-Industry Gap in AI | Ajeet Kumar',
  'Practical approaches to modernizing AI education through experiential learning and project-based curriculum design.'
),
(
  'Daily Journal: Reflections on Mentoring and Technical Presentations',
  'A personal reflection on the journey from classroom instruction to national training programs.',
  'journal-reflections-on-mentoring',
  '### Morning Thoughts

Reflecting on recent training cohorts in Generative AI and Python programming. One of the most rewarding aspects of being an educator and trainer is that moment when a complex, abstract concept—like attention mechanisms in transformers or vector embeddings—finally clicks for a student.

### Key Learnings Today

1. **Simplicity is Mastery:** If you cannot explain an AI architecture using a relatable real-life analogy, you don''t understand it deeply enough yet.
2. **Patience with Fundamentals:** Learners often rush into deep learning before mastering basic data structures and object-oriented programming. Reinforcing core Python always pays dividends later.
3. **Continuous Curiosity:** The AI landscape changes weekly. Staying an effective SME means dedicating time every single day to reading new research papers and testing emerging models.

Looking forward to the upcoming milestones and research initiatives in IoT edge compression.',
  'Personal reflections on pedagogical clarity, continuous learning, and the satisfaction of technical mentoring.',
  '/assets/ajeet-kumar-profile.jpg',
  (SELECT id FROM public.blog_categories WHERE slug = 'personal-life-journal'),
  'published',
  true,
  false,
  false,
  3,
  NOW() - INTERVAL '1 day',
  'Daily Journal: Reflections on Mentoring | Ajeet Kumar',
  'Personal journal entry by Ajeet Kumar on technical mentoring, teaching philosophy, and lifelong learning.'
) ON CONFLICT DO NOTHING;
