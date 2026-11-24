import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import { dataService } from '@/lib/data-service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    let buffer: Buffer | null = null;
    const fileName = 'Ajeet_Kumar_CV.pdf';

    // 1. Try to fetch current CV from data service
    try {
      const currentCV = await dataService.getCurrentCV();
      if (currentCV?.file_url) {
        if (currentCV.file_url.startsWith('http://') || currentCV.file_url.startsWith('https://')) {
          const res = await fetch(currentCV.file_url);
          if (res.ok) {
            const arrayBuffer = await res.arrayBuffer();
            buffer = Buffer.from(arrayBuffer);
          }
        } else {
          // Relative path in public directory
          const relativeClean = currentCV.file_url.replace(/^\/+/, '');
          const localPath = path.join(process.cwd(), 'public', relativeClean);
          if (fs.existsSync(localPath)) {
            buffer = fs.readFileSync(localPath);
          }
        }
      }
    } catch (err) {
      console.warn('Error reading active CV from data service:', err);
    }

    // 2. Fallback to public/docs/Ajeet_Kumar_CV.pdf or public/Ajeet_Kumar_CV.pdf
    if (!buffer) {
      const primaryPath = path.join(process.cwd(), 'public', 'docs', 'Ajeet_Kumar_CV.pdf');
      const secondaryPath = path.join(process.cwd(), 'public', 'Ajeet_Kumar_CV.pdf');

      if (fs.existsSync(primaryPath)) {
        buffer = fs.readFileSync(primaryPath);
      } else if (fs.existsSync(secondaryPath)) {
        buffer = fs.readFileSync(secondaryPath);
      }
    }

    if (!buffer || buffer.length === 0) {
      return new Response('CV file not found', { status: 404 });
    }

    // 3. Return direct binary response with proper attachment download headers
    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`,
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'public, max-age=60, s-maxage=60',
      },
    });
  } catch (error) {
    console.error('CV download error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
