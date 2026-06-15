"use client";

import React, { useRef, useState, useEffect } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
    AnimatePresence,
} from "framer-motion";
import { ArrowDown, MoveRight, Leaf, Wind, Droplets } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/src/lib/utils";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// --- ASSETS / DATA ---
const HERO_IMAGE = "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2674&auto=format&fit=crop";
const GALLERY_IMAGES = [
    "https://plus.unsplash.com/premium_photo-1668698356664-9653597e44e4?q=80&w=687&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop",
];

// --- GSAP TEXT ANIMATION COMPONENTS ---
export const TypeReveal = ({ text, className = "" }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const chars = el.querySelectorAll('.type-char');
        gsap.fromTo(chars,
            { opacity: 0, y: 20, filter: "blur(4px)" },
            {
                opacity: 1, y: 0, filter: "blur(0px)",
                duration: 0.8, stagger: 0.015, ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 85%" }
            }
        );
    }, []);

    return (
        <span ref={containerRef} className={`inline-block ${className}`}>
            {text.split('').map((char, i) => (
                <span key={i} className="type-char opacity-0 inline-block">
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    );
};

export const RevealUp = ({ children, className = "", delay = 0 }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        gsap.fromTo(el,
            { opacity: 0, y: 40, filter: "blur(10px)" },
            {
                opacity: 1, y: 0, filter: "blur(0px)",
                duration: 1.2, delay, ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 85%" }
            }
        );
    }, [delay]);

    return (
        <div ref={containerRef} className={`opacity-0 ${className}`}>
            {children}
        </div>
    );
};

// --- COMPONENTS ---

// 1. Smooth Custom Cursor
export function CustomCursor() {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    useEffect(() => {
        const moveCursor = (e) => {
            mouseX.set(e.clientX - 16);
            mouseY.set(e.clientY - 16);
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="pointer-events-none fixed left-0 top-0 z-999 h-8 w-8 rounded-full bg-green-900 mix-blend-difference hidden md:block"
            style={{ x: mouseX, y: mouseY }}
        />
    );
};

// 2. Grainy Texture Overlay
export function GrainOverlay() {
    return (
        <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay">
            <svg className="h-full w-full">
                <filter id="noise">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.8"
                        numOctaves="4"
                        stitchTiles="stitch"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
        </div>
    );
}

// 3. Floating Organic Shapes
const Blob = ({ className }) => (
    <div
        className={cn(
            "absolute rounded-[100%] bg-green-200/40 blur-[80px] animate-pulse",
            className
        )}
    />
);

// 4. Navbar
export function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-6 md:px-12"
        >
            <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-green-800" />
                <span className="font-serif text-xl font-bold tracking-tight text-green-950">
                    Oura.
                </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
                {["Essence", "Origin", "Collection", "Contact"].map((item) => (
                    <a
                        key={item}
                        href="#"
                        className="group relative text-sm font-medium text-green-900 overflow-hidden"
                    >
                        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                            {item}
                        </span>
                        <span className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-green-600">
                            {item}
                        </span>
                    </a>
                ))}
            </div>
            <button className="rounded-full border border-green-900 px-6 py-2 text-sm font-medium text-green-900 transition-colors hover:bg-green-900 hover:text-stone-50">
                Get Started
            </button>
        </motion.nav>
    );
};

