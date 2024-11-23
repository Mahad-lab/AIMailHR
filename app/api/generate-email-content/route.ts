import { NextResponse } from 'next/server';
import { generateEmailContent } from '@/lib/groq';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
  }

  // save the prompt to the database

  try {
    const content = await generateEmailContent(prompt);
    return NextResponse.json({ content }, { status: 200 });
  } catch (error) {
    console.error('Error generating email content:', error);
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}