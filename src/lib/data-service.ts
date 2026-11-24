import {
  Profile,
  Experience,
  Education,
  Skill,
  Project,
  Research,
  Certification,
  DocumentItem,
  BlogPost,
  BlogCategory,
  BlogTag,
  MediaItem,
  ContactMessage,
  SiteSettings,
} from '@/types/database';
import { createAdminClient } from './supabase/admin';

// ============================================================================
// VERIFIED INITIAL SEED DATA (Strictly sourced from Ajeet Kumar's CV & Credentials)
// ============================================================================

export const INITIAL_PROFILE: Profile = {
  id: 'prof-1',
  full_name: 'Ajeet Kumar',
  headline: 'Software Engineer – AI/ML Trainer | Subject Matter Expert (SME)',
  tagline: 'Bridging AI, Industry & Education',
  short_bio:
    'I work at the intersection of Artificial Intelligence, technology and education. My focus includes AI/ML, Generative AI, Agentic AI, technical training, academic innovation and developing industry-ready learning experiences.',
  detailed_bio:
    'AI/ML Trainer and Software Engineering professional with experience in technical training, curriculum development, academic program coordination, and hands-on project mentoring. Specializes in Generative AI (GenAI), Agentic AI, prompt engineering, machine learning, deep learning, NLP, Python programming, data science, and application development. Experienced in explaining technical concepts through practical demonstrations, real-world use cases, experiential-learning projects, and learner-focused instruction. Skilled in requirement analysis, Agile project planning, software development lifecycle (SDLC), testing fundamentals, technical documentation, and stakeholder coordination.',
  teaching_philosophy:
    'My teaching philosophy is centered on Experiential Learning: demystifying algorithmic complexity through visual architectures, live coding labs, and real-world project mentoring. I believe students master AI when they transition from passive prompt consumers to autonomous agent builders with strong software engineering discipline.',
  career_journey:
    'Holding a Bachelor of Computer Applications (First Division) and a Master of Computer Applications (First Division with Honours), my journey began with core systems programming and software engineering. I advanced into higher education as an Assistant Professor and Program Coordinator (leading BCA/MCA programs and AI curricula), before expanding into nationwide corporate and academic SME roles at SmartBridge, CollegeDekho, Dev Bhoomi Uttarakhand University, Sigma University, Drona Foundation, and NASSCOM FutureSkills Prime.',
  career_vision:
    'To spearhead transformative AI education programs and institutional curricula that seamlessly unite state-of-the-art Generative & Agentic AI breakthroughs with production software engineering standards, inspiring the next generation of engineers and educators.',
  avatar_url: '/assets/ajeet-kumar-profile.jpg',
  email: 'ajeetkumar.ak1101@gmail.com',
  phone: '7078546789',
  location: 'Rudrapur, Uttarakhand, India',
  linkedin_url: 'https://www.linkedin.com/in/itsajeetkumar/',
  github_url: 'https://github.com/Ak-1101',
  cv_url: '/docs/Ajeet_Kumar_CV.pdf',
  is_available_for_hire: true,
};

export const INITIAL_EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    company: 'SmartBridge',
    deployment_details: null,
    role: 'Software Engineer (AI/ML Trainer | SME)',
    location: 'India',
    start_date: 'Aug 2026',
    end_date: 'Present',
    is_current: true,
    description:
      'Deliver technical training and hands-on learning sessions in Generative AI (GenAI), Agentic AI, AI/ML, Python, prompt engineering, and related emerging technologies.',
    responsibilities: [
      'Deliver technical training and hands-on learning sessions in Generative AI (GenAI), Agentic AI, AI/ML, Python, prompt engineering, and related emerging technologies.',
      'Explain LLM concepts, AI agent workflows, tool use, retrieval-based applications, and practical GenAI development through demonstrations and project-based exercises.',
      'Mentor learners through experiential-learning (EL) and capstone projects, supporting ideation, requirement analysis, solution design, Agile planning, development, and testing.',
      'Guide teams in preparing project artefacts such as problem statements, use cases, user stories, work breakdown structures (WBS), Software Requirements Specifications (SRS), data-flow diagrams, and solution architecture.',
      'Support coding practices, debugging, code quality, functional testing, performance testing fundamentals, and technical documentation.',
      'Facilitate learner engagement and doubt resolution through live sessions, project discussions, and digital learning channels.',
      'Develop training materials, practical labs, examples, assessments, and industry-oriented learning activities aligned with current AI/ML practices.',
    ],
    technologies: [
      'Generative AI',
      'Agentic AI',
      'AI Agents',
      'Tool Calling',
      'RAG',
      'Gemini API',
      'Prompt Engineering',
      'Python',
      'Streamlit',
      'SDLC',
      'Agile',
    ],
    display_order: 1,
  },
  {
    id: 'exp-2',
    company: 'CollegeDekho',
    deployment_details: 'Deployed at Dev Bhoomi Uttarakhand University (DBUU)',
    role: 'Assistant Professor / BCA-MCA Program Coordinator',
    location: 'Dehradun, Uttarakhand',
    start_date: 'Oct 2025',
    end_date: 'Aug 2026',
    is_current: false,
    description:
      'Coordinated BCA and MCA academic programs and supported academic operations, scheduling, faculty coordination, and student progress.',
    responsibilities: [
      'Coordinated BCA and MCA academic programs and supported academic operations, scheduling, faculty coordination, and student progress.',
      'Delivered lectures and practical sessions in Artificial Intelligence, Machine Learning, Data Science, Python, and related computer science subjects.',
      'Mentored students on academic projects, research activities, technical documentation, and presentations.',
      'Contributed to curriculum planning, lesson plans, assessments, academic records, workshops, seminars, and masterclasses.',
    ],
    technologies: [
      'Artificial Intelligence',
      'Machine Learning',
      'Data Science',
      'Python',
      'Curriculum Design',
      'Program Coordination',
      'Academic Administration',
    ],
    display_order: 2,
  },
  {
    id: 'exp-3',
    company: 'CollegeDekho',
    deployment_details: 'Deployed at Sigma University, Vadodara',
    role: 'Assistant Professor | Tech Faculty (AI & Data Science)',
    location: 'Vadodara, Gujarat',
    start_date: 'Aug 2024',
    end_date: 'Oct 2025',
    is_current: false,
    description:
      'Delivered lectures, tutorials, and practical sessions in Artificial Intelligence, Data Science, and related computing subjects.',
    responsibilities: [
      'Delivered lectures, tutorials, and practical sessions in Artificial Intelligence, Data Science, and related computing subjects.',
      'Guided students on projects, research work, and technical presentations.',
      'Supported curriculum development and course-content updates to align learning outcomes with academic and industry requirements.',
      'Participated in departmental coordination, academic administration, and student mentoring.',
    ],
    technologies: [
      'AI & Data Science',
      'Curriculum Development',
      'Student Mentoring',
      'Python',
      'Applied AI',
    ],
    display_order: 3,
  },
  {
    id: 'exp-4',
    company: 'Drona Foundation',
    deployment_details: null,
    role: 'Guest Faculty / IT Trainer',
    location: 'India',
    start_date: 'Oct 2024',
    end_date: 'Oct 2025',
    is_current: false,
    description:
      'Conducted hands-on Python programming sessions covering programming fundamentals, data structures, file handling, and object-oriented programming (OOP).',
    responsibilities: [
      'Conducted hands-on Python programming sessions covering programming fundamentals, data structures, file handling, and object-oriented programming (OOP).',
      'Used real-world examples and assignments to reinforce programming concepts and practical problem-solving.',
      'Contributed to curriculum design, experiential learning, and program evaluation and improvement.',
    ],
    technologies: ['Python Programming', 'Data Structures', 'OOP', 'Hands-on Labs'],
    display_order: 4,
  },
  {
    id: 'exp-5',
    company: 'Self-Initiated',
    deployment_details: null,
    role: 'Freelance Project Developer | AI-Based Design Tool',
    location: 'Remote',
    start_date: '2024',
    end_date: '2024',
    is_current: false,
    description:
      'Developed a web-based AI design tool concept for generating social media creatives, YouTube thumbnails, and product logos using prompts.',
    responsibilities: [
      'Developed a web-based AI design tool concept for generating social media creatives, YouTube thumbnails, and product logos using prompts.',
      'Explored prompt engineering and AI image-generation workflows to convert text prompts into visual outputs.',
    ],
    technologies: ['Generative AI', 'Prompt Engineering', 'Image Generation', 'Web Development'],
    display_order: 5,
  },
  {
    id: 'exp-6',
    company: 'NASSCOM FutureSkills Prime / Uptoskills',
    deployment_details: null,
    role: 'Guest Faculty / IT Trainer',
    location: 'India',
    start_date: 'Jul 2023',
    end_date: 'Aug 2024',
    is_current: false,
    description:
      'Delivered an 18-hour Digital 101 training program across two days on Artificial Intelligence, Machine Learning, Deep Learning, Cybersecurity, and emerging technologies.',
    responsibilities: [
      'Delivered an 18-hour Digital 101 training program across two days on Artificial Intelligence, Machine Learning, Deep Learning, Cybersecurity, and emerging technologies.',
      'Facilitated interactive discussions, hands-on activities, and end-of-program assessments to reinforce learner understanding.',
    ],
    technologies: ['AI/ML', 'Deep Learning', 'Cybersecurity', 'Emerging Tech Training'],
    display_order: 6,
  },
  {
    id: 'exp-7',
    company: 'Droan College of Education and Technology',
    deployment_details: null,
    role: 'Assistant Professor, Computer Science and Engineering',
    location: 'Rudrapur, Uttarakhand',
    start_date: 'Jun 2022',
    end_date: 'Jul 2023',
    is_current: false,
    description:
      'Taught C, C++, Python, DBMS, Discrete Mathematics, Business Mathematics, Cloud Computing, and Artificial Intelligence.',
    responsibilities: [
      'Taught C, C++, Python, DBMS, Discrete Mathematics, Business Mathematics, Cloud Computing, and Artificial Intelligence.',
      'Prepared lesson plans, course materials, assessments, and academic records; mentored students on academic and research projects.',
      'Supported curriculum delivery and student learning through structured lectures and practical exercises.',
    ],
    technologies: ['C', 'C++', 'Python', 'DBMS', 'Discrete Mathematics', 'Cloud Computing', 'AI'],
    display_order: 7,
  },
];

