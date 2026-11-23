import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dataService } from '@/lib/data-service';

const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().optional(),
  inquiry_type: z.enum(['Professional', 'Collaboration', 'Training', 'General']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().optional(), // Honeypot field for anti-spam bots
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check spam honeypot
    if (body.honeypot && body.honeypot.trim() !== '') {
      // Quietly reject bot
      return NextResponse.json({ success: true, message: 'Message received.' });
    }

    const validated = ContactSchema.parse(body);

    const saved = await dataService.createContactMessage({
      name: validated.name,
      email: validated.email,
      subject: validated.subject || `${validated.inquiry_type} Inquiry from ${validated.name}`,
      inquiry_type: validated.inquiry_type,
      message: validated.message,
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received successfully.',
      id: saved.id,
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: err.errors.map((e) => e.message) },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Failed to submit contact message. Please try again.' },
      { status: 500 }
    );
  }
}
