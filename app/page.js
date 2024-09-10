import React from 'react'
import Hero from './components/Home/Hero'
import WhyChooseUs from './components/Home/WhyChooseUs'
import HowAffect from './components/Home/HowAffect'
import LatestTrends from './components/Home/LatestTrends'
import ProtectionPlan from './components/Home/ProtectionPlan'
import NewsLetter from './components/Home/NewsLetter'

const page = () => {
  return (
    <React.Fragment>
      <main className="space-y-16">
        <Hero />
        <WhyChooseUs />
        <HowAffect />
        <LatestTrends />
        <ProtectionPlan />
        <NewsLetter />
      </main>
    </React.Fragment>
  )
}

export default page