export const INITIAL_EDUCATION: Education[] = [
  {
    id: 'edu-1',
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Khandelwal College of Management and Technology, Bareilly',
    university: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow, UP',
    location: 'Bareilly, Uttar Pradesh',
    start_year: '2020',
    end_year: '2022',
    grade: 'CGPA: 7.6 / 10',
    honors: 'First Division with Honours',
    certificate_url: '/certs/mca-degree-certificate.jpg',
    display_order: 1,
  },
  {
    id: 'edu-2',
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Apex College of Management & Computer Applications, Kaushalganj, Rampur',
    university: 'M.J.P. Rohilkhand University, Bareilly',
    location: 'Rampur / Bareilly, Uttar Pradesh',
    start_year: '2017',
    end_year: '2020',
    grade: 'CGPA: 6.8 / 10',
    honors: 'First Division',
    certificate_url: '/certs/bca-degree-certificate.jpg',
    display_order: 2,
  },
];

export const INITIAL_RESEARCH: Research[] = [
  {
    id: 'res-1',
    title: 'LowRankAutoT: Low-Rank Autoencoder Transformer for Lossy Compression on Edge IoT Infrastructure',
    conference_name:
      '2nd International Conference on Mathematical Modelling in Computational Intelligence and Generative AI (CIGAI 2026)',
    conference_dates: '16–17 July 2026',
    location: 'Aditya Institute of Technology and Management (AITAM), Tekkali, Andhra Pradesh, India',
    publishing_partner: 'Springer Publishing Partner',
    authors: 'Ajeet Kumar (School of Engineering & Computing, Dev Bhoomi Uttarakhand University / ImaginXP, CollegeDekho)',
    abstract:
      'Presents an innovative Low-Rank Autoencoder Transformer architecture designed for resource-constrained Edge IoT devices. Addresses critical bottlenecks in sensory and high-dimensional streaming data transmission by combining low-rank factorized representations with lightweight self-attention mechanisms to achieve efficient lossy compression while maintaining downstream reconstruction and inferencing fidelity.',
    paper_url: undefined,
    certificate_url: '/certs/cigai-2026-research-certificate.jpg',
    display_order: 1,
  },
];

