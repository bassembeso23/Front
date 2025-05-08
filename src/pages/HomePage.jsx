import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import heroImg from "../assets/Server-cuate.png";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { FiMenu, FiX } from 'react-icons/fi';

export default function HomePage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen font-sans bg-light">
            <header className="flex justify-between items-center px-4 sm:px-6 py-4 shadow-md fixed top-0 left-0 w-full z-[1000] bg-primary">
                <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-white">CloudFusion</h1>

                <div className="hidden md:flex items-center space-x-4">
                    <a
                        href="#features"
                        className="text-white hover:text-primary-dark transition-colors"
                    >
                        Features
                    </a>
                    <button
                        className="px-4 py-2 border rounded-lg font-medium hover:opacity-80 transition text-white border-white"
                        onClick={() => navigate("/auth")}
                    >
                        Login
                    </button>
                    <button
                        className="px-4 py-2 rounded-lg font-medium hover:opacity-90 transition text-white bg-secondary"
                        onClick={() => navigate("/auth")}
                    >
                        Register
                    </button>
                </div>

                {/* Mobile Menu Button (hidden on desktop) */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </header>

            {/* Mobile Menu Slider */}
            <div className={`
            fixed top-14 left-0 w-full bg-light shadow-lg z-40 
            transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}
            md:hidden
            `}>
                <div className="flex flex-col space-y-4 p-6 border-t border-black-100">
                    <a
                        href="#features"
                        className="text-primary py-2 hover:text-primary-dark transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Features
                    </a>
                    <button
                        className="px-4 py-2 border rounded-lg font-medium hover:opacity-80 transition text-left text-primary border-primary w-fit"
                        onClick={() => {
                            navigate("/auth");
                            setIsMenuOpen(false);
                        }}
                    >
                        Login
                    </button>
                    <button
                        className="px-4 py-2 rounded-lg font-medium hover:opacity-90 transition text-white text-left bg-primary w-fit"
                        onClick={() => {
                            navigate("/auth");
                            setIsMenuOpen(false);
                        }}
                    >
                        Register
                    </button>
                </div>
            </div>
            
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            <section className="landing relative flex flex-col-reverse md:flex-row items-center justify-between px-6 pb-[90px] pt-28 md:pt-48 lg:pt-48 lg:pb-28 max-w-7xl mx-auto gap-8 lg:gap-10">
            
                <motion.div
                    className="md:w-1/2 text-center md:text-left"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6 text-primary">
                        All Your Clouds. One Dashboard.
                    </h2>
                    <p className="text-lg mb-6 text-secondary">
                        Access Google Drive, Dropbox, and Terabox from a single smart interface. Search everything instantly.
                    </p>
                    <button
                        className="px-6 py-3 mb-6 text-white rounded-xl text-lg font-semibold transition hover:scale-105"
                        style={{ backgroundColor: 'var(--primary-color)' }}
                        onClick={() => navigate("/auth")}
                    >
                        Get Started Now
                    </button>
                </motion.div>

                <div>
                    <img src={heroImg} alt="cloud illustration" className="w-full max-w-64 mx-auto animate-up-and-down will-change-transform md:max-w-md" />
                    <a
                        href="#features"
                        className="go-down absolute bottom-8 left-1/2 -translate-x-1/2 text-primary hover:text-secondary mt-1transition-colors duration-300"
                    >
                        <MdKeyboardDoubleArrowDown className="text-5xl animate-bouncing" />
                    </a>
                </div>

            </section>

            <section className="px-6 py-[130px] bg-secondGround" id="features">
                <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--primary-color)' }}>
                    Powerful Features
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        {
                            title: "Unified Cloud Access",
                            desc: "Connect and manage Google Drive, Dropbox, and Terabox from one interface.",
                            icon: "🧩",
                        },
                        {
                            title: "Upload Files & Folders",
                            desc: "Easily upload, create folders, and organize your files across platforms.",
                            icon: "📁",
                        },
                        {
                            title: "Super Search Engine",
                            desc: "Blazing fast search, even inside file contents and documents.",
                            icon: "🔍",
                        },
                        {
                            title: "Secure & Encrypted",
                            desc: "Your data is encrypted end-to-end with modern security standards.",
                            icon: "🔐",
                        },
                        {
                            title: "Cross-Platform Sync",
                            desc: "Access your data anytime from mobile, tablet, or desktop devices.",
                            icon: "🔄",
                        },
                        {
                            title: "Smart Dashboard",
                            desc: "Visualize your storage usage, recent files, and cloud health at a glance.",
                            icon: "📊",
                        },
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            className="p-6 bg-[var(--light-color)] rounded-xl shadow-md hover:shadow-xl transition duration-300 border-t-4"
                            style={{ borderTopColor: 'var(--primary-color)' }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>
                                {feature.title}
                            </h3>
                            <p className="text-gray-700">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
