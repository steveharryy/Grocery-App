import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const store = await prisma.store.findUnique({
      where: { userId },
    })

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 })
    }

    const [products, orders, ratings] = await Promise.all([
      prisma.product.count({ where: { storeId: store.id } }),
      prisma.order.findMany({
        where: { storeId: store.id },
        select: { total: true },
      }),
      prisma.rating.findMany({
        where: {
          product: { storeId: store.id },
        },
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
          product: {
            select: {
              name: true,
              category: true,
              id: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ])

    const totalEarnings = orders.reduce((sum, order) => sum + order.total, 0)

    return NextResponse.json({
      totalProducts: products,
      totalEarnings: totalEarnings.toFixed(2),
      totalOrders: orders.length,
      ratings,
    })
  } catch (error) {
    console.error('Error fetching store dashboard:', error)
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 })
  }
}
