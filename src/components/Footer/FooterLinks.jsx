import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Copyright = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setTimeout(() => setSubscribed(false), 3000);
            setEmail('');
        }
    };

    return (
        <footer className="bg-[#121212] text-white pt-15 relative overflow-hidden">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#BB86FC] rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-[#BB86FC] rounded-full blur-[120px]"></div>
            </div>

            {/* Top accent border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#BB86FC] to-transparent"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-medium tracking-wider text-[#BB86FC] uppercase pb-3 border-b border-[#2D2D2D]">
                            Quick Links
                        </h4>
                        <ul className="space-y-4">
                            {['Home', 'Shop', 'Categories', 'Contact Us'].map((item, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={`/${item}`}
                                        className="flex items-center group text-[#BBBBBB] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#BB86FC] focus:rounded-sm"
                                    >
                                        <span className="w-2 h-px bg-[#BB86FC] mr-3 transition-all duration-300 group-hover:w-4"></span>
                                        <span className="text-base">{item}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-medium tracking-wider text-[#BB86FC] uppercase pb-3 border-b border-[#2D2D2D]">
                            Contact
                        </h4>
                        <div className="text-base space-y-5 text-[#BBBBBB]">
                            <div className="flex items-start">
                                <svg className="w-5 h-5 mt-0.5 mr-3 text-[#BB86FC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <p><span className="font-medium text-white">Email:</span> info@luxurystore.com</p>
                            </div>
                            <div className="flex items-start">
                                <svg className="w-5 h-5 mt-0.5 mr-3 text-[#BB86FC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                                <p><span className="font-medium text-white">Phone:</span> +92 312 3456789</p>
                            </div>
                            <div className="flex items-start">
                                <svg className="w-5 h-5 mt-0.5 mr-3 text-[#BB86FC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <p><span className="font-medium text-white">Address:</span> Faisalabad, Pakistan</p>
                            </div>
                        </div>
                    </div>

                    {/* Follow Us */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-medium tracking-wider text-[#BB86FC] uppercase pb-3 border-b border-[#2D2D2D]">
                            Follow Us
                        </h4>
                        <div className="flex space-x-4">
                            {[
                                { name: 'facebook', icon: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z' },
                                { name: 'instagram', icon: 'M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z' },
                                { name: 'twitter', icon: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="group w-11 h-11 flex items-center justify-center bg-[#1E1E1E] rounded-lg transition-all duration-300 hover:bg-[#BB86FC] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#BB86FC]"
                                >
                                    <svg className="w-5 h-5 text-[#BBBBBB] group-hover:text-[#121212] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={social.icon} />
                                    </svg>
                                </a>
                            ))}
                        </div>

                        <div className="pt-6">
                            <h5 className="text-base font-normal tracking-wide text-[#BBBBBB] mb-3">Subscribe Now!</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email"
                                        className="w-full bg-[#1E1E1E] text-white px-4 py-3.5 rounded-lg border border-[#2D2D2D] focus:border-[#BB86FC] focus:outline-none focus:ring-1 focus:ring-[#BB86FC] pl-12 transition-all"
                                    />
                                    
                                    <button
                                        type="submit"
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#BB86FC] text-[#121212] px-4 py-1.5 rounded-md text-base font-medium tracking-wide hover:brightness-110 hover:scale-[1.05] transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-white"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </form>
                            {subscribed && (
                                <p className="mt-2 text-sm text-[#BB86FC] animate-pulse">
                                    Thank you for subscribing!
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Legal */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-medium tracking-wider text-[#BB86FC] uppercase pb-3 border-b border-[#2D2D2D]">
                            Legal
                        </h4>
                        <ul className="space-y-4">
                            {['Privacy Policy', 'Terms & Conditions', 'Shipping Policy', 'Returns & Refunds'].map((item, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={`/${item}`}
                                        className="flex items-center group text-[#BBBBBB] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#BB86FC] focus:rounded-sm"
                                    >
                                        <span className="w-2 h-px bg-[#BB86FC] mr-3 transition-all duration-300 group-hover:w-4"></span>
                                        <span className="text-base ">{item}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Copyright;