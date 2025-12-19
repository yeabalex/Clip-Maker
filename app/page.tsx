"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { VideoUploader } from "@/components/video-uploader"


export default function Home() {
  const router = useRouter()
  const [videoUrl, setVideoUrl] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleGenerate = async () => {
    if (!videoUrl.trim()) return

    setIsProcessing(true)

    try {
      const response = await fetch('/api/start-execution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          video_url: videoUrl,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to start execution')
      }

      const data = await response.json()
      console.log('Execution started:', data)

      // Redirect to the status/result page
      router.push(`/video/${data.job_id}`)

    } catch (error) {
      console.error('Error generating clip:', error)
      setIsProcessing(false)
      // You might want to show an error toast here
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-[6px] border-foreground bg-card">
        <div className="container mx-auto px-4 sm:px-6 py-6 lg:py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 lg:gap-4">
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
            </div>
            <div className="flex gap-2 sm:gap-4">
              <Button
                variant="ghost"
                className="hidden sm:flex font-mono text-xs lg:text-sm tracking-wide hover:bg-secondary border-[2px] border-transparent hover:border-foreground px-3 lg:px-4"
              >
                HOW IT WORKS
              </Button>
              <Button
                variant="default"
                className="font-mono text-xs lg:text-sm tracking-wide bg-accent text-accent-foreground hover:bg-foreground hover:text-background border-[3px] border-foreground px-4 lg:px-6"
              >
                GET STARTED
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b-[6px] border-foreground">
        <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div>
              <div className="inline-block border-[3px] border-foreground bg-accent px-4 py-2 mb-6 lg:mb-8">
                <span className="font-mono text-xs lg:text-sm font-bold tracking-wider">AI-POWERED</span>
              </div>
              <h2 className="font-sans text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tighter text-balance mb-6 lg:mb-8">
                Turn Long Videos Into{" "}
                <span className="inline-block bg-accent border-[4px] border-foreground px-3 py-1 -rotate-1">
                  Viral Shorts
                </span>
              </h2>
              <p className="text-base lg:text-lg xl:text-xl text-foreground/80 leading-relaxed mb-8 lg:mb-10 max-w-xl">
                Extract the most engaging moments from YouTube videos. Convert them into TikTok-ready short clips
                automatically with AI-powered analysis.
              </p>
              <VideoUploader
                videoUrl={videoUrl}
                setVideoUrl={setVideoUrl}
                onGenerate={handleGenerate}
                isProcessing={isProcessing}
              />
            </div>
            <div className="border-[6px] border-foreground bg-card shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <div className="border-b-[4px] border-foreground bg-foreground p-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border-[2px] border-background"></div>
                  <div className="w-3 h-3 border-[2px] border-background"></div>
                  <div className="w-3 h-3 bg-accent border-[2px] border-background"></div>
                  <span className="font-mono text-xs text-background ml-auto tracking-wider">PREVIEW</span>
                </div>
              </div>
              <div className="p-6 lg:p-10 bg-muted">
                <div className="aspect-[9/16] bg-black border-[4px] border-foreground flex items-center justify-center max-w-xs mx-auto overflow-hidden relative">
                  <video
                    src="/vid-v4Dd7J8jXrj_hcbvXg3ZA_processed.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* How It Works */}
      <section className="border-b-[6px] border-foreground bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-20">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter mb-4">
              How It Works
            </h2>
            <p className="text-base lg:text-lg text-foreground/70 max-w-2xl mx-auto">
              Three simple steps to create viral-worthy content
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                step: "01",
                title: "Paste Your URL",
                description:
                  "Copy any YouTube or TikTok video link. Paste it into the input field. We support all major video platforms.",
              },
              {
                step: "02",
                title: "AI Analysis",
                description:
                  "Our AI scans the entire video. It identifies peak moments with the highest engagement potential automatically.",
              },
              {
                step: "03",
                title: "Download & Share",
                description:
                  "Get your viral-ready clip instantly. Download in high quality or share directly to all your social platforms.",
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="border-[5px] border-foreground bg-card shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1"
              >
                <div className="border-b-[4px] border-foreground bg-accent p-4 lg:p-6">
                  <div className="font-mono text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">{item.step}</div>
                </div>
                <div className="p-6 lg:p-8">
                  <h3 className="font-sans text-xl lg:text-2xl font-bold mb-3 lg:mb-4">{item.title}</h3>
                  <p className="text-foreground/70 leading-relaxed text-sm lg:text-base">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-b-[6px] border-foreground bg-accent">
        <div className="container mx-auto px-4 sm:px-6 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-sans text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter mb-6 lg:mb-8 text-balance">
              Ready to Create{" "}
              <span className="inline-block border-[5px] border-foreground bg-foreground text-accent px-4 py-2 rotate-1">
                Viral Content?
              </span>
            </h2>
            <p className="text-base lg:text-xl text-foreground/80 mb-8 lg:mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of creators who are already using our AI-powered tool to generate engaging short clips.
            </p>
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-foreground text-background hover:bg-foreground/90 font-mono text-sm lg:text-base tracking-wide px-8 lg:px-12 py-6 lg:py-8 text-base lg:text-lg font-bold border-[4px] border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              START CREATING NOW
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background">
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
            <div className="flex flex-col sm:flex-row gap-6 lg:gap-8">
              <div>
                <h4 className="font-mono text-xs font-bold tracking-wider mb-3">PRODUCT</h4>
                <div className="flex flex-col gap-2">
                  {["Features", "Pricing", "FAQ"].map((item) => (
                    <button
                      key={item}
                      className="font-mono text-sm text-background/70 hover:text-accent transition-colors text-left"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-mono text-xs font-bold tracking-wider mb-3">LEGAL</h4>
                <div className="flex flex-col gap-2">
                  {["Privacy", "Terms", "Contact"].map((item) => (
                    <button
                      key={item}
                      className="font-mono text-sm text-background/70 hover:text-accent transition-colors text-left"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="border-t-[2px] border-background/20 mt-8 pt-8">
            <p className="font-mono text-xs tracking-wide text-center text-background/60">
              © 2025 VIRAL SHORTS — ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
