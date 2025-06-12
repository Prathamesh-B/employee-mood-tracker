import { NextRequest, NextResponse } from 'next/server';
import { getMoodEntries, addMoodEntry } from '@/app/api/mood/utils/moods';

export async function GET() {
    try {
        const entries = getMoodEntries();
        return NextResponse.json(entries);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch mood entries' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { mood, comment } = body;

        if (!mood || !['happy', 'neutral', 'sad'].includes(mood)) {
            return NextResponse.json(
                { error: 'Invalid mood value' },
                { status: 400 }
            );
        }

        const newEntry = addMoodEntry({ mood, comment });
        return NextResponse.json(newEntry, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create mood entry' },
            { status: 500 }
        );
    }
}