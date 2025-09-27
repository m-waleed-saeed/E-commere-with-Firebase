import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import worldMapImage from '../../../assets/bg.png';
import { useNavigate } from 'react-router-dom';

const UserLocation = () => {
    const title = "Join Our Global Community of 60,000+ Customers";
    const desc = "Experience premium shopping across devices with our luxury dark theme interface. Download, install, and transform your shopping experience today.";

    const clientsList = [
        {
            id: 1,
            name: "Alex Johnson",
            position: "Product Manager",
            text: "This app has completely transformed how I shop. The dark theme is easy on my eyes during late-night browsing!",
            country: "United States",
            lat: 39.8283,
            lng: -98.5795,
            bgColor: "bg-[#7256df]",
            dotColor: "#7256df"
        },
        {
            id: 2,
            name: "Sophie Martin",
            position: "UX Designer",
            text: "The seamless experience across devices is unmatched. I love how the purple accents complement the dark theme.",
            country: "France",
            lat: 46.2276,
            lng: 2.2137,
            bgColor: "bg-[#eb59d5]",
            dotColor: "#eb59d5"
        },
        {
            id: 3,
            name: "Kenji Tanaka",
            position: "Software Engineer",
            text: "The attention to detail in the animations makes this app feel premium. The hover effects are delightful!",
            country: "Japan",
            lat: 36.2048,
            lng: 138.2529,
            bgColor: "bg-[#37d87b]",
            dotColor: "#37d87b"
        },
        {
            id: 4,
            name: "Maria Garcia",
            position: "Marketing Director",
            text: "Our conversion rates improved significantly after implementing this platform. Customers love the dark UI.",
            country: "Spain",
            lat: 40.4637,
            lng: -3.7492,
            bgColor: "bg-[#fe7855]",
            dotColor: "#fe7855"
        },
        {
            id: 5,
            name: "David Wilson",
            position: "E-commerce Specialist",
            text: "The performance is outstanding. Even with thousands of products, everything loads instantly with smooth transitions.",
            country: "Australia",
            lat: -25.2744,
            lng: 133.7751,
            bgColor: "bg-[#ffc313]",
            dotColor: "#ffc313"
        },
        {
            id: 6,
            name: "Ling Chen",
            position: "Mobile Developer",
            text: "The dark theme implementation is perfect. The contrast ratios make everything readable while maintaining luxury.",
            country: "China",
            lat: 35.8617,
            lng: 104.1954,
            bgColor: "bg-[#26aeea]",
            dotColor: "#26aeea"
        },
        {
            id: 7,
            name: "Olivia Smith",
            position: "CEO, Tech Startup",
            text: "We've seen a 40% increase in engagement since switching to this platform. The premium feel attracts high-value customers.",
            country: "Canada",
            lat: 56.1304,
            lng: -106.3468,
            bgColor: "bg-[#BB86FC]",
            dotColor: "#BB86FC"
        }
    ];

    const [activeClient, setActiveClient] = useState(null);
    const [autoPlay, setAutoPlay] = useState(true);
    const [showAllTestimonials, setShowAllTestimonials] = useState(false);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    // Auto-rotate testimonials
    useEffect(() => {
        if (!autoPlay) return;

        const interval = setInterval(() => {
            setActiveClient(prev => {
                if (prev === null) return clientsList[0];
                const currentIndex = clientsList.findIndex(c => c.id === prev.id);
                const nextIndex = (currentIndex + 1) % clientsList.length;
                return clientsList[nextIndex];
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [autoPlay, clientsList]);

    // Projection functions for SVG lines
    const getProjectedX = (lng) => {
        return 50 + (lng / 360 * 100);
    };

    const getProjectedY = (lat) => {
        return 50 - (lat / 180 * 45);
    };

    const getPositionStyle = (lat, lng) => {
        // Convert lat/lng to relative positioning on the map
        const top = 50 - (lat / 180 * 45);
        const left = 50 + (lng / 360 * 100);

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: 'translate(-50%, -50%)'
        };
    };

    const toggleTestimonialView = () => {
        setShowAllTestimonials(!showAllTestimonials);
        setAutoPlay(!showAllTestimonials);
    };

    const navigateToRegister = (clientId) => {
        setAutoPlay(false);
        navigate(`/register?ref=${clientId}`);
    };

    return (
        <div className="bg-[#121212] py-20 px-4 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        className="text-[#BBBBBB] max-w-2xl mx-auto text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        {desc}
                    </motion.p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Stats Panel */}
                    <motion.div
                        className="bg-gradient-to-br from-[#1E1E1E] to-[#2a2a2a] border border-[#2D2D2D] rounded-2xl p-8 shadow-2xl"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-white mb-6">Global Impact</h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center mb-2">
                                        <div className="w-3 h-3 bg-[#BB86FC] rounded-full mr-3"></div>
                                        <span className="text-[#BB86FC] text-3xl font-bold">60K+</span>
                                    </div>
                                    <p className="text-[#BBBBBB] ml-6">Satisfied Customers</p>
                                </div>

                                <div>
                                    <div className="flex items-center mb-2">
                                        <div className="w-3 h-3 bg-[#37d87b] rounded-full mr-3"></div>
                                        <span className="text-[#37d87b] text-3xl font-bold">120+</span>
                                    </div>
                                    <p className="text-[#BBBBBB] ml-6">Countries Worldwide</p>
                                </div>

                                <div>
                                    <div className="flex items-center mb-2">
                                        <div className="w-3 h-3 bg-[#26aeea] rounded-full mr-3"></div>
                                        <span className="text-[#26aeea] text-3xl font-bold">98%</span>
                                    </div>
                                    <p className="text-[#BBBBBB] ml-6">Customer Satisfaction</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-2xl font-bold text-white mb-4">Download Our App</h3>
                            <p className="text-[#BBBBBB] mb-6">Experience luxury shopping on any device</p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button className="bg-[#BB86FC] text-[#121212] px-3 py-2 rounded-lg font-medium flex-1 flex items-center justify-center gap-2 transition-all hover:brightness-110 hover:scale-[1.02] active:scale-95">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                    App Store
                                </button>
                                <button className="bg-[#2a2a2a] border border-[#BB86FC] text-[#BB86FC] px-3 py-2 rounded-lg font-medium flex-1 flex items-center justify-center gap-2 transition-all hover:bg-[#BB86FC]/10 hover:scale-[1.02] active:scale-95">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                    Google Play
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* World Map */}
                    <motion.div
                        className="relative h-[500px] rounded-2xl overflow-hidden border border-purple-500/30 bg-gradient-to-br from-[#0F0C29] to-[#1a0d36] shadow-[0_0_60px_-15px_rgba(187,134,252,0.3)] lg:col-span-2"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        ref={containerRef}
                    >
                        {/* Enhanced World Map Background */}
                        <div className="absolute inset-0">
                            <img
                                src={worldMapImage}
                                alt="World Map"
                                className="w-full h-full object-cover opacity-20 saturate-0"
                            />

                            {/* Grid overlay */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: `radial-gradient(circle at center, rgba(187, 134, 252, 0.15) 1px, transparent 1px)`,
                                    backgroundSize: "30px 30px",
                                }}
                            />
                        </div>

                        {/* Animated Glow effect */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <motion.div
                                className="absolute top-1/4 left-1/3 w-64 h-64 bg-[#BB86FC] rounded-full filter blur-[120px]"
                                animate={{ opacity: [0.08, 0.12, 0.08] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-[#26aeea] rounded-full filter blur-[120px]"
                                animate={{ opacity: [0.08, 0.15, 0.08] }}
                                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                            />
                        </div>

                        {/* Connection lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            {clientsList.map((client) => (
                                <motion.line
                                    key={`line-${client.id}`}
                                    x1="50%"
                                    y1="50%"
                                    x2={`${getProjectedX(client.lng)}`}
                                    y2={`${getProjectedY(client.lat)}`}
                                    stroke="url(#gradient)"
                                    strokeWidth="0.8"
                                    strokeDasharray="4"
                                    opacity="0.4"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5 }}
                                />
                            ))}
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#BB86FC" />
                                    <stop offset="100%" stopColor="#26aeea" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Client dots with navigation */}
                        <div className="relative h-full">
                            {clientsList.map((client) => {
                                const colorHex = client.dotColor;
                                return (
                                    <motion.div
                                        key={client.id}
                                        className="absolute group cursor-pointer z-0 hover:z-10"
                                        style={getPositionStyle(client.lat, client.lng)}
                                        whileHover={{ scale: 1.3 }}
                                        whileTap={{ scale: 0.8 }}
                                        onClick={() => navigateToRegister(client.id)}
                                    >
                                        {/* Pulsing effect */}
                                        <div className="relative w-10 h-10">
                                            <motion.div
                                                className="absolute inset-0 bg-purple-500 rounded-full"
                                                animate={{
                                                    scale: [1, 1.8],
                                                    opacity: [0.4, 0]
                                                }}
                                                transition={{
                                                    duration: 2.5,
                                                    repeat: Infinity,
                                                    ease: "easeOut"
                                                }}
                                            />

                                            {/* Main dot with shine effect */}
                                            <div className="relative w-9 h-9">
                                                <div 
                                                    className={`absolute inset-0 ${client.bgColor} rounded-full`}
                                                    style={{ boxShadow: `0 0 15px 2px ${colorHex}` }}
                                                />
                                                <div className="absolute inset-1 bg-white rounded-full"></div>
                                            </div>
                                        </div>

                                        {/* Hover tooltip */}
                                        <div className="absolute bottom-full left-1/2 mb-3 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                            <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                                                {client.name}
                                                <div className="absolute left-1/2 top-full -translate-x-1/2 border-8 border-t-black/80 border-l-transparent border-b-transparent border-r-transparent" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>
                </div>

                {/* Testimonial Display */}
                <div className="mt-12">
                    {activeClient ? (
                        <motion.div
                            className="bg-gradient-to-br from-[#1E1E1E] to-[#2a2a2a] border border-[#2D2D2D] rounded-2xl p-8 shadow-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="flex-shrink-0">
                                    <div className={`w-24 h-24 ${activeClient.bgColor} rounded-full flex items-center justify-center text-white text-4xl font-bold`}>
                                        {activeClient.name.charAt(0)}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white">{activeClient.name}</h3>
                                            <p className="text-[#BBBBBB]">{activeClient.position}, {activeClient.country}</p>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                className="bg-[#2a2a2a] border border-[#BB86FC] text-[#BB86FC] w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-[#BB86FC]/10"
                                                onClick={() => setAutoPlay(!autoPlay)}
                                            >
                                                {autoPlay ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </button>

                                            <button
                                                className="bg-[#2a2a2a] border border-[#BB86FC] text-[#BB86FC] w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-[#BB86FC]/10"
                                                onClick={() => setActiveClient(null)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <p className="text-[#BBBBBB] text-lg italic border-l-4 border-[#BB86FC] pl-4 py-2">
                                        "{activeClient.text}"
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-[#BBBBBB]">Select a location to view customer testimonial</p>
                        </div>
                    )}
                </div>

                {/* All Testimonials Toggle */}
                <div className="mt-10 text-center">
                    <button
                        className="bg-transparent border border-[#BB86FC] text-[#BB86FC] px-8 py-3 rounded-full font-medium transition-all hover:bg-[#BB86FC]/10 hover:scale-105 active:scale-95"
                        onClick={toggleTestimonialView}
                    >
                        {showAllTestimonials ? "Hide All Testimonials" : "View All Testimonials"}
                    </button>
                </div>

                {/* All Testimonials Grid */}
                {showAllTestimonials && (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.5 }}
                    >
                        {clientsList.map((client) => (
                            <motion.div
                                key={`all-${client.id}`}
                                className="bg-gradient-to-br from-[#1E1E1E] to-[#2a2a2a] border border-[#2D2D2D] rounded-2xl p-6 shadow-xl"
                                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(187, 134, 252, 0.2)" }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`w-12 h-12 ${client.bgColor} rounded-full flex items-center justify-center text-white font-bold`}>
                                        {client.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white">{client.name}</h4>
                                        <p className="text-[#BBBBBB] text-sm">{client.position}, {client.country}</p>
                                    </div>
                                </div>
                                <p className="text-[#BBBBBB] italic">"{client.text}"</p>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Decorative elements */}
            <div className="absolute top-20 left-0 w-64 h-64 bg-[#BB86FC] rounded-full filter blur-[150px] opacity-10"></div>
            <div className="absolute bottom-20 right-0 w-80 h-80 bg-[#26aeea] rounded-full filter blur-[150px] opacity-10"></div>
        </div>
    );
};

export default UserLocation;