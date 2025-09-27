// ContactUs.jsx
import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaClock, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-primary-bg text-text-primary font-sans py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 relative pb-3 inline-block">
            Contact Us
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-accent rounded-full"></span>
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Have questions or need assistance? Reach out to us through the form below or using our contact information.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-secondary-bg border border-border rounded-xl p-6 transition-all hover:border-accent/30 hover:shadow-[0_0_15px_rgba(187,134,252,0.3)]">
            <div className="text-3xl text-accent mb-4"><FaMapMarkerAlt /></div>
            <h3 className="text-xl font-semibold mb-3">Our Location</h3>
            <p className="text-text-secondary">123 Innovation Avenue, Tech District, San Francisco, CA 94103</p>
          </div>
          
          <div className="bg-secondary-bg border border-border rounded-xl p-6 transition-all hover:border-accent/30 hover:shadow-[0_0_15px_rgba(187,134,252,0.3)]">
            <div className="text-3xl text-accent mb-4"><FaPhone /></div>
            <h3 className="text-xl font-semibold mb-3">Phone & Email</h3>
            <p className="text-text-secondary">+1 (555) 123-4567</p>
            <p className="text-text-secondary">contact@nexus.example</p>
          </div>
          
          <div className="bg-secondary-bg border border-border rounded-xl p-6 transition-all hover:border-accent/30 hover:shadow-[0_0_15px_rgba(187,134,252,0.3)]">
            <div className="text-3xl text-accent mb-4"><FaClock /></div>
            <h3 className="text-xl font-semibold mb-3">Working Hours</h3>
            <p className="text-text-secondary">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-text-secondary">Saturday: 10:00 AM - 4:00 PM</p>
          </div>
        </div>
        
        <div className="bg-secondary-bg border border-border rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-text-secondary mb-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  className="w-full bg-primary-bg border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-text-secondary mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-primary-bg border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-text-secondary mb-2">Subject</label>
              <input 
                type="text" 
                placeholder="What is this regarding?" 
                className="w-full bg-primary-bg border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-text-secondary mb-2">Message</label>
              <textarea 
                placeholder="How can we help you?" 
                className="w-full bg-primary-bg border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent min-h-[150px]"
              ></textarea>
            </div>
            
            <button className="bg-accent text-primary-bg px-8 py-3 rounded-lg font-medium transition-all hover:brightness-110 hover:scale-105 active:scale-95 flex items-center">
              Send Message <FaPaperPlane className="ml-2" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;