import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data.csv');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const parsed = Papa.parse(fileContent, { header: true });
    
    return NextResponse.json(parsed.data);
  } catch (error) {
    console.error('Error reading CSV:', error);
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
} 