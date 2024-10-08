import React from 'react'
import { LiaHourglassStartSolid } from "react-icons/lia";

const Hero = () => {
  return (
    <section className='flex justify-center items-center w-full min-h-screen'>
        <div className='flex justify-center items-center w-[95vw] lg:container'>
            <div className='flex flex-col justify-center items-center gap-5'>
                <h1 className='text-5xl lg:text-7xl font-semibold text-center flex flex-col'>
                    <span className='heading'>Protect Your Website</span>
                    <span className='heading'>From DDoS Attacks</span>
                </h1>
                <p className='text-xl lg:text-2xl text-center font-normal flex flex-col'>
                    <span>{`Stay online and secure with our advanced DDoS protection service.`}</span>
                    <span>{`Don't let cyber threats disrupt your website.`}</span>
                </p>
                <button className='px-7 py-3 text-xl font-medium rounded-full flex items-center gap-2 btn'>
                    Get Started Now <LiaHourglassStartSolid className='text-2xl'/>
                </button>
            </div>
        </div>
    </section>
  )
}

export default Hero