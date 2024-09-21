import React from 'react'
import { TiTick } from "react-icons/ti";
import { GiTakeMyMoney } from "react-icons/gi";

const ProtectionPlan = () => {

    const data = [
        {
            plan: "Free",
            price: "0₹/month",
            features: [
                "Basic Protection",
                "24/7 Monitoring",
                "1 Domain",
                "Community Support",
                "Firewall",
            ]
        },
        {
            plan: "Standard",
            price: "599₹/month",
            features: [
                "Advanced Protection",
                "24/7 Monitoring",
                "5 Domains",
                "Email Support",
                "Real-time Monitoring",
                "Basic Analytics",
                "Firewall",
                "Load Balancers"
            ]
        },
        {
            plan: "Premium",
            price: "4999₹/month",
            features: [
                "Advanced Protection",
                "24/7 Monitoring",
                "Unlimited Domains",
                "Priority Support",
                "Custom Rules",
                "Advance Analytics",
                "Real-time Monitoring",
                "Firewall",
                "Load Balancers",
                "Traffic Classification",
            ]
        }
    ]

  return (
    <section className='flex justify-center items-center w-full'>
        <div className='flex flex-col justify-center items-center w-[95vw] lg:container gap-5'>
            <h2 className='text-4xl font-semibold self-start'>
            Choose Your Protection Plan
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-start items-stretch w-full gap-5'>
                {data.map((item, index) => (
                    <div key={index} className='flex flex-col justify-between items-start gap-3 p-5 h-full rounded-xl cursor-pointer card'>
                        <div className='flex flex-col justify-start items-start gap-2 w-full'>
                        <h3 className='text-3xl font-semibold text-cyan-500'>{item.plan}</h3>
                        <p className='text-2xl font-medium'>{item.price}</p>
                        <ul className='list-disc list-inside'>
                            {item.features.map((feature, index) => (
                                <li key={index} className='text-lg font-normal flex items-center text-slate-200 gap-2'><TiTick className='text-2xl text-green-500'/>{feature}</li>
                            ))}
                        </ul>
                        </div>
                        <button className='px-4 py-2 text-xl font-medium w-full rounded-lg flex items-center justify-center gap-2 btn'>
                            Buy Now <GiTakeMyMoney className='text-2xl'/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default ProtectionPlan