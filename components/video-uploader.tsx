"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface VideoUploaderProps {
  videoUrl: string
  setVideoUrl: (url: string) => void
  onGenerate: () => void
  isProcessing: boolean
}

export function VideoUploader({ videoUrl, setVideoUrl, onGenerate, isProcessing }: VideoUploaderProps) {
  return (
    <div className="border-[5px] border-foreground p-5 lg:p-7 bg-card shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <label className="font-mono text-xs lg:text-sm font-bold mb-4 block tracking-wider border-b-[2px] border-foreground pb-2">
        VIDEO URL
      </label>
      <div className="flex flex-col gap-4">
        <Input
          type="url"
          placeholder="https://youtube.com/watch?v=..."
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="flex-1 border-[3px] border-foreground bg-background font-mono text-sm lg:text-base px-4 py-6 focus-visible:ring-4 focus-visible:ring-accent focus-visible:border-foreground disabled:opacity-50"
          disabled={isProcessing}
        />
        <Button
          onClick={onGenerate}
          disabled={isProcessing || !videoUrl.trim()}
          className="w-full bg-foreground text-background hover:bg-accent hover:text-accent-foreground font-mono tracking-wider px-6 py-6 lg:py-7 text-sm lg:text-base font-bold disabled:opacity-50 border-[3px] border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-0.5"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-accent animate-pulse"></span>
              PROCESSING...
            </span>
          ) : (
            "GENERATE CLIP"
          )}
        </Button>
      </div>
      <div className="mt-4 pt-4 border-t-[2px] border-foreground/20">
        <p className="text-xs font-mono tracking-wider text-muted-foreground mb-2">SUPPORTED PLATFORMS:</p>
        <div className="flex gap-2 flex-wrap">
          {["YOUTUBE", "TIKTOK", "INSTAGRAM"].map((platform) => (
            <span
              key={platform}
              className="inline-block border-[2px] border-foreground/30 bg-muted px-2 py-1 text-[10px] font-mono font-bold"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
