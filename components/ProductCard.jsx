'use client'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({ product }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    // calculate the average rating of the product
    const rating = Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length);

    return (
        <Link href={`/product/${product.id}`} className='group max-xl:mx-auto border border-slate-200 rounded-xl hover:shadow-lg transition p-3 bg-white'>
            <div className='bg-slate-50 h-40 sm:w-56 sm:h-60 rounded-lg flex items-center justify-center overflow-hidden'>
                <Image width={500} height={500} className='max-h-32 sm:max-h-48 w-auto group-hover:scale-110 transition duration-300' src={product.images[0]} alt="" />
            </div>
            <div className='flex flex-col gap-1.5 text-sm text-slate-800 pt-3 max-w-60'>
                <p className='font-semibold text-base line-clamp-2'>{product.name}</p>
                <div className='flex items-center gap-2'>
                    <div className='flex'>
                        {Array(5).fill('').map((_, index) => (
                            <StarIcon key={index} size={13} className='text-transparent' fill={rating >= index + 1 ? "#F59E0B" : "#D1D5DB"} />
                        ))}
                    </div>
                    <span className='text-xs text-slate-500'>({product.rating.length})</span>
                </div>
                <div className='flex items-center gap-2 mt-1'>
                    <p className='text-lg font-bold text-slate-900'>{currency}{product.price}</p>
                    <p className='text-sm text-slate-400 line-through'>{currency}{product.mrp}</p>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard