import React, { useRef } from "react";
import { FiTruck, FiShield, FiRefreshCw, FiAward, FiArrowRight } from "react-icons/fi";
import { motion, useInView } from "framer-motion";

const WhyChooseUs = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const features = [
        {
            icon: <FiTruck />,
            title: "Lightning Delivery",
            description: "Next-day shipping with real-time GPS tracking",
            cta: "Track order",
            flair: "🚀 Instant"
        },
        {
            icon: <FiShield />,
            title: "Fort Knox Security",
            description: "256-bit encryption & biometric verification",
            cta: "Our security",
            flair: "🔒 Impenetrable"
        },
        {
            icon: <FiRefreshCw />,
            title: "Hassle-Free Returns",
            description: "Free doorstep pickup within 14 days",
            cta: "Return policy",
            flair: "🔄 Effortless"
        },
        {
            icon: <FiAward />,
            title: "Connoisseur's Choice",
            description: "Handpicked by industry experts",
            cta: "Our standards",
            flair: "🎩 Elite"
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.25,
                delayChildren: 0.4
            }
        }
    };

    const item = {
        hidden: { y: 50, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 15,
                stiffness: 120,
                mass: 0.5
            }
        }
    };

    return (
        <div
            ref={ref}
            className="relative py-32 bg-gradient-to-br from-[#050505] via-[#0f0f0f] to-[#1a1a1a] overflow-hidden isolate"
        >
            {/* Luxury texture overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-[15%] mix-blend-overlay z-[-1]"></div>

            {/* Floating light orbs */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
                <motion.div
                    animate={{
                        x: ["-10%", "10%", "-10%"],
                        y: ["0%", "15%", "0%"]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-[15%] left-[15%] w-[25vw] h-[25vw] bg-[#BB86FC] rounded-full filter blur-[90px]"
                ></motion.div>
                <motion.div
                    animate={{
                        x: ["10%", "-10%", "10%"],
                        y: ["20%", "-5%", "20%"]
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] bg-[#03DAC6] rounded-full filter blur-[100px]"
                ></motion.div>
            </div>

            <div className="max-w-8xl mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                        duration: 0.9,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.2
                    }}
                    className="text-center mb-24"
                >
                    <motion.span
                        initial={{ letterSpacing: "0.5em" }}
                        animate={isInView ? { letterSpacing: "0.2em" } : {}}
                        transition={{ duration: 1.2, ease: "circOut" }}
                        className="text-[#BB86FC] font-medium tracking-widest text-xs uppercase mb-6 inline-block"
                    >
                        The Pinnacle of Excellence
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl lg:text-[3.75rem] font-bold text-white mb-6 leading-[1.15]">
                        Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BB86FC] via-[#9b6cfd] to-[#03DAC6]">Unrivaled</span> Quality
                    </h2>
                    <div className="flex justify-center">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: "8rem" } : {}}
                            transition={{ delay: 0.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="h-0.5 bg-gradient-to-r from-[#BB86FC] to-[#03DAC6]"
                        ></motion.div>
                    </div>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate={isInView ? "show" : {}}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            whileHover={{
                                y: -15,
                                transition: { type: "spring", stiffness: 300 }
                            }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 via-transparent from-transparent to-[#BB86FC]/10"></div>

                            <div className="relative h-full bg-[#1a1a1a] border border-[#2a2a2a]/70 rounded-2xl p-8 transition-all duration-500 group-hover:border-[#BB86FC]/30 overflow-hidden">
                                {/* Animated flair badge */}
                                <motion.span
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.6 + index * 0.1 }}
                                    className="absolute top-6 right-6 text-xs font-medium bg-gradient-to-r from-[#BB86FC]/20 to-[#03DAC6]/20 text-[#BB86FC] px-3 py-1 rounded-full border border-[#BB86FC]/30"
                                >
                                    {feature.flair}
                                </motion.span>

                                {/* Icon with dynamic gradient */}
                                <motion.div
                                    whileHover={{ rotate: 5, scale: 1.1 }}
                                    className={`w-16 h-16 mb-8 rounded-xl bg-gradient-to-br ${index % 2 === 0
                                            ? "from-[#BB86FC] to-[#03DAC6]"
                                            : "from-[#9b6cfd] to-[#03DAC6]"
                                        } flex items-center justify-center text-white text-2xl shadow-lg`}
                                >
                                    {feature.icon}
                                </motion.div>

                                <h3 className="text-2xl font-semibold text-white mb-4 leading-snug">{feature.title}</h3>
                                <p className="text-[#b0b0b0] leading-relaxed mb-6">{feature.description}</p>

                                <motion.button
                                    whileHover={{ x: 5 }}
                                    className="flex items-center text-sm font-medium text-[#BB86FC] group-hover:text-white transition-colors"
                                >
                                    {feature.cta}
                                    <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                                </motion.button>

                                {/* Animated underline */}
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    transition={{ delay: 0.8 + index * 0.15, duration: 1.2 }}
                                    viewport={{ once: true }}
                                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#BB86FC] to-[#03DAC6]"
                                ></motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default WhyChooseUs;