// 5. Hero Section
export function Hero({ brandName, heroTitle, heroSubtitle }) {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-stone-50 px-6 pt-32 pb-20 md:px-12">
            <Blob className="top-[-10%] right-[-10%] h-[500px] w-[500px]" />
            <Blob className="bottom-[10%] left-[-10%] h-[400px] w-[400px] bg-emerald-100/50" />

            <div className="container mx-auto flex flex-col gap-16 md:gap-24">
                <div className="z-10 w-full">
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 },
                            },
                        }}
                        className="font-serif text-7xl leading-[0.85] text-green-950 md:text-[10vw] lg:text-[12vw] xl:text-[14vw] tracking-tighter"
                    >
                        {heroTitle.map((word, i) => (
                            <div key={i} className="inline-block overflow-hidden mr-4 md:mr-8 lg:mr-12">
                                <motion.span
                                    variants={{
                                        hidden: { y: "100%" },
                                        visible: { y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
                                    }}
                                    className="inline-block"
                                >
                                    {word}
                                </motion.span>
                            </div>
                        ))}
                    </motion.h1>
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
                    <div className="z-10 flex flex-col justify-start lg:col-span-5">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="max-w-md text-lg md:text-xl leading-relaxed text-green-900/70"
                        >
                            {heroSubtitle}
                        </motion.p>
                    </div>

                    <div className="relative h-[40vh] lg:col-span-7 lg:h-[60vh] w-full">
                        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0 overflow-hidden rounded-[2rem]">
                            <motion.img
                                initial={{ scale: 1.2 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                src={HERO_IMAGE}
                                alt="Nature"
                                className="h-full w-full object-cover"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-green-950/40 to-transparent" />
                        </motion.div>

                        <motion.div
                            style={{ y: y2 }}
                            className="absolute -bottom-12 -left-12 z-10 hidden lg:block bg-stone-100 p-6 rounded-tl-[2rem] rounded-br-[2rem] shadow-xl max-w-xs"
                        >
                            <p className="font-serif italic text-2xl text-green-900 mb-2">"Serenity is not a luxury."</p>
                            <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-green-700/60">
                                <div className="h-[1px] w-8 bg-green-700/60" />
                                Manifesto 01
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-green-900/40"
            >
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <ArrowDown className="animate-bounce" size={16} />
            </motion.div>
        </section>
    );
};

// 5B. Statement Section
export function Statement({ statementText }) {
    return (
        <section className="bg-stone-50 py-32 px-6 md:px-12 flex items-center justify-center min-h-[60vh]">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-serif text-3xl md:text-5xl leading-tight text-green-950">
                    <TypeReveal text={statementText} />
                </h2>
                <RevealUp delay={0.5} className="mt-12">
                     <div className="w-px h-24 bg-green-900 mx-auto opacity-30"></div>
                </RevealUp>
            </div>
        </section>
    );
}

// 6. Infinite Marquee
export function Marquee() {
    return (
        <div className="overflow-hidden bg-green-900 py-6">
            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="flex whitespace-nowrap"
            >
                {Array(4)
                    .fill("Sustainable • Organic • Timeless • Pure • ")
                    .map((text, i) => (
                        <span
                            key={i}
                            className="px-4 font-serif text-4xl italic text-green-100/20 md:text-6xl"
                        >
                            {text}
                        </span>
                    ))}
            </motion.div>
        </div>
    );
};

// 7. Parallax Grid Section
export function ParallaxGallery() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
        <section ref={containerRef} className="bg-stone-100 py-32 px-6 md:px-12">
            <div className="mx-auto max-w-7xl">
                <div className="mb-24 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
                    <h2 className="font-serif text-5xl text-green-950 md:text-7xl">
                        Breathing <br /> <span className="italic text-green-800">Space</span>
                    </h2>
                    <p className="max-w-xs text-green-900/70">
                        Our materials are sourced responsibly, ensuring that every curve and
                        texture feels like a gift from the earth itself.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <motion.div style={{ y: y1 }} className="flex flex-col gap-6 pt-20">
                        <GalleryCard img={GALLERY_IMAGES[0]} title="Forest Retreat" tag="Architecture" />
                    </motion.div>
                    <motion.div className="flex flex-col gap-6">
                        <GalleryCard img={GALLERY_IMAGES[1]} title="Morning Dew" tag="Interior" />
                        <div className="aspect-[3/4] rounded-2xl bg-green-900 p-8 text-stone-100 flex flex-col justify-between">
                            <Wind className="h-12 w-12 opacity-50" />
                            <div>
                                <h3 className="text-3xl font-serif mb-2">Air</h3>
                                <p className="text-green-200/60 text-sm">Allowing the wind to flow through open spaces, creating a natural ventilation system.</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div style={{ y: y2 }} className="flex flex-col gap-6 pt-10">
                        <GalleryCard img={GALLERY_IMAGES[2]} title="Stone & Clay" tag="Materials" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export function GalleryCard({ img, title, tag }) {
    return (
        <div className="group relative cursor-pointer overflow-hidden rounded-2xl">
            <div className="absolute inset-0 z-10 bg-green-950/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src={img}
                alt={title}
                className="aspect-[3/4] h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 z-20 w-full translate-y-full p-6 transition-transform duration-500 group-hover:translate-y-0">
                <div className="rounded-xl bg-white/90 backdrop-blur-md p-4">
                    <span className="text-xs uppercase tracking-wider text-green-800">{tag}</span>
                    <h3 className="font-serif text-xl text-green-950">{title}</h3>
                </div>
            </div>
        </div>
    );
}

// 8. Horizontal Scroll / Sticky Section
export function Features() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-green-50">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-12 px-12">
                    <div className="w-[30vw] shrink-0 flex flex-col justify-center">
                        <h2 className="font-serif text-6xl text-green-950">Our <br /> <span className="italic opacity-50">Principles</span></h2>
                        <p className="mt-6 text-lg text-green-800/70">Swipe to discover the core pillars that define our connection to the organic world.</p>
                        <div className="mt-8 flex gap-2">
                            <MoveRight className="text-green-900 animate-pulse" />
                        </div>
                    </div>

                    {[
                        { title: "Sustainability", icon: <Leaf />, color: "bg-green-200" },
                        { title: "Fluidity", icon: <Droplets />, color: "bg-stone-200" },
                        { title: "Circulation", icon: <Wind />, color: "bg-emerald-200" },
                        { title: "Grounded", icon: <ArrowDown />, color: "bg-green-800 text-white" }
                    ].map((card, i) => (
                        <div
                            key={i}
                            className={cn(
                                "relative flex h-[60vh] w-[400px] shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] p-10 transition-transform hover:-translate-y-2",
                                card.color
                            )}
                        >
                            <div className="rounded-full bg-white/20 p-4 w-fit backdrop-blur-sm">
                                {card.icon}
                            </div>
                            <div>
                                <h3 className="font-serif text-4xl mb-4">{card.title}</h3>
                                <p className="opacity-70">Embracing the imperfections found in nature to create truly unique experiences.</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

// 9. CTA / Footer
export function Footer() {
    return (
        <footer className="relative bg-green-950 py-24 px-6 text-stone-100 md:px-12 overflow-hidden">
            {/* Background blobs for footer */}
            <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-green-800/30 blur-[80px]" />
            <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-emerald-900/30 blur-[80px]" />

            <div className="container mx-auto flex flex-col items-center text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-serif text-5xl md:text-8xl lg:text-[10rem] leading-none"
                >
                    Let's Grow
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mt-8 max-w-lg text-lg text-green-100/60"
                >
                    Join us in cultivating a future where design and nature coexist in perfect harmony.
                </motion.p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-12 group relative overflow-hidden rounded-full bg-stone-100 px-10 py-4 text-green-950"
                >
                    <span className="relative z-10 font-medium">Start Project</span>
                    <div className="absolute inset-0 -translate-x-full bg-green-300 transition-transform duration-300 group-hover:translate-x-0" />
                </motion.button>
            </div>

            <div className="mt-32 flex flex-col justify-between gap-8 border-t border-green-900 pt-8 text-sm text-green-100/40 md:flex-row">
                <p>&copy; 2024 Oura Organic. All rights reserved.</p>
                <div className="flex gap-8">
                    {['Instagram', 'Twitter', 'LinkedIn'].map(link => (
                        <a key={link} href="#" className="hover:text-white transition-colors">{link}</a>
                    ))}
                </div>
            </div>
        </footer>
    )
}

// --- MAIN PAGE EXPORT ---
export default function Awwwards({
    brandName = "Oura.",
    heroTitle = [
        "Return",
        "to the",
        <span key="highlight" className="text-green-800 italic">
            organic.
        </span>,
    ],
    heroSubtitle = "We curate spaces and objects that breathe. A collection inspired by the unhurried rhythms of nature, designed for the modern sanctuary.",
    statementText = "True luxury is the absence of noise. We believe in crafting spaces that don't just exist, but actively breathe with the rhythms of those who inhabit them."
} = {}) {
    return (
        <div className="relative min-h-screen bg-stone-50 text-green-950 selection:bg-green-200 selection:text-green-900 font-sans">
            <GrainOverlay />
            <CustomCursor />
            <Navbar />

            <main>
                <Hero brandName={brandName} heroTitle={heroTitle} heroSubtitle={heroSubtitle} />
                <Statement statementText={statementText} />
                <Marquee />
                <ParallaxGallery />
                <Features />
            </main>

            <Footer />
        </div>
    );
}
