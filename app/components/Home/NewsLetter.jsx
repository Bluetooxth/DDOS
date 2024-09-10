import React from 'react'

const NewsLetter = () => {
  return (
    <section className='flex justify-center items-center w-full'>
        <div className='flex flex-col justify-center items-center w-[95vw] lg:container gap-5 mb-16'>
            <h2 className='text-4xl lg:text-5xl font-semibold text-center'>
                Subscribe to Our Newsletter
            </h2>
            <div className='flex flex-col justify-center items-center gap-5 max-w-[700px] py-14 px-7 card'>
                <p className='text-xl font-normal text-center'>
                    Stay updated with the latest news, updates, and offers from our DDoS protection service.
                </p>
                <div className='flex justify-center items-center gap-5 w-full'>
                    <input type='email' placeholder='Enter your email address' className='px-3 py-2 w-full text-lg font-normal focus:outline-none'/>
                    <button className='px-4 py-2 text-xl font-medium btn'>
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default NewsLetter