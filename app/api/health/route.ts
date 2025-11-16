import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongoose';

export async function GET() {
  try {
    await connectDB();

    return NextResponse.json({
      status: 'ok',
      message: 'API is running',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Database connection failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
