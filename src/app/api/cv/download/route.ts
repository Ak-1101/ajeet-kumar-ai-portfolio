import { NextResponse } from 'next/server';
import { dataService } from '@/lib/data-service';

export async function GET() {
  try {
    const currentCV = await dataService.getCurrentCV();
    const cvUrl = currentCV?.file_url || '/docs/Ajeet_Kumar_CV.pdf';

    // If it's a relative path starting with /docs/ or /certs/ or /assets/, redirect to it
    // with header disposition to force download as Ajeet_Kumar_CV.pdf
    return NextResponse.redirect(new URL(cvUrl, process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'), {
      status: 307,
    });
  } catch (error) {
    return NextResponse.redirect(new URL('/docs/Ajeet_Kumar_CV.pdf', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));
  }
}
