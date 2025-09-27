// AboutUs.jsx
import React from 'react';
import { FaUser, FaLightbulb, FaHeart, FaHandshake, FaChartLine, FaProjectDiagram, FaSmile, FaUsers } from 'react-icons/fa';

const AboutUs = () => {
  const stats = [
    { icon: <FaChartLine className="text-2xl" />, value: '5+', label: 'Years Experience' },
    { icon: <FaProjectDiagram className="text-2xl" />, value: '250+', label: 'Projects Completed' },
    { icon: <FaSmile className="text-2xl" />, value: '98%', label: 'Client Satisfaction' },
    { icon: <FaUsers className="text-2xl" />, value: '50+', label: 'Team Members' },
  ];

  const teamMembers = [
    { name: 'Alex Morgan', role: 'CEO & Founder' },
    { name: 'Taylor Kim', role: 'Creative Director' },
    { name: 'Jordan Smith', role: 'Lead Developer' },
    { name: 'Riley Davis', role: 'UX Designer' },
  ];

  const values = [
    { icon: <FaLightbulb className="text-3xl" />, title: 'Innovation', description: 'We constantly explore new ideas and technologies to deliver cutting-edge solutions.' },
    { icon: <FaHeart className="text-3xl" />, title: 'Passion', description: 'Our team is driven by genuine enthusiasm for creating exceptional digital experiences.' },
    { icon: <FaHandshake className="text-3xl" />, title: 'Integrity', description: 'We build trust through transparency, ethical practices, and delivering on promises.' },
  ];

  return (
    <div className="min-h-screen bg-primary-bg text-text-primary font-sans py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 relative pb-3 inline-block">
            About Us
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-accent rounded-full"></span>
          </h1>
          <p className="text-text-secondary max-w-3xl mx-auto text-lg">
            Founded in 2018, Nexus emerged from a vision to create seamless digital experiences. Today, we're a team of passionate innovators dedicated to pushing boundaries.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-secondary-bg border border-border rounded-xl p-6 text-center transition-all hover:border-accent/30 hover:shadow-[0_0_15px_rgba(187,134,252,0.3)]">
              <div className="text-accent flex justify-center mb-3">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-accent mb-2">{stat.value}</div>
              <div className="text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>
        
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 relative pb-3">
            Our Team
            <span className="absolute bottom-0 left-0 w-16 h-1 bg-accent rounded-full"></span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-secondary-bg border border-border rounded-xl p-6 text-center transition-all hover:border-accent/30 hover:shadow-[0_0_15px_rgba(187,134,252,0.3)]">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary-bg to-secondary-bg border-2 border-accent flex items-center justify-center mb-4">
                  <FaUser className="text-4xl text-accent opacity-50" />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-accent">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold mb-8 relative pb-3">
            Our Values
            <span className="absolute bottom-0 left-0 w-16 h-1 bg-accent rounded-full"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-secondary-bg border border-border rounded-xl p-6 transition-all hover:border-accent/30 hover:shadow-[0_0_15px_rgba(187,134,252,0.3)]">
                <div className="text-accent mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-text-secondary">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;