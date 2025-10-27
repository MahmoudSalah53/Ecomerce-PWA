// app/api/auth/login/route.ts (نسخة مؤقتة للاختبار)

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// import * as bcrypt from "bcryptjs"; // <-- علّق السطر ده مؤقتاً

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // === الجزء اللي هعدّله ===
    // بدل ما نقارن الباسورد، هنعمل شرط وهمي مؤقت
    // عشان نختبر إذا البناء نفسه هيشتغل ولا لا
    const isValidPassword = password === "test123"; // شرط مؤقت

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }
    // === نهاية التعديل المؤقت ===

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}