'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'

const Hero = () => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    return (
        <div className='mx-6'>
            <div className='flex max-xl:flex-col gap-6 max-w-7xl mx-auto my-8'>
                <div className='relative flex-1 flex flex-col bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl xl:min-h-100 group shadow-md'>
                    <div className='p-5 sm:p-12'>
                        <div className='inline-flex items-center gap-2 bg-white text-yellow-700 pr-4 p-1 rounded-lg text-xs sm:text-sm shadow-sm font-semibold'>
                            <span className='bg-yellow-500 px-3 py-1 max-sm:ml-1 rounded-md text-white text-xs font-bold'>NEW</span> Free Delivery in 10 Minutes! <ChevronRightIcon className='group-hover:ml-2 transition-all' size={16} />
                        </div>
                        <h2 className='text-3xl sm:text-5xl leading-[1.15] my-4 font-bold text-slate-800 max-w-xs sm:max-w-md'>
                            Everything you need, delivered fast
                        </h2>
                        <div className='text-slate-700 text-sm font-semibold mt-4 sm:mt-6'>
                            <p className='text-base'>Starts from</p>
                            <p className='text-4xl font-bold text-yellow-600'>{currency}4.90</p>
                        </div>
                        <button className='bg-green-600 text-white text-sm font-bold py-3 px-8 sm:py-4 sm:px-12 mt-4 sm:mt-8 rounded-lg hover:bg-green-700 hover:scale-105 active:scale-95 transition shadow-md'>SHOP NOW</button>
                    </div>
                    <Image className='sm:absolute bottom-0 right-0 md:right-10 w-full sm:max-w-sm' src={assets.hero_model_img} alt="" />
                </div>
                <div className='flex flex-col md:flex-row xl:flex-col gap-4 w-full xl:max-w-sm text-sm text-slate-700'>
                    <div className='flex-1 flex items-center justify-between w-full bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-5 px-6 group shadow-md hover:shadow-lg transition cursor-pointer'>
                        <div>
                            <p className='text-2xl sm:text-3xl font-bold text-slate-800 max-w-40'>Best sellers</p>
                            <p className='flex items-center gap-1 mt-3 font-semibold text-orange-600'>Shop now <ArrowRightIcon className='group-hover:ml-2 transition-all' size={18} /> </p>
                        </div>
                        <Image className='w-32' src={assets.hero_product_img1} alt="" />
                    </div>
                    <div className='flex-1 flex items-center justify-between w-full bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-5 px-6 group shadow-md hover:shadow-lg transition cursor-pointer'>
                        <div>
                            <p className='text-2xl sm:text-3xl font-bold text-slate-800 max-w-40'>Big savings</p>
                            <p className='flex items-center gap-1 mt-3 font-semibold text-green-600'>View deals <ArrowRightIcon className='group-hover:ml-2 transition-all' size={18} /> </p>
                        </div>
                        <Image className='w-32' src={assets.hero_product_img2} alt="" />
                    </div>
                </div>
            </div>
            <CategoriesMarquee />
        </div>

    )
}

export default Hero