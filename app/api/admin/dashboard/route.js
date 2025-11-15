import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const [products, orders, stores] = await Promise.all([
      prisma.product.count(),
      prisma.order.findMany({
        select: {
          total: true,
          createdAt: true,
        },
      }),
      prisma.store.count({ where: { status: 'approved' } }),
    ])

    const revenue = orders.reduce((sum, order) => sum + order.total, 0)

    return NextResponse.json({
      products,
      revenue: revenue.toFixed(2),
      orders: orders.length,
      stores,
      allOrders: orders,
    })
  } catch (error) {
    console.error('Error fetching admin dashboard:', error)
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 })
  }
}
