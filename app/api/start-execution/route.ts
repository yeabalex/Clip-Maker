import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import redis from '@/lib/redis';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { video_url, previous_job_id } = body;

        if (!video_url) {
            return NextResponse.json({ error: 'video_url is required' }, { status: 400 });
        }

        // Clean up previous job if provided
        if (previous_job_id) {
            await redis.del(`job:${previous_job_id}`);
        }

        // Generate IDs with prefixes
        const job_id = `job-${nanoid()}`;
        const video_name = `vid-${nanoid()}`;

        // Store initial job state in Redis
        await redis.set(`job:${job_id}`, JSON.stringify({
            status: 'queued',
            progress: 0,
            message: 'Starting execution...'
        }), 'EX', 86400); // Expire after 24 hours

        const payload = {
            video_url,
            job_id,
            video_name,
        };

        const apiKey = process.env.API_KEY;
        const url = process.env.URL;

        if (!apiKey || !url) {
            console.warn('API_KEY or URL is not defined in environment variables');
        }

        const externalResponse = await fetch(url || 'https://r8947gxm05.execute-api.us-east-1.amazonaws.com/Prod/start-execution', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey || '',
            },
            body: JSON.stringify(payload),
        });

        const data = await externalResponse.json();

        return NextResponse.json({
            ...data,
            job_id, // Return generated IDs back to client if needed
            video_name
        }, { status: externalResponse.status });

    } catch (error) {
        console.error('Error in start-execution handler:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
