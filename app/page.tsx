import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Mood Tracker
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A simple way to share how you&apos;re feeling at work.
        </p>
      </div>

      <div className="text-center space-y-4">
        <Link href="/mood">
          <Button size="lg" className="text-lg px-8 py-3">
            Submit Your Mood
          </Button>
        </Link>

      </div>
    </div>
  )
}