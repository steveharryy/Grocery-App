import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const where = status ? { status } : { status: { in: ['approved', 'pending'] } }

    const stores = await prisma.store.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(stores)
  } catch (error) {
    console.error('Error fetching stores:', error)
    return NextResponse.json({ error: 'Failed to fetch stores' }, { status: 500 })
  }
}

export async function PATCH(request) {
  try {
    const { storeId, isActive, status } = await request.json()

    const updateData = {}
    if (typeof isActive !== 'undefined') updateData.isActive = isActive
    if (status) updateData.status = status

    const store = await prisma.store.update({
      where: { id: storeId },
      data: updateData,
    })

    return NextResponse.json(store)
  } catch (error) {
    console.error('Error updating store:', error)
    return NextResponse.json({ error: 'Failed to update store' }, { status: 500 })
  }
}
