import React from 'react'
import Category from '../../../components/Category'
import Hero from './Hero'
import Product from './HomePageProduct'
import WhyChooseUs from './WhyChooseUs'
import NewsletterSignup from './Newsletter'
import UserLocation from './UserLocation'

const Home = () => {
  return (
    <>
      <Hero />
      <Category />
      <Product />
      <WhyChooseUs />
      <NewsletterSignup />
      <UserLocation />
    </>
  )
}

export default Home