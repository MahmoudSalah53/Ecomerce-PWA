// app/api/auth/signup/route.ts

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  console.log("Signup route was called");
  return new Response('OK', { status: 200 });
}