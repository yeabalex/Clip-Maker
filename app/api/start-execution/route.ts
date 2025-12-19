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

        // Debug logging
        console.log('Attempting to start execution...');
        console.log('API_KEY present:', !!apiKey);
        if (apiKey) {
            console.log('API_KEY length:', apiKey.length);
            console.log('API_KEY first 4 chars:', apiKey.substring(0, 4));
        }
        console.log('Target URL:', url || 'Default AWS URL');

        if (!apiKey) {
            console.error('Configuration Error: API_KEY is not defined in environment variables');
            return NextResponse.json({ error: 'Server misconfiguration: Missing API Key' }, { status: 500 });
        }

        const awsUrl = url || 'https://r8947gxm05.execute-api.us-east-1.amazonaws.com/Prod/start-execution';

        const externalResponse = await fetch(awsUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey.trim(), // Ensure no whitespace
            },
            body: JSON.stringify(payload),
        });

        console.log('AWS Response Status:', externalResponse.status);

        let data;
        const responseText = await externalResponse.text();
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            console.error('Failed to parse AWS response as JSON:', responseText);
            data = { message: responseText };
        }

        if (!externalResponse.ok) {
            //console.error('AWS API Error:', data);
            return NextResponse.json({
                error: 'Upstream API Error',
                details: data,
                status: externalResponse.status
            }, { status: externalResponse.status });
        }

        return NextResponse.json({
            job_id, // Return generated IDs back to client if needed
            video_name
        }, { status: 200 });

    } catch (error) {
        console.error('Error in start-execution handler:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
