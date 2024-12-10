import { NextRequest, NextResponse } from 'next/server';
import { tryRefreshSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const response = await tryRefreshSession(request);
  if (response) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}