// app/api/auth/login/route.ts

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  console.log("Login route was called"); // Log بسيط عشان نتأكد إنه شغال
  return new Response('OK', { status: 200 });
}