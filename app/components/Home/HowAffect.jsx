import React from 'react'
import { FaRegThumbsDown } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { LuMoveDownRight } from "react-icons/lu";

const HowAffect = () => {

    const data = [
        {
            name: "Service Disruption",
            description: "DDoS attacks can cause service disruptions, making your website unavailable to users.",
            icon: <FaRegThumbsDown/>
        },
        {
            name: "Revenue Loss",
            description: "Revenue loss is a common consequence of DDoS attacks, as users are unable to access your website.",
            icon: <FaArrowTrendDown />
        },
        {
            name: "Reputation Damage",
            description: "DDoS attacks can damage your website's reputation and credibility, leading to loss of trust from users.",
            icon: <LuMoveDownRight />
        }
    ]

  return (
    <section className='flex justify-center items-center w-full'>
        <div className='flex flex-col justify-center items-center w-[95vw] lg:container gap-5'>
            <h2 className='text-4xl font-semibold self-start'>
            How DDoS Attacks Affect Your Website
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-start items-stretch w-full gap-5'>
                {data.map((item, index) => (
                    <div key={index} className='flex flex-col justify-start items-start gap-3 p-5 rounded-xl cursor-pointer card'>
                        <p className='text-5xl text-rose-500'>{item.icon}</p>
                        <h3 className='text-2xl font-semibold'>{item.name}</h3>
                        <p className='text-xl font-normal text-slate-200'>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default HowAffect