export const INITIAL_CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    title: 'Generative AI Fundamentals',
    issuing_organization: 'Databricks Academy',
    issue_date: '12 Nov 2026',
    credential_id: 'DB-GENAI-2026',
    badge_details: 'Databricks Certified Associate',
    certificate_file_url: '/certs/databricks-generative-ai.pdf',
    display_order: 1,
  },
  {
    id: 'cert-2',
    title: 'Certificate of Completion on GEN AI NASSCOM',
    issuing_organization: 'SFJ / NASSCOM Industry Competency Standards',
    issue_date: '18 Sep 2026',
    credential_id: 'SFJ-GENAI-NASSCOM',
    badge_details: 'Aligned with Government & Industry Standards',
    certificate_file_url: '/certs/sfj-genai-nasscom.jpg',
    display_order: 2,
  },
  {
    id: 'cert-3',
    title: 'AWS Cloud Practitioner Essentials',
    issuing_organization: 'AWS Training & Certification',
    issue_date: '15 Sep 2026',
    credential_id: 'AWS-CPE-2026',
    badge_details: 'AWS Official Completion Certificate',
    certificate_file_url: '/certs/aws-cloud-practitioner.pdf',
    display_order: 3,
  },
  {
    id: 'cert-4',
    title: 'Introduction to Data Science',
    issuing_organization: 'Cisco Networking Academy',
    issue_date: '12 Sep 2026',
    credential_id: 'b79a0f66-a00c-4d29-98ed-862c92e969bb',
    badge_details: 'Cisco Certified Credential',
    certificate_file_url: '/certs/cisco-intro-data-science.pdf',
    display_order: 4,
  },
  {
    id: 'cert-5',
    title: 'CIGAI 2026 Research Paper Presentation Certificate (LowRankAutoT)',
    issuing_organization: 'Aditya Institute of Technology and Management (AITAM) / Springer Partner',
    issue_date: '16–17 Jul 2026',
    credential_id: 'CIGAI-2026-PRES-01',
    badge_details: '2nd Int Conference on Mathematical Modelling, CI & GenAI',
    certificate_file_url: '/certs/cigai-2026-research-certificate.jpg',
    display_order: 5,
  },
  {
    id: 'cert-6',
    title: 'Upskilling Faculty Development Program (FDP)',
    issuing_organization: 'CollegeDekho / ImaginXP',
    issue_date: 'Oct 2025',
    credential_id: 'TEQ-9.4',
    badge_details: 'Gold Badge | Tech Excellence Quotient (TEQ): 9.4/10',
    certificate_file_url: '/certs/collegedekho-fdp-gold.jpg',
    display_order: 6,
  },
  {
    id: 'cert-7',
    title: 'Data Analytics Essentials',
    issuing_organization: 'Cisco Networking Academy',
    issue_date: '13 Mar 2024',
    credential_id: '3a5bd8c7-d283-420f-86a9-a6b90be79456',
    badge_details: 'Cisco Certified Credential',
    certificate_file_url: '/certs/cisco-data-analytics.pdf',
    display_order: 7,
  },
  {
    id: 'cert-8',
    title: 'TCS MasterCraft DataPlus Overview Course',
    issuing_organization: 'TCS MasterCraft Academy',
    issue_date: '22 Feb 2024',
    credential_id: 'TCS-MC-DATAPLUS-2024',
    badge_details: 'Certificate of Appreciation',
    certificate_file_url: '/certs/tcs-mastercraft-dataplus.pdf',
    display_order: 8,
  },
  {
    id: 'cert-9',
    title: 'Digital 101 Journey',
    issuing_organization: 'NASSCOM FutureSkills Prime',
    issue_date: '17 Dec 2023',
    credential_id: 'FSP/2023/12/0148257',
    badge_details: 'MeitY & NASSCOM Digital Skilling Initiative',
    certificate_file_url: '/certs/nasscom-digital-101.pdf',
    display_order: 9,
  },
  {
    id: 'cert-10',
    title: 'Python for Beginners - Python Programming',
    issuing_organization: 'Udemy (Start-Tech Trainings)',
    issue_date: '25 Feb 2022',
    credential_id: 'UC-3ed4c05a-75a8-47fb-bd23-e66ae0d471d2',
    badge_details: 'Certificate of Completion (3 total hours) | Ref: 0004',
    certificate_file_url: '/certs/udemy-python-for-beginners.pdf',
    credential_url: 'https://ude.my/UC-3ed4c05a-75a8-47fb-bd23-e66ae0d471d2',
    display_order: 10,
  },
  {
    id: 'cert-11',
    title: 'Certificate for Completion of C Training',
    issuing_organization: 'Spoken Tutorial Project, IIT Bombay',
    issue_date: '22 Mar 2018',
    credential_id: 'IITB-ST-C-2018',
    badge_details: 'National Mission on Education through ICT (MHRD, Govt. of India) | APEX College',
    certificate_file_url: '/certs/iit-bombay-c-programming.jpg',
    display_order: 11,
  },
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    name: 'Ajeet Kumar - Comprehensive Curriculum Vitae (CV)',
    description:
      'Official verified curriculum vitae detailing AI/ML training, Generative AI & Agentic AI expertise, academic credentials, and project history.',
    category: 'CV / Resume',
    file_url: '/docs/Ajeet_Kumar_CV.pdf',
    file_size: '192 KB',
    is_current_cv: true,
    visibility: 'public',
    featured: true,
    download_count: 54,
    created_at: new Date().toISOString(),
  },
  {
    id: 'doc-2',
    name: 'Master of Computer Applications (MCA) Degree Certificate',
    description: 'AKTU Official Degree Certificate awarded in First Division with Honours.',
    category: 'Academic Certificate',
    file_url: '/certs/mca-degree-certificate.jpg',
    file_size: '278 KB',
    is_current_cv: false,
    visibility: 'public',
    featured: true,
    download_count: 22,
    created_at: new Date().toISOString(),
  },
  {
    id: 'doc-3',
    name: 'Bachelor of Computer Applications (BCA) Degree Certificate',
    description: 'MJPRU Official Degree Certificate awarded in First Division.',
    category: 'Academic Certificate',
    file_url: '/certs/bca-degree-certificate.jpg',
    file_size: '260 KB',
    is_current_cv: false,
    visibility: 'public',
    featured: true,
    download_count: 16,
    created_at: new Date().toISOString(),
  },
  {
    id: 'doc-4',
    name: 'CIGAI 2026 Research Conference Paper Presentation Certificate',
    description:
      'Paper presentation certificate for LowRankAutoT: Low-Rank Autoencoder Transformer for Lossy Compression on Edge IoT Infrastructure (Springer Partner).',
    category: 'Research & Conference',
    file_url: '/certs/cigai-2026-research-certificate.jpg',
    file_size: '150 KB',
    is_current_cv: false,
    visibility: 'public',
    featured: true,
    download_count: 31,
    created_at: new Date().toISOString(),
  },
  {
    id: 'doc-5',
    name: 'CollegeDekho ImaginXP Faculty Development Gold Badge (TEQ 9.4)',
    description: 'Certificate of Appreciation for Upskilling Faculty Development Program.',
    category: 'Faculty Development',
    file_url: '/certs/collegedekho-fdp-gold.jpg',
    file_size: '90 KB',
    is_current_cv: false,
    visibility: 'public',
    featured: true,
    download_count: 19,
    created_at: new Date().toISOString(),
  },
  {
    id: 'doc-6',
    name: 'Databricks Academy - Generative AI Fundamentals Certificate',
    description: 'Databricks Academy Course Completion Certificate.',
    category: 'Certification PDF',
    file_url: '/certs/databricks-generative-ai.pdf',
    file_size: '358 KB',
    is_current_cv: false,
    visibility: 'public',
    featured: true,
    download_count: 28,
    created_at: new Date().toISOString(),
  },
  {
    id: 'doc-7',
    name: 'SFJ / NASSCOM Gen AI Industry Competency Certificate',
    description: 'Aligned with National Industry Competency Standards approved by Central Govt.',
    category: 'Certification',
    file_url: '/certs/sfj-genai-nasscom.jpg',
    file_size: '69 KB',
    is_current_cv: false,
    visibility: 'public',
    featured: true,
    download_count: 24,
    created_at: new Date().toISOString(),
  },
  {
    id: 'doc-8',
    name: 'AWS Cloud Practitioner Essentials Certificate',
    description: 'AWS Training & Certification Completion Certificate.',
    category: 'Certification PDF',
    file_url: '/certs/aws-cloud-practitioner.pdf',
    file_size: '289 KB',
    is_current_cv: false,
    visibility: 'public',
    featured: true,
    download_count: 32,
    created_at: new Date().toISOString(),
  },
  {
    id: 'doc-9',
    name: 'Cisco Networking Academy - Introduction to Data Science',
    description: 'Official Cisco Course Completion Certificate.',
    category: 'Certification PDF',
    file_url: '/certs/cisco-intro-data-science.pdf',
    file_size: '217 KB',
    is_current_cv: false,
    visibility: 'public',
    featured: true,
    download_count: 26,
    created_at: new Date().toISOString(),
  },
  {
    id: 'doc-10',
    name: 'Cisco Networking Academy - Data Analytics Essentials',
    description: 'Official Cisco Course Completion Certificate.',
    category: 'Certification PDF',
    file_url: '/certs/cisco-data-analytics.pdf',
    file_size: '218 KB',
    is_current_cv: false,
    visibility: 'public',
    featured: true,
    download_count: 21,
    created_at: new Date().toISOString(),
  },
  {
    id: 'doc-11',
    name: 'TCS MasterCraft DataPlus Overview Course Certificate',
    description: 'TCS MasterCraft Academy Certificate of Appreciation.',
    category: 'Certification PDF',
    file_url: '/certs/tcs-mastercraft-dataplus.pdf',
    file_size: '1.3 MB',
    is_current_cv: false,
    visibility: 'public',
    featured: false,
    download_count: 14,
    created_at: new Date().toISOString(),
  },
  {
    id: 'doc-12',
    name: 'NASSCOM FutureSkills Prime - Digital 101 Journey',
    description: 'MeitY & NASSCOM Digital Skilling Initiative Certificate.',
    category: 'Certification PDF',
    file_url: '/certs/nasscom-digital-101.pdf',
    file_size: '1.7 MB',
    is_current_cv: false,
    visibility: 'public',
    featured: false,
    download_count: 17,
    created_at: new Date().toISOString(),
  },
  {
    id: 'doc-13',
    name: 'IIT Bombay Spoken Tutorial - C Programming Training Certificate',
    description: 'National Mission on Education through ICT (MHRD, Govt. of India).',
    category: 'Certification',
    file_url: '/certs/iit-bombay-c-programming.jpg',
    file_size: '91 KB',
    is_current_cv: false,
    visibility: 'public',
    featured: false,
    download_count: 15,
    created_at: new Date().toISOString(),
  },
  {
    id: 'doc-14',
    name: 'Udemy - Python for Beginners - Python Programming Certificate',
    description: 'Udemy Certificate of Completion by Start-Tech Trainings.',
    category: 'Certification PDF',
    file_url: '/certs/udemy-python-for-beginners.pdf',
    file_size: '236 KB',
    is_current_cv: false,
    visibility: 'public',
    featured: true,
    download_count: 20,
    created_at: new Date().toISOString(),
  },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'AI-Based Design Tool',
    slug: 'ai-based-design-tool',
    short_description:
      'Prompt-driven web application concept for generating digital creatives, social media assets, YouTube thumbnails, and product logos using AI image generation.',
    problem_statement:
      'Content creators and small businesses often lack rapid ideation workflows to turn marketing concepts and brand prompts into polished, platform-optimized visuals.',
    solution:
      'Designed a prompt-engineered generation workflow converting natural language prompts into high-fidelity image outputs, tailored styles, and graphic formats.',
    detailed_explanation:
      'Explored prompt engineering patterns, text-to-image synthesis, and automated thumbnail structuring to build a fast generative design studio concept.',
    category: 'Generative AI & Prompt Engineering',
    status: 'concept',
    technologies: ['Generative AI', 'Prompt Engineering', 'Image Generation Models', 'Web Application', 'Python'],
    thumbnail_url: '/assets/ajeet-kumar-profile.jpg',
    github_url: 'https://github.com/Ak-1101',
    live_url: undefined,
    demo_video_url: undefined,
    featured: true,
    display_order: 1,
  },
  {
    id: 'proj-2',
    title: 'Personalized Travel Itinerary Planner',
    slug: 'personalized-travel-itinerary-planner',
    short_description:
      'GenAI-powered application structuring personalized travel recommendations and day-wise itineraries based on preferences.',
    problem_statement:
      'Manual trip planning across multiple destinations is time-consuming, fragmented, and fails to dynamically adapt to varying budgets, travel durations, and interests.',
    solution:
      'Developed an intelligent itinerary generation architecture using natural language understanding, destination knowledge extraction, and constraint-guided planning.',
    detailed_explanation:
      'Mentored and designed the system architecture to parse user input (dates, budget, interests) into structured day-by-day itineraries with activity highlights and logistical suggestions.',
    category: 'GenAI Application',
    status: 'mentored',
    technologies: ['Generative AI', 'LLMs', 'Prompt Design', 'JSON Schema Extraction', 'Python', 'Streamlit'],
    thumbnail_url: undefined,
    github_url: 'https://github.com/Ak-1101',
    live_url: undefined,
    demo_video_url: undefined,
    featured: true,
    display_order: 2,
  },
  {
    id: 'proj-3',
    title: 'Multimodal Attendance & Engagement Agent',
    slug: 'multimodal-attendance-engagement-agent',
    short_description:
      'Intelligent agent combining attendance inputs with learner engagement signals to generate insightful session summaries.',
    problem_statement:
      'Traditional attendance tracking ignores student cognitive engagement, while educators lack actionable insights on session pacing and focus without violating privacy.',
    solution:
      'Architected an agentic pipeline processing visual attendance cues and engagement indicators to provide aggregated, privacy-conscious session metrics.',
    detailed_explanation:
      'Guided student teams through responsible data handling, facial analysis privacy boundaries, and LLM-powered pedagogical summaries for classroom optimization.',
    category: 'Agentic AI & Computer Vision',
    status: 'mentored',
    technologies: ['Agentic AI', 'Computer Vision', 'Multimodal Analysis', 'Privacy-Preserving AI', 'Python'],
    thumbnail_url: undefined,
    github_url: 'https://github.com/Ak-1101',
    live_url: undefined,
    demo_video_url: undefined,
    featured: true,
    display_order: 3,
  },
  {
    id: 'proj-4',
    title: 'Multimodal Construction Intelligence Platform',
    slug: 'multimodal-construction-intelligence-platform',
    short_description:
      'Visual inspection workflow platform organizing construction-site images and spatial telemetry for progress tracking.',
    problem_statement:
      'Construction site supervisors face documentation delays, overlooked safety risks, and inconsistent progress monitoring across disparate physical sites.',
    solution:
      'Formulated a multimodal image-and-metadata pipeline for automated site tagging, visual inspection tracking, and automated hazard and progress reporting.',
    detailed_explanation:
      'Mentored engineering teams on spatial image processing, visual change detection concepts, and automated architectural report generation.',
    category: 'Multimodal AI',
    status: 'mentored',
    technologies: ['Multimodal AI', 'Computer Vision', 'Visual Inspection', 'Progress Analytics', 'FastAPI'],
    thumbnail_url: undefined,
    github_url: 'https://github.com/Ak-1101',
    live_url: undefined,
    demo_video_url: undefined,
    featured: false,
    display_order: 4,
  },
  {
    id: 'proj-5',
    title: 'FoodVerse AI – Multimodal Food Intelligence Agent',
    slug: 'foodverse-ai',
    short_description:
      'Multimodal food recognition and conversational agent for ingredient understanding and intelligent dietary guidance.',
    problem_statement:
      'Users find it difficult to estimate culinary nutrition, identify unfamiliar ingredients, or find creative recipes based on refrigerator photos.',
    solution:
      'Created an end-to-end multimodal conversational pipeline utilizing Gemini API vision capabilities to recognize meal components and offer contextual advice.',
    detailed_explanation:
      'Structured as an interactive GenAI lab for learners to practice prompt engineering, image token understanding, and nutritional database grounding.',
    category: 'Generative AI & Multimodal',
    status: 'mentored',
    technologies: ['Multimodal AI', 'Gemini API', 'Streamlit', 'Prompt Engineering', 'Python'],
    thumbnail_url: undefined,
    github_url: 'https://github.com/Ak-1101',
    live_url: undefined,
    demo_video_url: undefined,
    featured: false,
    display_order: 5,
  },
  {
    id: 'proj-6',
    title: 'CrimeVision AI – Multimodal Forensic Analysis Platform',
    slug: 'crimevision-ai',
    short_description:
      'AI-assisted platform for structured analysis of visual evidence and case documentation, emphasizing human-in-the-loop auditability.',
    problem_statement:
      'Forensic analysts must comb through vast volumes of video evidence, case notes, and scene photos under tight timelines with zero margin for unverified assertions.',
    solution:
      'Designed a traceable multimodal investigative assistant providing evidence indexing, visual anomaly tagging, and human-verified timeline synthesis.',
    detailed_explanation:
      'Emphasized responsible AI, traceability, audit logs, and non-hallucinatory evidence citations during student mentorship.',
    category: 'AI-Assisted Analysis',
    status: 'mentored',
    technologies: ['AI Ethics', 'Multimodal Forensics', 'Auditability', 'Python', 'Data Pipeline'],
    thumbnail_url: undefined,
    github_url: 'https://github.com/Ak-1101',
    live_url: undefined,
    demo_video_url: undefined,
    featured: false,
    display_order: 6,
  },
  {
    id: 'proj-7',
    title: 'AI Policy Assistant',
    slug: 'ai-policy-assistant',
    short_description:
      'Retrieval-Augmented Generation (RAG) assistant for document-grounded question answering across complex policy documents.',
    problem_statement:
      'Employees and citizens struggle to navigate lengthy, jargon-dense compliance, university guidelines, and regulatory policy documentation.',
    solution:
      'Implemented a RAG architecture parsing regulatory PDFs into chunked vector embeddings with dense retrieval and citation-grounded answering.',
    detailed_explanation:
      'Delivered as an advanced training module demonstrating chunking strategies, cosine similarity search, re-ranking, and hallucination reduction.',
    category: 'LLMs & Retrieval-Augmented Generation',
    status: 'concept',
    technologies: ['RAG', 'LLMs', 'Vector Embeddings', 'Document Search', 'Python', 'Streamlit'],
    thumbnail_url: undefined,
    github_url: 'https://github.com/Ak-1101',
    live_url: undefined,
    demo_video_url: undefined,
    featured: true,
    display_order: 7,
  },
  {
    id: 'proj-8',
    title: 'Bike Sales Market Analysis',
    slug: 'bike-sales-market-analysis',
    short_description:
      'Comprehensive data cleaning, exploratory data analysis (EDA), and regression modeling for customer purchasing trend forecasting.',
    problem_statement:
      'Retailers lack clear statistical understanding of customer demographic drivers, income brackets, and regional trends influencing bike purchase decisions.',
    solution:
      'Engineered an analytical pipeline performing rigorous data preprocessing, feature correlation, outlier treatment, and predictive regression modeling.',
    detailed_explanation:
      'Employed Python, Pandas, Matplotlib, and Scikit-learn to deliver actionable business intelligence and demand forecasting visualizations.',
    category: 'Data Science & Machine Learning',
    status: 'completed',
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'Regression Analysis'],
    thumbnail_url: undefined,
    github_url: 'https://github.com/Ak-1101',
    live_url: undefined,
    demo_video_url: undefined,
    featured: false,
    display_order: 8,
  },
  {
    id: 'proj-9',
    title: 'Online Voting System',
    slug: 'online-voting-system',
    short_description:
      'Secure web-based voting portal featuring role-based admin and voter panels with encrypted ballot logging.',
    problem_statement:
      'Manual paper balloting in collegiate and local elections suffered from slow ballot counting, logistical friction, and lack of real-time auditability.',
    solution:
      'Engineered a multi-tier web application featuring secure voter registration, ballot casting verification, and automated tallying.',
    detailed_explanation:
      'Developed with PHP, MySQL, HTML, and CSS, incorporating relational integrity constraints and role-based access controls.',
    category: 'Web Development & Database',
    status: 'completed',
    technologies: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'RBAC', 'Relational Database'],
    thumbnail_url: undefined,
    github_url: 'https://github.com/Ak-1101',
    live_url: undefined,
    demo_video_url: undefined,
    featured: false,
    display_order: 9,
  },
  {
    id: 'proj-10',
    title: 'QuizApp',
    slug: 'quizapp-android',
    short_description:
      'Native Android quiz application utilizing Java and Firebase for real-time score tracking, category quizzes, and live leaderboard.',
    problem_statement:
      'Students needed an interactive mobile tool to test their subject retention with instant feedback and competitive gamification.',
    solution:
      'Built a native mobile client with Firebase Realtime Database and Authentication for seamless quiz synchronization.',
    detailed_explanation:
      'Designed custom UI layouts, dynamic timer components, and cloud synchronization in Java.',
    category: 'Android Development',
    status: 'completed',
    technologies: ['Java', 'Android SDK', 'Firebase Realtime DB', 'Mobile UI'],
    thumbnail_url: undefined,
    github_url: 'https://github.com/Ak-1101',
    live_url: undefined,
    demo_video_url: undefined,
    featured: false,
    display_order: 10,
  },
];

