import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials, setAdminSession } from '@/lib/auth-service';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
    }

    const isValid = await verifyAdminCredentials(email, password);

    if (!isValid) {
      return NextResponse.json({ success: false, message: 'Invalid administrator credentials' }, { status: 401 });
    }

    await setAdminSession(email);

    return NextResponse.json({
      success: true,
      message: 'Authentication successful',
      user: { email, role: 'admin' },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'An internal server error occurred' }, { status: 500 });
  }
}
