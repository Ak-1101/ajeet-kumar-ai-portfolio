import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ajeetkumar.dev'),
  title: 'Ajeet Kumar | Software Engineer – AI/ML Trainer & Agentic AI Specialist',
  description:
    'Official portfolio, blog & academic platform of Ajeet Kumar. Bridging AI, Industry & Education through Generative AI, Agentic AI, technical training, and experiential learning.',
  keywords: [
    'Ajeet Kumar',
    'AI ML Trainer',
    'Generative AI',
    'Agentic AI',
    'Subject Matter Expert',
    'RAG',
    'Prompt Engineering',
    'SmartBridge',
    'CollegeDekho',
    'Python AI Trainer',
  ],
  authors: [{ name: 'Ajeet Kumar', url: 'https://github.com/Ak-1101' }],
  creator: 'Ajeet Kumar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ajeetkumar.dev',
    title: 'Ajeet Kumar | AI/ML Trainer & Agentic AI Specialist',
    description: 'Bridging AI, Industry & Education through Generative AI & Agentic Systems.',
    siteName: 'Ajeet Kumar AI Portfolio',
    images: [
      {
        url: '/assets/ajeet-kumar-profile.jpg',
        width: 800,
        height: 1000,
        alt: 'Ajeet Kumar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ajeet Kumar | AI/ML Trainer & Agentic AI Specialist',
    description: 'Bridging AI, Industry & Education through Generative AI & Agentic Systems.',
    images: ['/assets/ajeet-kumar-profile.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col antialiased selection:bg-cyan-500 selection:text-black">
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
