import React from 'react'
import { SiHackaday } from "react-icons/si";
import { LiaNetworkWiredSolid } from "react-icons/lia";
import { GiCyborgFace } from "react-icons/gi";

const LatestTrends = () => {

    const data = [
        {
            name: "Increasing Sophistication",
            description: "DDoS attacks are becoming more sophisticated, making them harder to detect and mitigate.",
            icon: <SiHackaday />
        },
        {
            name: "IOT Botnets",
            description: "IOT botnets are being used to launch large-scale DDoS attacks, making it easier for attackers to take down websites.",
            icon: <LiaNetworkWiredSolid />
        },
        {
            name: "Ai Powered Attacks",
            description: "AI-powered attacks are on the rise, with attackers using machine learning algorithms to launch more targeted and effective DDoS attacks.",
            icon: <GiCyborgFace />
        }
    ]

  return (
    <section className='flex justify-center items-center w-full'>
        <div className='flex flex-col justify-center items-center w-[95vw] lg:container gap-5'>
            <h2 className='text-4xl lg:text-5xl font-semibold text-center'>
            Latest DDoS Attack Trends
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-start items-stretch w-full gap-5'>
                {data.map((item, index) => (
                    <div key={index} className='flex flex-col justify-start items-start gap-3 p-5 card'>
                        <p className='text-5xl'>{item.icon}</p>
                        <h3 className='text-2xl font-semibold'>{item.name}</h3>
                        <p className='text-xl font-normal'>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default LatestTrends