export const INITIAL_SKILLS: Skill[] = [
  { id: 'sk-1', category: 'Artificial Intelligence', name: 'Artificial Intelligence (AI) Principles', proficiency_level: 'Advanced', featured: true, display_order: 1 },
  { id: 'sk-2', category: 'Artificial Intelligence', name: 'AI Solution Architecture', proficiency_level: 'Advanced', featured: true, display_order: 2 },
  { id: 'sk-3', category: 'Machine Learning', name: 'Supervised & Unsupervised Learning', proficiency_level: 'Advanced', featured: true, display_order: 3 },
  { id: 'sk-4', category: 'Machine Learning', name: 'Model Evaluation & Validation', proficiency_level: 'Advanced', featured: true, display_order: 4 },
  { id: 'sk-5', category: 'Deep Learning', name: 'Neural Network Architectures', proficiency_level: 'Advanced', featured: true, display_order: 5 },
  { id: 'sk-6', category: 'Deep Learning', name: 'TensorFlow & Keras', proficiency_level: 'Advanced', featured: true, display_order: 6 },
  { id: 'sk-7', category: 'Generative AI', name: 'Generative AI (GenAI) Workflows', proficiency_level: 'Advanced', featured: true, display_order: 7 },
  { id: 'sk-8', category: 'Generative AI', name: 'Prompt Engineering & System Directives', proficiency_level: 'Advanced', featured: true, display_order: 8 },
  { id: 'sk-9', category: 'Generative AI', name: 'Gemini API & Multimodal Prototyping', proficiency_level: 'Advanced', featured: true, display_order: 9 },
  { id: 'sk-10', category: 'Agentic AI', name: 'Agentic AI Architecture', proficiency_level: 'Advanced', featured: true, display_order: 10 },
  { id: 'sk-11', category: 'Agentic AI', name: 'AI Agents & Multi-Agent Collaboration', proficiency_level: 'Advanced', featured: true, display_order: 11 },
  { id: 'sk-12', category: 'Agentic AI', name: 'Tool Calling & Function Execution', proficiency_level: 'Advanced', featured: true, display_order: 12 },
  { id: 'sk-13', category: 'Large Language Models', name: 'Transformer Architectures', proficiency_level: 'Advanced', featured: true, display_order: 13 },
  { id: 'sk-14', category: 'Large Language Models', name: 'LLM Context Window & Token Management', proficiency_level: 'Advanced', featured: false, display_order: 14 },
  { id: 'sk-15', category: 'RAG and AI Agents', name: 'Retrieval-Augmented Generation (RAG)', proficiency_level: 'Advanced', featured: true, display_order: 15 },
  { id: 'sk-16', category: 'RAG and AI Agents', name: 'Document-Grounded Question Answering', proficiency_level: 'Advanced', featured: true, display_order: 16 },
  { id: 'sk-17', category: 'RAG and AI Agents', name: 'Vector Embeddings & Semantic Search', proficiency_level: 'Advanced', featured: true, display_order: 17 },
  { id: 'sk-18', category: 'Python Programming', name: 'Python (Core, OOP, Data Structures)', proficiency_level: 'Advanced', featured: true, display_order: 18 },
  { id: 'sk-19', category: 'Python Programming', name: 'Streamlit & Rapid Prototyping', proficiency_level: 'Advanced', featured: true, display_order: 19 },
  { id: 'sk-20', category: 'Python Programming', name: 'Flask Web Services', proficiency_level: 'Proficient', featured: false, display_order: 20 },
  { id: 'sk-21', category: 'Data Science and Analytics', name: 'Data Cleaning & Preprocessing', proficiency_level: 'Advanced', featured: true, display_order: 21 },
  { id: 'sk-22', category: 'Data Science and Analytics', name: 'Exploratory Data Analysis (EDA)', proficiency_level: 'Advanced', featured: true, display_order: 22 },
  { id: 'sk-23', category: 'Data Science and Analytics', name: 'Pandas, NumPy, Matplotlib & Seaborn', proficiency_level: 'Advanced', featured: true, display_order: 23 },
  { id: 'sk-24', category: 'NLP and Multimodal AI', name: 'Natural Language Processing (NLP)', proficiency_level: 'Advanced', featured: true, display_order: 24 },
  { id: 'sk-25', category: 'NLP and Multimodal AI', name: 'Multimodal Image & Text Understanding', proficiency_level: 'Advanced', featured: true, display_order: 25 },
  { id: 'sk-26', category: 'Web Development', name: 'HTML5, CSS3, Modern JavaScript/TypeScript', proficiency_level: 'Proficient', featured: true, display_order: 26 },
  { id: 'sk-27', category: 'Web Development', name: 'Next.js & React Ecosystem', proficiency_level: 'Proficient', featured: true, display_order: 27 },
  { id: 'sk-28', category: 'Web Development', name: 'PHP & Dynamic Web Applications', proficiency_level: 'Proficient', featured: false, display_order: 28 },
  { id: 'sk-29', category: 'Database Management', name: 'Relational Database Management (RDBMS)', proficiency_level: 'Advanced', featured: true, display_order: 29 },
  { id: 'sk-30', category: 'Database Management', name: 'SQL Query Design & Optimization', proficiency_level: 'Advanced', featured: true, display_order: 30 },
  { id: 'sk-31', category: 'Database Management', name: 'MySQL & PostgreSQL', proficiency_level: 'Advanced', featured: true, display_order: 31 },
  { id: 'sk-32', category: 'Cloud and Deployment', name: 'Cloud Computing Fundamentals', proficiency_level: 'Proficient', featured: true, display_order: 32 },
  { id: 'sk-33', category: 'Cloud and Deployment', name: 'AWS Cloud Practitioner Concepts', proficiency_level: 'Proficient', featured: true, display_order: 33 },
  { id: 'sk-34', category: 'Cloud and Deployment', name: 'Git & GitHub Version Control', proficiency_level: 'Advanced', featured: true, display_order: 34 },
  { id: 'sk-35', category: 'Technical Training and Academic Leadership', name: 'Technical Training & Curriculum Design', proficiency_level: 'Advanced', featured: true, display_order: 35 },
  { id: 'sk-36', category: 'Technical Training and Academic Leadership', name: 'Academic Program Coordination', proficiency_level: 'Advanced', featured: true, display_order: 36 },
  { id: 'sk-37', category: 'Technical Training and Academic Leadership', name: 'Experiential Learning & Project Mentoring', proficiency_level: 'Advanced', featured: true, display_order: 37 },
  { id: 'sk-38', category: 'Technical Training and Academic Leadership', name: 'SDLC, Agile & Technical Documentation', proficiency_level: 'Advanced', featured: true, display_order: 38 },
];

