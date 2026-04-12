export interface Env {
	// Add your environment variables here
	SUPABASE_URL: string;
}

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS,PUT,PATCH,DELETE',
	'Access-Control-Allow-Headers': '*',
	'Access-Control-Max-Age': '86400',
};

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// 1. Handle CORS Preflight Requests
		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}

		// 2. Extract the path from the incoming request (e.g., /rest/v1/users)
		const url = new URL(request.url);
		const pathname = url.pathname;
		const searchParams = url.search;

		// 3. Construct the exact Supabase URL to forward to
		// Ensure you set the SUPABASE_URL in your wrangler.toml or via secrets
		const targetUrl = `${env.SUPABASE_URL}${pathname}${searchParams}`;

		try {
			// 4. Create a new request copying the original method, headers, and body
			const newHeaders = new Headers(request.headers);
			newHeaders.delete('Host'); // Cloudflare will error 1016 if we keep the worker's Host header

			const modifiedRequest = new Request(targetUrl, {
				method: request.method,
				headers: newHeaders,
				body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : null,
				redirect: 'follow', // Make sure redirects are followed
			});

			// 5. Fetch the result from the actual Supabase servers
			const response = await fetch(modifiedRequest);

			// 6. Copy the response but inject our CORS headers so the browser doesn't block it
			const newResponse = new Response(response.body, response);
			
			for (const [key, value] of Object.entries(corsHeaders)) {
				newResponse.headers.set(key, value);
			}

			return newResponse;

		} catch (e: any) {
			return new Response(JSON.stringify({ error: e.message || 'Error occurred while proxying' }), {
				status: 500,
				headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			});
		}
	},
};
