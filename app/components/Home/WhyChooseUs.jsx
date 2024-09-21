import React from 'react'
import { FiShield } from 'react-icons/fi'
import { MdAccessTime } from "react-icons/md";
import { MdOutlinePriceChange } from "react-icons/md";

const WhyChooseUs = () => {

    const data = [
        {
            name: "Advanced Protection",
            description: "Our advanced DDoS protection service ensures that your website stays online and secure.",
            icon: <FiShield />
        },
        {
            name: "24/7 Monitoring",
            description: "We provide 24/7 monitoring to ensure that your website is protected at all times.",
            icon: <MdAccessTime />
        },
        {
            name: "Affordable Pricing",
            description: "We offer affordable pricing plans to fit your budget and needs.",
            icon: <MdOutlinePriceChange />
        }
    ]

  return (
    <section className='flex justify-center items-center w-full'>
        <div className='flex flex-col justify-center items-center w-[95vw] lg:container gap-5'>
            <h2 className='text-4xl font-semibold self-start'>
                Why Choose Us?
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-start items-stretch w-full gap-5'>
                {data.map((item, index) => (
                    <div key={index} className='flex flex-col justify-start items-start gap-3 p-5 rounded-xl cursor-pointer card'>
                        <p className='text-5xl text-green-500'>{item.icon}</p>
                        <h3 className='text-2xl font-semibold'>{item.name}</h3>
                        <p className='text-xl font-normal text-slate-200'>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default WhyChooseUs