export const INITIAL_CATEGORIES: BlogCategory[] = [
  { id: 'cat-1', name: 'Generative AI', slug: 'generative-ai', description: 'Modern GenAI workflows, prompt engineering, and multimodal intelligence.' },
  { id: 'cat-2', name: 'Agentic AI', slug: 'agentic-ai', description: 'Autonomous AI agents, tool calling, multi-agent frameworks, and RAG architectures.' },
  { id: 'cat-3', name: 'Machine Learning', slug: 'machine-learning', description: 'Practical ML algorithms, model evaluation, and predictive analytics.' },
  { id: 'cat-4', name: 'Data Science', slug: 'data-science', description: 'Exploratory data analysis, feature engineering, and statistical modeling.' },
  { id: 'cat-5', name: 'Teaching and Education', slug: 'teaching-and-education', description: 'Experiential learning methodologies, student mentoring, and technical curriculum design.' },
  { id: 'cat-6', name: 'Personal Life & Journal', slug: 'personal-life-journal', description: 'Daily reflections, teaching experiences, milestones, and personal thoughts.' },
  { id: 'cat-7', name: 'Technology Tutorials', slug: 'technology-tutorials', description: 'Step-by-step guides for developers, educators, and AI practitioners.' },
];

export const INITIAL_TAGS: BlogTag[] = [
  { id: 'tag-1', name: 'Agentic AI', slug: 'agentic-ai' },
  { id: 'tag-2', name: 'LLMs', slug: 'llms' },
  { id: 'tag-3', name: 'Generative AI', slug: 'generative-ai' },
  { id: 'tag-4', name: 'RAG', slug: 'rag' },
  { id: 'tag-5', name: 'Python', slug: 'python' },
  { id: 'tag-6', name: 'EdTech', slug: 'edtech' },
  { id: 'tag-7', name: 'Mentoring', slug: 'mentoring' },
  { id: 'tag-8', name: 'Daily Reflections', slug: 'daily-reflections' },
];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Demystifying Agentic AI: From Passive LLMs to Autonomous Problem Solvers',
    subtitle: 'Understanding how tool use, decision loops, and RAG transform language models into practical task-executing agents.',
    slug: 'demystifying-agentic-ai',
    content: `## The Shift from Text Completion to Autonomous Action

For the past several years, the mainstream understanding of Large Language Models (LLMs) was centered on text generation: give a prompt, receive a completion. While powerful, passive models face severe boundaries—they cannot execute code, they cannot query live enterprise databases, and they cannot take verifiable real-world actions.

Enter **Agentic AI**.

### Core Pillars of an Agentic System

An AI Agent isn't just a language model; it is an orchestrated architecture comprising four distinct layers:

1. **The Brain (LLM / Reasoning Engine):** Evaluates goals, breaks down problems into sub-tasks, and decides when additional information is required.
2. **Tool Use (Function Calling):** Connects the model to APIs, code execution environments, SQL databases, and file parsers.
3. **Memory Systems:** Short-term memory (conversation history and immediate context) paired with Long-Term Memory (vector databases, semantic caching).
4. **Action & Reflection Loops (ReAct Framework):** The agent observes the output of its own actions, checks whether the result meets the objective, and refines its next step dynamically.

\`\`\`python
# Conceptual Agent Loop in Python
def agentic_loop(task, tools):
    state = initialize_state(task)
    while not state.is_complete():
        action = plan_next_step(state)
        result = execute_tool(action, tools)
        state.update(result)
        state.reflect()
    return state.get_final_answer()
\`\`\`

### Why This Matters for Modern Learners

In my training sessions at SmartBridge and across universities, I emphasize to students that the future of software development isn't writing boilerplate syntax—it's orchestrating intelligent agents that can reason through requirements, test their own implementations, and reliably assist human domain experts.`,
    excerpt: 'An in-depth look at how Agentic AI transforms standard LLMs into goal-driven systems through tool execution, cognitive memory, and feedback loops.',
    cover_image_url: '/assets/ajeet-kumar-profile.jpg',
    category_id: 'cat-2',
    category_name: 'Agentic AI',
    status: 'published',
    is_journal: false,
    is_private: false,
    featured: true,
    reading_time_minutes: 6,
    views: 312,
    published_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    tags: ['Agentic AI', 'LLMs', 'Python'],
    seo_title: 'Demystifying Agentic AI | Ajeet Kumar',
    seo_description: 'Explore how Agentic AI elevates LLMs into autonomous problem solvers using tool use and iterative reasoning.',
  },
  {
    id: 'post-2',
    title: 'Bridging the Academic-Industry Gap in AI/ML Education',
    subtitle: 'Why hands-on experiential learning and capstone mentoring are vital for engineering graduates.',
    slug: 'bridging-academic-industry-gap-ai-education',
    content: `## Beyond Textbook Algorithms

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

When learners build projects like multimodal assistants or RAG-based query engines, their confidence shifts from passive consumers of AI to active builders.`,
    excerpt: 'Observations on transforming computer science education to produce industry-ready AI professionals through project mentoring and experiential labs.',
    cover_image_url: '/assets/ajeet-kumar-profile.jpg',
    category_id: 'cat-5',
    category_name: 'Teaching and Education',
    status: 'published',
    is_journal: false,
    is_private: false,
    featured: true,
    reading_time_minutes: 5,
    views: 245,
    published_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    tags: ['EdTech', 'Mentoring', 'Generative AI'],
    seo_title: 'Bridging Academic-Industry Gap in AI | Ajeet Kumar',
    seo_description: 'Practical approaches to modernizing AI education through experiential learning and project-based curriculum design.',
  },
  {
    id: 'post-3',
    title: 'Daily Journal: Reflections on Mentoring and Technical Presentations',
    subtitle: 'A personal reflection on the journey from classroom instruction to national training programs.',
    slug: 'journal-reflections-on-mentoring',
    content: `### Morning Thoughts

Reflecting on recent training cohorts in Generative AI and Python programming. One of the most rewarding aspects of being an educator and trainer is that moment when a complex, abstract concept—like attention mechanisms in transformers or vector embeddings—finally clicks for a student.

### Key Learnings Today

1. **Simplicity is Mastery:** If you cannot explain an AI architecture using a relatable real-life analogy, you don't understand it deeply enough yet.
2. **Patience with Fundamentals:** Learners often rush into deep learning before mastering basic data structures and object-oriented programming. Reinforcing core Python always pays dividends later.
3. **Continuous Curiosity:** The AI landscape changes weekly. Staying an effective SME means dedicating time every single day to reading new research papers and testing emerging models.

Looking forward to the upcoming milestones and research initiatives in IoT edge compression.`,
    excerpt: 'Personal reflections on pedagogical clarity, continuous learning, and the satisfaction of technical mentoring.',
    cover_image_url: '/assets/ajeet-kumar-profile.jpg',
    category_id: 'cat-6',
    category_name: 'Personal Life & Journal',
    status: 'published',
    is_journal: true,
    is_private: false,
    featured: false,
    reading_time_minutes: 3,
    views: 189,
    published_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    tags: ['Daily Reflections', 'Mentoring'],
    seo_title: 'Daily Journal: Reflections on Mentoring | Ajeet Kumar',
    seo_description: 'Personal journal entry by Ajeet Kumar on technical mentoring, teaching philosophy, and lifelong learning.',
  },
];

