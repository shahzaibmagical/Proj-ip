import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '0.0.0.0';
  const userAgent = req.headers.get('user-agent') || 'Unknown';

  const res = await fetch(`https://ipinfo.io/${ip}?token=36b0c8e9c35aa1`, {
    headers: { Accept: 'application/json' }
  });

  const geo = await res.json();

  return NextResponse.json({
    ipv4: geo.ip?.includes('.') ? geo.ip : null,
    ipv6: geo.ip?.includes(':') ? geo.ip : null,
    country: geo.country || 'Unknown',
    region: geo.region || 'Unknown',
    city: geo.city || 'Unknown',
    zip: geo.postal || 'Unknown',
    isp: geo.org?.split(' ')[1] || 'Unknown',
    org: geo.org || 'Unknown',
    asn: geo.asn || geo.org || 'Unknown',
    timezone: geo.timezone || 'Unknown',
    user_agent: userAgent
  });
}
