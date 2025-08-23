import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rateLimitMap = new Map();

function rateLimit(ip: string, limit = 10, window = 60000) {
  const now = Date.now();
  const windowStart = now - window;
  
  const requestHistory = rateLimitMap.get(ip) || [];
  const recentRequests = requestHistory.filter((time: number) => time > windowStart);
  
  if (recentRequests.length >= limit) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  
  // Clean up old entries
  if (rateLimitMap.size > 1000) {
    const oldestAllowed = now - window;
    for (const [key, times] of rateLimitMap.entries()) {
      const validTimes = times.filter((time: number) => time > oldestAllowed);
      if (validTimes.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, validTimes);
      }
    }
  }
  
  return true;
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googleapis.com *.gstatic.com *.google-analytics.com *.googletagmanager.com; " +
    "style-src 'self' 'unsafe-inline' *.googleapis.com; " +
    "img-src 'self' data: https: blob:; " +
    "font-src 'self' data: *.gstatic.com; " +
    "connect-src 'self' *.google-analytics.com *.analytics.google.com *.googletagmanager.com *.supabase.co; " +
    "frame-src 'self' *.google.com;"
  );
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );
  
  // Rate limiting for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Different limits for different endpoints
    let limit = 10;
    let window = 60000; // 1 minute
    
    if (request.nextUrl.pathname === '/api/contact' || 
        request.nextUrl.pathname === '/api/quote') {
      limit = 5; // Stricter limit for form submissions
      window = 300000; // 5 minutes
    }
    
    if (!rateLimit(ip, limit, window)) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'Retry-After': '60',
        },
      });
    }
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};