export const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Dr. Rajesh Sharma',
    email: 'rajesh.sharma@university-domain.edu.in',
    subject: 'Guest Lecture Invitation on Agentic AI & LLMs',
    inquiry_type: 'Training',
    message: 'Dear Ajeet, We would love to host you for a 2-day Faculty Development Program on Agentic AI and Prompt Engineering for our Computer Science department.',
    is_read: false,
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'msg-2',
    name: 'Ananya Verma',
    email: 'ananya.v@techinnovate.com',
    subject: 'AI Curriculum Consulting',
    inquiry_type: 'Collaboration',
    message: 'Hello Ajeet, Loved your publication on LowRankAutoT. We are designing an IoT edge AI curriculum and would appreciate your technical advisory.',
    is_read: true,
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
];

// In-Memory state fallback store (persists across client requests in local node runtime)
const state: {
  profile: Profile;
  experiences: Experience[];
  education: Education[];
  research: Research[];
  certifications: Certification[];
  documents: DocumentItem[];
  projects: Project[];
  skills: Skill[];
  categories: BlogCategory[];
  tags: BlogTag[];
  posts: BlogPost[];
  messages: ContactMessage[];
  media: MediaItem[];
  settings: SiteSettings;
} = {
  profile: { ...INITIAL_PROFILE },
  experiences: [...INITIAL_EXPERIENCES],
  education: [...INITIAL_EDUCATION],
  research: [...INITIAL_RESEARCH],
  certifications: [...INITIAL_CERTIFICATIONS],
  documents: [...INITIAL_DOCUMENTS],
  projects: [...INITIAL_PROJECTS],
  skills: [...INITIAL_SKILLS],
  categories: [...INITIAL_CATEGORIES],
  tags: [...INITIAL_TAGS],
  posts: [...INITIAL_POSTS],
  messages: [...INITIAL_MESSAGES],
  media: [
    {
      id: 'med-1',
      title: 'Ajeet Kumar Professional Portrait',
      alt_text: 'Ajeet Kumar - AI/ML Trainer & Subject Matter Expert',
      file_type: 'image' as const,
      mime_type: 'image/jpeg',
      file_url: '/assets/ajeet-kumar-profile.jpg',
      file_size: 163952,
      created_at: new Date().toISOString(),
    },
    {
      id: 'med-2',
      title: 'Ajeet Kumar CV PDF',
      alt_text: 'Official CV Document',
      file_type: 'pdf' as const,
      mime_type: 'application/pdf',
      file_url: '/docs/Ajeet_Kumar_CV.pdf',
      file_size: 192876,
      created_at: new Date().toISOString(),
    },
  ],
  settings: {
    id: 'set-1',
    site_title: 'Ajeet Kumar | AI/ML Trainer, GenAI & Agentic AI Specialist',
    site_description: 'Personal Portfolio, Blog & Academic Platform of Ajeet Kumar.',
    current_cv_id: 'doc-1',
    contact_email: 'ajeetkumar.ak1101@gmail.com',
    contact_phone: '7078546789',
    linkedin_url: 'https://www.linkedin.com/in/itsajeetkumar/',
    github_url: 'https://github.com/Ak-1101',
    maintenance_mode: false,
  },
};

// ============================================================================
// DATA ACCESS SERVICE
// ============================================================================

