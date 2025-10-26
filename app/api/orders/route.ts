import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userId,
      email,
      firstName,
      lastName,
      address,
      city,
      state,
      zipCode,
      country,
      phone,
      total,
      items,
    } = body;

    // Create order
    const order = await prisma.order.create({
      data: {
        userId: userId || undefined,
        email,
        firstName,
        lastName,
        address,
        city,
        state,
        zipCode,
        country: country || "United States",
        phone,
        total,
        status: "processing",
        orderItems: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (userId) {
      // Get orders for a specific user
      const orders = await prisma.order.findMany({
        where: { userId },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(orders);
    }

    // Get all orders (admin functionality)
    const orders = await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
