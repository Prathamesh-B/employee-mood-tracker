export interface MoodEntry {
    id: string;
    mood: 'happy' | 'neutral' | 'sad';
    comment?: string;
    timestamp: Date;
}

let moodEntries: MoodEntry[] = [
    {
        id: '1',
        mood: 'happy',
        comment: 'Great day at work!',
        timestamp: new Date('2025-06-10T10:30:00')
    },
    {
        id: '2',
        mood: 'neutral',
        comment: 'Normal day',
        timestamp: new Date('2025-06-11T14:15:00')
    }
];

export const getMoodEntries = (): MoodEntry[] => {
    return moodEntries.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const addMoodEntry = (entry: Omit<MoodEntry, 'id' | 'timestamp'>): MoodEntry => {
    const newEntry: MoodEntry = {
        ...entry,
        id: Date.now().toString(),
        timestamp: new Date()
    };
    moodEntries.push(newEntry);
    return newEntry;
};

export const moodConfig = {
    happy: { emoji: '😊', label: 'Happy', color: 'text-green-600' },
    neutral: { emoji: '😐', label: 'Neutral', color: 'text-yellow-600' },
    sad: { emoji: '😢', label: 'Sad', color: 'text-red-600' }
};