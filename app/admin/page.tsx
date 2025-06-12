"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { MoodEntry, moodConfig } from '@/app/api/mood/utils/moods'
import Link from 'next/link'

export default function AdminPage() {
    const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([])
    const [error, setError] = useState<string | null>(null)

    const fetchMoodEntries = async () => {
        try {
            const response = await fetch('/api/mood')
            if (response.ok) {
                const data = await response.json()
                setMoodEntries(data)
                setError(null)
            } else {
                setError('Failed to fetch mood entries')
            }
        } catch {
            setError('Failed to fetch mood entries')
        }
    }

    useEffect(() => {
        fetchMoodEntries()
    }, [])

    const formatDate = (date: string | Date) => {
        return new Date(date).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div>
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    </div>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        Recent Mood Entries
                    </CardTitle>
                    <CardDescription>
                        Latest mood submissions from employees
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {error ? (
                        <div className="text-center py-8">
                            <p className="text-red-500">{error}</p>
                            <Button onClick={fetchMoodEntries} className="mt-4">
                                Try Again
                            </Button>
                        </div>
                    ) : moodEntries.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">No mood entries yet.</p>
                            <Link href="/mood">
                                <Button className="mt-4">Submit First Mood</Button>
                            </Link>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Mood</TableHead>
                                    <TableHead>Comment</TableHead>
                                    <TableHead>Date & Time</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {moodEntries.map((tableItem) => (
                                    <TableRow key={tableItem.id}>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-2xl">
                                                    {moodConfig[tableItem.mood].emoji}
                                                </span>
                                                <span className={`font-medium ${moodConfig[tableItem.mood].color}`}>
                                                    {moodConfig[tableItem.mood].label}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="max-w-md">
                                            {tableItem.comment ? (
                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                    {tableItem.comment}
                                                </p>
                                            ) : (
                                                <span className="text-xs text-muted-foreground italic">
                                                    No comment
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            <div className="flex items-center">
                                                {formatDate(tableItem.timestamp)}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}