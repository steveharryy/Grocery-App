import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(coupons)
  } catch (error) {
    console.error('Error fetching coupons:', error)
    return NextResponse.json({ error: 'Failed to fetch coupons' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const data = await request.json()

    const coupon = await prisma.coupon.create({
      data: {
        code: data.code,
        description: data.description,
        discount: parseFloat(data.discount),
        forNewUser: data.forNewUser,
        forMember: data.forMember,
        isPublic: data.isPublic || false,
        expiresAt: new Date(data.expiresAt),
      },
    })

    return NextResponse.json(coupon)
  } catch (error) {
    console.error('Error creating coupon:', error)
    return NextResponse.json({ error: 'Failed to create coupon' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')

    await prisma.coupon.delete({
      where: { code },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting coupon:', error)
    return NextResponse.json({ error: 'Failed to delete coupon' }, { status: 500 })
  }
}
