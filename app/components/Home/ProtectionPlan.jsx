import React from 'react'
import { TiTick } from "react-icons/ti";

const ProtectionPlan = () => {

    const data = [
        {
            plan: "Free",
            price: "0$/month",
            features: [
                "Basic Protection",
                "24/7 Monitoring",
                "1 Domain",
                "Community Support"
            ]
        },
        {
            plan: "Standard",
            price: "19.99$/month",
            features: [
                "Advanced Protection",
                "24/7 Monitoring",
                "5 Domains",
                "Email Support",
                "Real-time Monitoring",
                "Basic Analytics"
            ]
        },
        {
            plan: "Premium",
            price: "49.99$/month",
            features: [
                "Advanced Protection",
                "24/7 Monitoring",
                "Unlimited Domains",
                "Priority Support",
                "Custom Rules",
                "Advance Analytics",
                "Real-time Monitoring"
            ]
        }
    ]

  return (
    <section className='flex justify-center items-center w-full'>
        <div className='flex flex-col justify-center items-center w-[95vw] lg:container gap-5'>
            <h2 className='text-4xl lg:text-5xl font-semibold text-center'>
            Choose Your Protection Plan
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-start items-stretch w-full gap-5'>
                {data.map((item, index) => (
                    <div key={index} className='flex flex-col justify-between items-start gap-3 p-5 h-full card'>
                        <div className='flex flex-col justify-start items-start gap-2 w-full'>
                        <h3 className='text-2xl font-semibold'>{item.plan}</h3>
                        <p className='text-3xl font-medium'>{item.price}</p>
                        <ul className='list-disc list-inside'>
                            {item.features.map((feature, index) => (
                                <li key={index} className='text-lg font-normal flex items-center gap-2'><TiTick className='text-2xl'/>{feature}</li>
                            ))}
                        </ul>
                        </div>
                        <button className='px-4 py-2 text-xl font-medium w-full btn'>
                            Buy Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default ProtectionPlan