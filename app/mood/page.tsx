"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { moodConfig } from '@/app/api/mood/utils/moods'
import { CheckCircle } from 'lucide-react'

type MoodType = 'happy' | 'neutral' | 'sad'

export default function MoodPage() {
    const [selectedMood, setSelectedMood] = useState<MoodType | null>(null)
    const [comment, setComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedMood) return

        setIsSubmitting(true)
        try {
            const response = await fetch('/api/mood', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mood: selectedMood,
                    comment: comment.trim() || undefined,
                }),
            })

            if (response.ok) {
                setIsSubmitted(true)
                setTimeout(() => {
                    router.push('/')
                }, 1200)
            } else {
                alert('Failed to submit mood. Please try again.')
            }
        } catch {
            alert('Failed to submit mood. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSubmitted) {
        return (
            <div className="max-w-md mx-auto">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center space-y-4">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                            <h2 className="text-2xl font-bold">Thank You!</h2>
                            <p className="text-muted-foreground">
                                Your mood has been recorded successfully.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label className="text-base font-medium">Select your mood:</Label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {Object.entries(moodConfig).map(([key, config]) => (
                                    <Card
                                        key={key}
                                        className={`cursor-pointer transition-colors ${selectedMood === key
                                            ? 'ring-2 ring-primary bg-primary/5'
                                            : 'hover:bg-muted/50'
                                            }`}
                                        onClick={() => setSelectedMood(key as MoodType)}
                                    >
                                        <CardContent className="pt-3">
                                            <div className="text-center space-y-2">
                                                <div className="text-4xl">{config.emoji}</div>
                                                <div className={`font-medium ${config.color}`}>
                                                    {config.label}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="comment">Additional Comments (Optional)</Label>
                            <Textarea
                                id="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={4}
                            />
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full"
                            disabled={!selectedMood || isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Mood'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}