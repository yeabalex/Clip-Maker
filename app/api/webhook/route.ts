import { NextResponse } from 'next/server';
import redis from '@/lib/redis';

export async function POST(request: Request) {
    try {
        // Verify webhook authentication
        const webhookSecret = process.env.WEBHOOK_SECRET;
        const providedSecret = request.headers.get('X-Webhook-Secret');

        if (!webhookSecret) {
            console.error('WEBHOOK_SECRET is not configured in environment variables');
            return NextResponse.json(
                { error: 'Webhook authentication not configured' },
                { status: 500 }
            );
        }

        if (!providedSecret || providedSecret !== webhookSecret) {
            console.warn('Unauthorized webhook attempt');
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        let body = await request.json();

        // Handle the case where the payload is wrapped in an API Gateway style response
        if (body.statusCode === 200 && typeof body.body === 'string') {
            try {
                const innerBody = JSON.parse(body.body);
                // Merge inner body into the main body object or use it as the source of truth
                body = { ...body, ...innerBody };
            } catch (e) {
                console.error('Failed to parse inner body string:', e);
            }
        }

        const { job_id, status, message, output_s3_key, public_url } = body;

        if (!job_id) {
            return NextResponse.json({ error: 'job_id is required' }, { status: 400 });
        }

        if (!status && !message) {
            // If we don't have an explicit status but we have the completion fields, infer completed
            if (public_url) {
                body.status = 'completed';
            }
        }

        // Prepare the data to store in Redis
        const updateData: any = {
            status: body.status || 'processing', // Default to processing if just a message update
            updatedAt: new Date().toISOString(),
        };

        if (message) updateData.message = message;
        if (public_url) updateData.public_url = public_url;
        if (output_s3_key) updateData.output_s3_key = output_s3_key;

        // If the status is explicitly completed or failed, make sure we capture that
        if (status === 'completed' || status === 'failed') {
            updateData.status = status;
        }

        // If we received the specific completion payload the user mentioned:
        // { statusCode: 200, body: "..." } -> inside body: { message: '...', job_id: '...', ... }
        // We already parsed the inner body above.
        // So if we have public_url, we can assume it's completed.
        if (public_url && updateData.status !== 'failed') {
            updateData.status = 'completed';
        }

        // Retrieve existing data to merge (optional, but good practice to keep history if needed)
        // For now, we'll just overwrite/merge with what we have.
        const existingDataStr = await redis.get(`job:${job_id}`);
        let existingData = {};
        if (existingDataStr) {
            existingData = JSON.parse(existingDataStr);
        }

        const finalData = {
            ...existingData,
            ...updateData
        };

        await redis.set(`job:${job_id}`, JSON.stringify(finalData), 'EX', 86400);

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error in webhook handler:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
