"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { VideoPreview } from "@/components/video-preview"
import Link from "next/link"

export default function VideoResultPage() {
    const params = useParams()
    const jobId = params.jobId as string

    const [generatedClip, setGeneratedClip] = useState<{
        url: string
        duration: number
        title: string
    } | null>(null)
    const [isProcessing, setIsProcessing] = useState(true)
    const [jobStatus, setJobStatus] = useState<string>("Initializing...")
    const pollInterval = useRef<NodeJS.Timeout | null>(null)

    // Cleanup polling on unmount
    useEffect(() => {
        return () => {
            if (pollInterval.current) clearInterval(pollInterval.current)
        }
    }, [])

    // Start polling immediately
    useEffect(() => {
        if (jobId) {
            pollJob(jobId)
            pollInterval.current = setInterval(() => pollJob(jobId), 2000)
        }
    }, [jobId])

    const pollJob = async (currentJobId: string) => {
        try {
            const res = await fetch(`/api/job-status?job_id=${currentJobId}`)
            if (!res.ok) return

            const data = await res.json()
            setJobStatus(data.message || data.status)

            if (data.status === 'completed') {
                if (pollInterval.current) clearInterval(pollInterval.current)
                setIsProcessing(false)
                setGeneratedClip({
                    url: data.public_url,
                    duration: 45, // You might want to get this from the backend too if available
                    title: `Job: ${currentJobId}`,
                })
            } else if (data.status === 'failed') {
                if (pollInterval.current) clearInterval(pollInterval.current)
                setIsProcessing(false)
                alert('Job failed: ' + (data.message || 'Unknown error'))
            }
        } catch (error) {
            console.error('Error polling job:', error)
        }
    }

    return (
        <main className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="border-b-[6px] border-foreground bg-card">
                <div className="container mx-auto px-4 sm:px-6 py-6 lg:py-8">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 lg:gap-4 hover:opacity-80 transition-opacity">
                            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-foreground border-[4px] border-foreground flex items-center justify-center relative overflow-hidden">
                                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-accent animate-pulse"></div>
                                <div className="absolute top-1 left-1 w-2 h-2 bg-accent"></div>
                            </div>
                            <div>
                                <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tighter leading-none">
                                    VIRAL
                                </h1>
                                <div className="font-mono text-xs sm:text-sm lg:text-base font-bold tracking-[0.3em] leading-none mt-0.5 lg:mt-1">
                                    SHORTS
                                </div>
                            </div>
                        </Link>
                        <div className="flex gap-2 sm:gap-4">
                            <Link href="/">
                                <Button
                                    variant="default"
                                    className="font-mono text-xs lg:text-sm tracking-wide bg-accent text-accent-foreground hover:bg-foreground hover:text-background border-[3px] border-foreground px-4 lg:px-6"
                                >
                                    CREATE NEW
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {isProcessing ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-4">
                        <div className="text-center space-y-8 max-w-md w-full">
                            <div className="w-24 h-24 mx-auto bg-foreground border-[4px] border-foreground flex items-center justify-center relative overflow-hidden animate-pulse">
                                <div className="w-12 h-12 bg-accent"></div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="font-sans text-3xl sm:text-4xl font-black tracking-tighter">
                                    PROCESSING VIDEO
                                </h2>
                                <div className="inline-block border-[3px] border-foreground bg-accent px-6 py-3">
                                    <span className="font-mono text-sm sm:text-base font-bold tracking-wider uppercase">
                                        {jobStatus || "Initializing..."}
                                    </span>
                                </div>
                                <p className="text-foreground/70 font-mono text-xs sm:text-sm">
                                    Please wait while our AI works its magic. This may take a few minutes.
                                </p>
                                <p className="text-foreground/50 font-mono text-xs">
                                    Job ID: {jobId}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : generatedClip ? (
                    <section className="flex-1 bg-card">
                        <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-20">
                            <div className="mb-8 lg:mb-12">
                                <div className="inline-block border-[3px] border-foreground bg-accent px-4 py-2 mb-4">
                                    <span className="font-mono text-xs lg:text-sm font-bold tracking-wider">SUCCESS</span>
                                </div>
                                <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold">Your Clip is Ready</h2>
                            </div>
                            <VideoPreview clip={generatedClip} />
                        </div>
                    </section>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="font-mono text-xl">Job not found or failed.</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-foreground text-background mt-auto">
                <div className="container mx-auto px-4 sm:px-6 py-10 lg:py-12">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-accent border-[3px] border-background flex items-center justify-center">
                                    <div className="w-5 h-5 lg:w-6 lg:h-6 bg-foreground"></div>
                                </div>
                                <div>
                                    <div className="font-sans text-xl lg:text-2xl font-black tracking-tighter leading-none">VIRAL</div>
                                    <div className="font-mono text-[10px] lg:text-xs font-bold tracking-[0.3em] leading-none">SHORTS</div>
                                </div>
                            </div>
                            <p className="text-sm text-background/70 max-w-xs">
                                Transform your long-form content into viral shorts with AI-powered precision.
                            </p>
                        </div>
                        <div className="border-t-[2px] border-background/20 mt-8 pt-8 lg:mt-0 lg:pt-0 lg:border-t-0">
                            <p className="font-mono text-xs tracking-wide text-center text-background/60">
                                © 2025 VIRAL SHORTS — ALL RIGHTS RESERVED
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    )
}
