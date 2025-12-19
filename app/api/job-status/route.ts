import { NextResponse } from 'next/server';
import redis from '@/lib/redis';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const job_id = searchParams.get('job_id');

    if (!job_id) {
        return NextResponse.json({ error: 'job_id is required' }, { status: 400 });
    }

    try {
        const data = await redis.get(`job:${job_id}`);

        if (!data) {
            return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        }

        return NextResponse.json(JSON.parse(data));

    } catch (error) {
        console.error('Error fetching job status:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
