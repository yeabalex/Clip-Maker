"use client"

import { Button } from "@/components/ui/button"
import { Download, Share2 } from "lucide-react"

interface VideoPreviewProps {
  clip: {
    url: string
    duration: number
    title: string
  }
}

export function VideoPreview({ clip }: VideoPreviewProps) {
  const handleDownload = () => {
    // TODO: Implement actual download functionality
    // const link = document.createElement('a')
    // link.href = clip.url
    // link.download = 'clip.mp4'
    // link.click()
    console.log("[v0] Downloading clip...")
  }

  const handleShare = (platform: string) => {
    // TODO: Implement actual sharing functionality
    // Example for Twitter:
    // window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(clip.url)}`)
    console.log(`[v0] Sharing to ${platform}...`)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Video Player */}
      <div className="border-[6px] border-foreground bg-card shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div className="border-b-[4px] border-foreground bg-foreground p-4 lg:p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-xs lg:text-sm font-bold text-background tracking-wider">YOUR CLIP</h3>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-accent"></div>
              <div className="w-3 h-3 border-[2px] border-background"></div>
              <div className="w-3 h-3 border-[2px] border-background"></div>
            </div>
          </div>
        </div>
        <div className="p-6 lg:p-10 bg-muted">
          <div className="aspect-[9/16] bg-card border-[4px] border-foreground max-w-sm mx-auto overflow-hidden">
            <img
              src={clip.url || "/placeholder.svg?height=1080&width=608"}
              alt={clip.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-6 flex items-center justify-between text-xs font-mono border-[2px] border-foreground bg-card p-3">
            <span className="font-bold">{clip.duration}s</span>
            <span className="text-muted-foreground">MP4</span>
            <span className="font-bold">1080P</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-6 lg:gap-8">
        {/* Download Section */}
        <div className="border-[5px] border-foreground bg-card p-6 lg:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-sans text-2xl lg:text-3xl font-bold">Download</h3>
            <div className="w-12 h-12 border-[3px] border-foreground bg-accent flex items-center justify-center">
              <Download className="w-6 h-6" />
            </div>
          </div>
          <p className="text-foreground/70 mb-6 leading-relaxed text-sm lg:text-base">
            High-quality MP4 ready for any platform. Optimized for social media with perfect aspect ratio.
          </p>
          <Button
            onClick={handleDownload}
            className="w-full bg-foreground text-background hover:bg-accent hover:text-accent-foreground font-mono tracking-wider py-6 lg:py-7 text-sm lg:text-base font-bold border-[3px] border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            DOWNLOAD MP4
          </Button>
        </div>

        {/* Share Section */}
        <div className="border-[5px] border-foreground bg-card p-6 lg:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-sans text-2xl lg:text-3xl font-bold">Share</h3>
            <div className="w-12 h-12 border-[3px] border-foreground bg-accent flex items-center justify-center">
              <Share2 className="w-6 h-6" />
            </div>
          </div>
          <p className="text-foreground/70 mb-6 leading-relaxed text-sm lg:text-base">
            Share directly to social platforms. One-click distribution to grow your audience.
          </p>
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            {[
              { name: "TIKTOK", color: "bg-foreground" },
              { name: "INSTAGRAM", color: "bg-foreground" },
              { name: "YOUTUBE", color: "bg-foreground" },
              { name: "TWITTER", color: "bg-foreground" },
            ].map((platform) => (
              <Button
                key={platform.name}
                onClick={() => handleShare(platform.name)}
                variant="outline"
                className="border-[3px] border-foreground bg-card hover:bg-accent hover:border-foreground font-mono tracking-wide py-5 lg:py-6 text-xs lg:text-sm font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                {platform.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-[5px] border-foreground bg-accent p-6 lg:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="font-mono text-xs lg:text-sm font-bold mb-6 tracking-wider border-b-[2px] border-foreground pb-2">
            CLIP INSIGHTS
          </h3>
          <div className="grid grid-cols-3 gap-4 lg:gap-6">
            {[
              { value: "9.2", label: "VIRAL SCORE" },
              { value: "87%", label: "ENGAGEMENT" },
              { value: "4.5M", label: "EST. REACH" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-sans text-2xl lg:text-3xl xl:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-[10px] lg:text-xs font-mono tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
