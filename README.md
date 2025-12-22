# YouTube Short Maker

An AI-powered tool that automatically transforms long-form YouTube videos into viral-ready short clips with auto-generated captions. Built with Next.js, AWS serverless architecture, and Gemini AI.

## 🎯 Overview

This application analyzes YouTube videos to identify "peak moments" and automatically generates short-form content optimized for platforms like Instagram Reels, TikTok, and YouTube Shorts. It handles everything from video analysis to caption generation and final video rendering.

**Try it out:** [https://lnkd.in/ephfHt6M](https://lnkd.in/ephfHt6M)  
⚠️ *Note: Running on free tier credits - try it ASAP before credits run out!*

---

## 🏗️ Backend Implementation

### Architecture Overview

<img width="1278" height="1257" alt="sysarch_clip drawio" src="https://github.com/user-attachments/assets/95f21439-bcd2-4742-af93-65763ed5bbfb" />


The backend is built on a fully serverless AWS architecture, orchestrated by AWS Step Functions with the following components:

### 🤖 AI-Powered Content Analysis

**Gemini (Free Tier) + LangChain** for intelligent moment detection:
- Analyzes video subtitles to identify "peak moments" and viral-worthy segments
- Custom string algorithms ensure accurate hook detection (not just random silence)
- Extracts 30-60 second segments with complete narrative arcs
- Returns precise timestamps with word-level accuracy for seamless editing

### ⚙️ Video Processing Pipeline

**AWS SQS + Lambda Workers** for scalable video processing:
- **SQS Queue**: Triggers Lambda workers to process videos in parallel
- **FFmpeg Lambda Layer**: Slices videos at exact timestamps identified by AI
- **Auto-Caption Generation**: Burns in viral-style captions (because nobody watches Reels with sound on anymore)
- **Karaoke-Style Subtitles**: Word-by-word highlighting for maximum engagement

### 🔄 Orchestration

**AWS Step Functions** for workflow management:
- Coordinates the entire pipeline from video download to final output
- Parallel processing of video parsing and metadata extraction
- Error handling and retry logic for robust processing
- Merges results and triggers final video editing

The workflow includes:
1. **Video Download**: Lambda function downloads video from YouTube URL
2. **Parallel Processing**:
   - Parse video response
   - Extract metadata and subtitles
3. **Merge Results**: Combines parsed data
4. **SQS Trigger**: Sends message to video editor queue
5. **Video Editing**: FFmpeg Lambda processes and generates final clip
6. **S3 Upload**: Stores final video in S3 bucket
7. **Webhook Notification**: Updates frontend via Vercel webhook

### 📊 Real-Time Progress Tracking

**Redis Caching** for progress monitoring:
- Caches job progress and status updates
- Vercel frontend polls Redis for real-time updates
- Users know their video is actually processing (not lost in the void)
- Smart-lazy approach: efficient polling without overwhelming the backend

### 🚀 API Gateway

**Amazon API Gateway** serves as the entry point:
- Receives video URL from frontend
- Generates unique job IDs using nanoid
- Triggers Step Functions execution
- Returns job ID for progress tracking

### 🔔 Status Updates

**Vercel Webhooks** for completion notifications:
- Lambda workers send status updates to webhook endpoint
- Frontend receives real-time processing updates
- Final video URL delivered upon completion
- Seamless user experience with loading states

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vercel** - Deployment and hosting
- **Redis** - Progress caching and job status

### Backend
- **AWS Lambda** - Serverless compute
- **AWS Step Functions** - Workflow orchestration
- **AWS SQS** - Message queuing
- **AWS S3** - Video storage
- **AWS API Gateway** - REST API
- **FFmpeg** - Video processing
- **Gemini AI** - Content analysis
- **LangChain** - AI orchestration
- **Python** - Lambda runtime

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- AWS Account with configured credentials
- Redis instance (Upstash recommended)
- Gemini API key

### Frontend Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd yt-short-maker-ui
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Configure the following in `.env`:
- `REDIS_URL` - Your Redis connection URL
- `REDIS_TOKEN` - Redis authentication token
- `API_GATEWAY_URL` - AWS API Gateway endpoint
- `WEBHOOK_SECRET` - Secret for webhook authentication

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Backend Deployment

The backend infrastructure is defined in AWS SAM templates. Refer to the Lambda functions and Step Functions definitions for deployment instructions.

---

## 📝 Features

- ✅ AI-powered viral moment detection
- ✅ Automatic video segmentation (30-60 seconds)
- ✅ Auto-generated karaoke-style captions
- ✅ Real-time processing progress
- ✅ Parallel video processing
- ✅ Scalable serverless architecture
- ✅ Public video URLs for easy sharing

---

## 🎨 Frontend Features

- Modern, responsive UI
- Real-time job status polling
- Video preview with playback controls
- Download processed videos
- Loading states and progress indicators

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- Built with AWS free tier services
- Powered by Google's Gemini AI
- Inspired by the need for quick, viral content creation