export const dataService = {
  // PROFILE
  async getProfile(): Promise<Profile> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('profiles').select('*').limit(1).single();
        if (!error && data) return data as Profile;
      } catch (err) {
        console.warn('Supabase profile fetch fallback:', err);
      }
    }
    return state.profile;
  },

  async updateProfile(updates: Partial<Profile>): Promise<Profile> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', state.profile.id)
          .select()
          .single();
        if (!error && data) return data as Profile;
      } catch (err) {
        console.warn('Supabase profile update fallback:', err);
      }
    }
    state.profile = { ...state.profile, ...updates, updated_at: new Date().toISOString() };
    return state.profile;
  },

  // EXPERIENCES
  async getExperiences(): Promise<Experience[]> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('experiences').select('*').order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data as Experience[];
      } catch (err) {
        console.warn('Supabase experiences fallback:', err);
      }
    }
    return [...state.experiences].sort((a, b) => a.display_order - b.display_order);
  },

  async createExperience(exp: Omit<Experience, 'id'>): Promise<Experience> {
    const newExp: Experience = { ...exp, id: `exp-${Date.now()}` };
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('experiences').insert(exp).select().single();
        if (!error && data) return data as Experience;
      } catch (err) {
        console.warn('Supabase create experience fallback:', err);
      }
    }
    state.experiences.push(newExp);
    return newExp;
  },

  async updateExperience(id: string, updates: Partial<Experience>): Promise<Experience | null> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('experiences').update(updates).eq('id', id).select().single();
        if (!error && data) return data as Experience;
      } catch (err) {
        console.warn('Supabase update experience fallback:', err);
      }
    }
    const idx = state.experiences.findIndex((e) => e.id === id);
    if (idx !== -1) {
      state.experiences[idx] = { ...state.experiences[idx], ...updates };
      return state.experiences[idx];
    }
    return null;
  },

  async deleteExperience(id: string): Promise<boolean> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        await supabase.from('experiences').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete experience fallback:', err);
      }
    }
    state.experiences = state.experiences.filter((e) => e.id !== id);
    return true;
  },

  // EDUCATION
  async getEducation(): Promise<Education[]> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('education').select('*').order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data as Education[];
      } catch (err) {
        console.warn('Supabase education fallback:', err);
      }
    }
    return [...state.education].sort((a, b) => a.display_order - b.display_order);
  },

  async createEducation(edu: Omit<Education, 'id'>): Promise<Education> {
    const newEdu: Education = { ...edu, id: `edu-${Date.now()}` };
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('education').insert(edu).select().single();
        if (!error && data) return data as Education;
      } catch (err) {
        console.warn('Supabase create education fallback:', err);
      }
    }
    state.education.push(newEdu);
    return newEdu;
  },

  async updateEducation(id: string, updates: Partial<Education>): Promise<Education | null> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('education').update(updates).eq('id', id).select().single();
        if (!error && data) return data as Education;
      } catch (err) {
        console.warn('Supabase update education fallback:', err);
      }
    }
    const idx = state.education.findIndex((e) => e.id === id);
    if (idx !== -1) {
      state.education[idx] = { ...state.education[idx], ...updates };
      return state.education[idx];
    }
    return null;
  },

  async deleteEducation(id: string): Promise<boolean> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        await supabase.from('education').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete education fallback:', err);
      }
    }
    state.education = state.education.filter((e) => e.id !== id);
    return true;
  },

  // SKILLS
  async getSkills(): Promise<Skill[]> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('skills').select('*').order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data as Skill[];
      } catch (err) {
        console.warn('Supabase skills fallback:', err);
      }
    }
    return [...state.skills].sort((a, b) => a.display_order - b.display_order);
  },

  async createSkill(skill: Omit<Skill, 'id'>): Promise<Skill> {
    const newSkill: Skill = { ...skill, id: `sk-${Date.now()}` };
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('skills').insert(skill).select().single();
        if (!error && data) return data as Skill;
      } catch (err) {
        console.warn('Supabase create skill fallback:', err);
      }
    }
    state.skills.push(newSkill);
    return newSkill;
  },

  async updateSkill(id: string, updates: Partial<Skill>): Promise<Skill | null> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('skills').update(updates).eq('id', id).select().single();
        if (!error && data) return data as Skill;
      } catch (err) {
        console.warn('Supabase update skill fallback:', err);
      }
    }
    const idx = state.skills.findIndex((s) => s.id === id);
    if (idx !== -1) {
      state.skills[idx] = { ...state.skills[idx], ...updates };
      return state.skills[idx];
    }
    return null;
  },

  async deleteSkill(id: string): Promise<boolean> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        await supabase.from('skills').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete skill fallback:', err);
      }
    }
    state.skills = state.skills.filter((s) => s.id !== id);
    return true;
  },

  // PROJECTS
  async getProjects(): Promise<Project[]> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('projects').select('*').order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data as Project[];
      } catch (err) {
        console.warn('Supabase projects fallback:', err);
      }
    }
    return [...state.projects].sort((a, b) => a.display_order - b.display_order);
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const all = await this.getProjects();
    return all.find((p) => p.slug === slug) || null;
  },

  async createProject(proj: Omit<Project, 'id'>): Promise<Project> {
    const newProj: Project = { ...proj, id: `proj-${Date.now()}` };
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('projects').insert(proj).select().single();
        if (!error && data) return data as Project;
      } catch (err) {
        console.warn('Supabase create project fallback:', err);
      }
    }
    state.projects.push(newProj);
    return newProj;
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('projects').update(updates).eq('id', id).select().single();
        if (!error && data) return data as Project;
      } catch (err) {
        console.warn('Supabase update project fallback:', err);
      }
    }
    const idx = state.projects.findIndex((p) => p.id === id);
    if (idx !== -1) {
      state.projects[idx] = { ...state.projects[idx], ...updates };
      return state.projects[idx];
    }
    return null;
  },

  async deleteProject(id: string): Promise<boolean> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        await supabase.from('projects').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete project fallback:', err);
      }
    }
    state.projects = state.projects.filter((p) => p.id !== id);
    return true;
  },

  // RESEARCH
  async getResearch(): Promise<Research[]> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('research').select('*').order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data as Research[];
      } catch (err) {
        console.warn('Supabase research fallback:', err);
      }
    }
    return [...state.research].sort((a, b) => a.display_order - b.display_order);
  },

  async createResearch(res: Omit<Research, 'id'>): Promise<Research> {
    const newRes: Research = { ...res, id: `res-${Date.now()}` };
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('research').insert(res).select().single();
        if (!error && data) return data as Research;
      } catch (err) {
        console.warn('Supabase create research fallback:', err);
      }
    }
    state.research.push(newRes);
    return newRes;
  },

  async updateResearch(id: string, updates: Partial<Research>): Promise<Research | null> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('research').update(updates).eq('id', id).select().single();
        if (!error && data) return data as Research;
      } catch (err) {
        console.warn('Supabase update research fallback:', err);
      }
    }
    const idx = state.research.findIndex((r) => r.id === id);
    if (idx !== -1) {
      state.research[idx] = { ...state.research[idx], ...updates };
      return state.research[idx];
    }
    return null;
  },

  async deleteResearch(id: string): Promise<boolean> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        await supabase.from('research').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete research fallback:', err);
      }
    }
    state.research = state.research.filter((r) => r.id !== id);
    return true;
  },

  // CERTIFICATIONS
  async getCertifications(): Promise<Certification[]> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('certifications').select('*').order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data as Certification[];
      } catch (err) {
        console.warn('Supabase certifications fallback:', err);
      }
    }
    return [...state.certifications].sort((a, b) => a.display_order - b.display_order);
  },

  async createCertification(cert: Omit<Certification, 'id'>): Promise<Certification> {
    const newCert: Certification = { ...cert, id: `cert-${Date.now()}` };
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('certifications').insert(cert).select().single();
        if (!error && data) return data as Certification;
      } catch (err) {
        console.warn('Supabase create cert fallback:', err);
      }
    }
    state.certifications.push(newCert);
    return newCert;
  },

  async updateCertification(id: string, updates: Partial<Certification>): Promise<Certification | null> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('certifications').update(updates).eq('id', id).select().single();
        if (!error && data) return data as Certification;
      } catch (err) {
        console.warn('Supabase update cert fallback:', err);
      }
    }
    const idx = state.certifications.findIndex((c) => c.id === id);
    if (idx !== -1) {
      state.certifications[idx] = { ...state.certifications[idx], ...updates };
      return state.certifications[idx];
    }
    return null;
  },

  async deleteCertification(id: string): Promise<boolean> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        await supabase.from('certifications').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete cert fallback:', err);
      }
    }
    state.certifications = state.certifications.filter((c) => c.id !== id);
    return true;
  },

  // DOCUMENTS & CV
  async getDocuments(onlyPublic: boolean = false): Promise<DocumentItem[]> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        let q = supabase.from('documents').select('*').order('created_at', { ascending: false });
        if (onlyPublic) q = q.eq('visibility', 'public');
        const { data, error } = await q;
        if (!error && data && data.length > 0) return data as DocumentItem[];
      } catch (err) {
        console.warn('Supabase documents fallback:', err);
      }
    }
    if (onlyPublic) {
      return state.documents.filter((d) => d.visibility === 'public');
    }
    return [...state.documents];
  },

  async getCurrentCV(): Promise<DocumentItem | null> {
    const docs = await this.getDocuments();
    return docs.find((d) => d.is_current_cv) || docs[0] || null;
  },

  async setCurrentCV(id: string): Promise<DocumentItem | null> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        await supabase.from('documents').update({ is_current_cv: false }).neq('id', id);
        const { data, error } = await supabase.from('documents').update({ is_current_cv: true }).eq('id', id).select().single();
        if (!error && data) return data as DocumentItem;
      } catch (err) {
        console.warn('Supabase set current cv fallback:', err);
      }
    }
    state.documents.forEach((d) => {
      d.is_current_cv = d.id === id;
    });
    const found = state.documents.find((d) => d.id === id);
    if (found) {
      state.profile.cv_url = found.file_url;
    }
    return found || null;
  },

  async createDocument(doc: Omit<DocumentItem, 'id' | 'download_count' | 'created_at'>): Promise<DocumentItem> {
    const newDoc: DocumentItem = {
      ...doc,
      id: `doc-${Date.now()}`,
      download_count: 0,
      created_at: new Date().toISOString(),
    };
    if (doc.is_current_cv) {
      state.documents.forEach((d) => (d.is_current_cv = false));
      state.profile.cv_url = doc.file_url;
    }
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('documents').insert(newDoc).select().single();
        if (!error && data) return data as DocumentItem;
      } catch (err) {
        console.warn('Supabase create doc fallback:', err);
      }
    }
    state.documents.unshift(newDoc);
    return newDoc;
  },

  async updateDocument(id: string, updates: Partial<DocumentItem>): Promise<DocumentItem | null> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('documents').update(updates).eq('id', id).select().single();
        if (!error && data) return data as DocumentItem;
      } catch (err) {
        console.warn('Supabase update doc fallback:', err);
      }
    }
    const idx = state.documents.findIndex((d) => d.id === id);
    if (idx !== -1) {
      state.documents[idx] = { ...state.documents[idx], ...updates };
      return state.documents[idx];
    }
    return null;
  },

  async deleteDocument(id: string): Promise<boolean> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        await supabase.from('documents').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete doc fallback:', err);
      }
    }
    state.documents = state.documents.filter((d) => d.id !== id);
    return true;
  },

  // BLOG POSTS & JOURNAL
  async getBlogPosts(options?: {
    includePrivate?: boolean;
    includeDrafts?: boolean;
    category?: string;
    tag?: string;
    onlyJournal?: boolean;
  }): Promise<BlogPost[]> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        let q = supabase.from('blog_posts').select('*').order('published_at', { ascending: false });
        if (!options?.includeDrafts) q = q.eq('status', 'published');
        if (!options?.includePrivate) q = q.eq('is_private', false);
        if (options?.onlyJournal) q = q.eq('is_journal', true);
        const { data, error } = await q;
        if (!error && data && data.length > 0) return data as BlogPost[];
      } catch (err) {
        console.warn('Supabase blog posts fallback:', err);
      }
    }
    let list = [...state.posts];
    if (!options?.includeDrafts) {
      list = list.filter((p) => p.status === 'published');
    }
    if (!options?.includePrivate) {
      list = list.filter((p) => !p.is_private);
    }
    if (options?.onlyJournal) {
      list = list.filter((p) => p.is_journal);
    }
    if (options?.category) {
      const cat = state.categories.find((c) => c.slug === options.category);
      if (cat) list = list.filter((p) => p.category_id === cat.id);
    }
    if (options?.tag) {
      list = list.filter((p) => p.tags?.includes(options.tag!));
    }
    return list.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
  },

  async getBlogPostBySlug(slug: string, allowPrivate: boolean = false): Promise<BlogPost | null> {
    const posts = await this.getBlogPosts({ includePrivate: allowPrivate, includeDrafts: allowPrivate });
    return posts.find((p) => p.slug === slug) || null;
  },

  async createBlogPost(post: Omit<BlogPost, 'id' | 'views' | 'created_at'>): Promise<BlogPost> {
    const newPost: BlogPost = {
      ...post,
      id: `post-${Date.now()}`,
      views: 0,
      created_at: new Date().toISOString(),
    };
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('blog_posts').insert(newPost).select().single();
        if (!error && data) return data as BlogPost;
      } catch (err) {
        console.warn('Supabase create blog fallback:', err);
      }
    }
    state.posts.unshift(newPost);
    return newPost;
  },

  async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('blog_posts').update(updates).eq('id', id).select().single();
        if (!error && data) return data as BlogPost;
      } catch (err) {
        console.warn('Supabase update blog fallback:', err);
      }
    }
    const idx = state.posts.findIndex((p) => p.id === id);
    if (idx !== -1) {
      state.posts[idx] = { ...state.posts[idx], ...updates, updated_at: new Date().toISOString() };
      return state.posts[idx];
    }
    return null;
  },

  async deleteBlogPost(id: string): Promise<boolean> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        await supabase.from('blog_posts').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete blog fallback:', err);
      }
    }
    state.posts = state.posts.filter((p) => p.id !== id);
    return true;
  },

  // BLOG CATEGORIES & TAGS
  async getBlogCategories(): Promise<BlogCategory[]> {
    return [...state.categories];
  },

  async createBlogCategory(cat: Omit<BlogCategory, 'id'>): Promise<BlogCategory> {
    const newCat = { ...cat, id: `cat-${Date.now()}` };
    state.categories.push(newCat);
    return newCat;
  },

  async getBlogTags(): Promise<BlogTag[]> {
    return [...state.tags];
  },

  // MEDIA LIBRARY
  async getMediaItems(): Promise<MediaItem[]> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('media').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data as MediaItem[];
      } catch (err) {
        console.warn('Supabase media fallback:', err);
      }
    }
    return [...state.media];
  },

  async createMediaItem(item: Omit<MediaItem, 'id' | 'created_at'>): Promise<MediaItem> {
    const newItem: MediaItem = {
      ...item,
      id: `med-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('media').insert(newItem).select().single();
        if (!error && data) return data as MediaItem;
      } catch (err) {
        console.warn('Supabase create media fallback:', err);
      }
    }
    state.media.unshift(newItem);
    return newItem;
  },

  async deleteMediaItem(id: string): Promise<boolean> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        await supabase.from('media').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete media fallback:', err);
      }
    }
    state.media = state.media.filter((m) => m.id !== id);
    return true;
  },

  // CONTACT MESSAGES
  async getContactMessages(): Promise<ContactMessage[]> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
        if (!error && data) return data as ContactMessage[];
      } catch (err) {
        console.warn('Supabase contact messages fallback:', err);
      }
    }
    return [...state.messages].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  async createContactMessage(msg: Omit<ContactMessage, 'id' | 'is_read' | 'created_at'>): Promise<ContactMessage> {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      is_read: false,
      created_at: new Date().toISOString(),
    };
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('contact_messages').insert(newMsg).select().single();
        if (!error && data) return data as ContactMessage;
      } catch (err) {
        console.warn('Supabase create message fallback:', err);
      }
    }
    state.messages.unshift(newMsg);
    return newMsg;
  },

  async markMessageRead(id: string): Promise<boolean> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        await supabase.from('contact_messages').update({ is_read: true }).eq('id', id);
      } catch (err) {
        console.warn('Supabase mark message read fallback:', err);
      }
    }
    const found = state.messages.find((m) => m.id === id);
    if (found) found.is_read = true;
    return true;
  },

  async deleteContactMessage(id: string): Promise<boolean> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        await supabase.from('contact_messages').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete message fallback:', err);
      }
    }
    state.messages = state.messages.filter((m) => m.id !== id);
    return true;
  },

  // SITE SETTINGS
  async getSiteSettings(): Promise<SiteSettings> {
    const supabase = createAdminClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('site_settings').select('*').limit(1).single();
        if (!error && data) return data as SiteSettings;
      } catch (err) {
        console.warn('Supabase site settings fallback:', err);
      }
    }
    return state.settings;
  },

  async updateSiteSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
    state.settings = { ...state.settings, ...updates };
    return state.settings;
  },
};
