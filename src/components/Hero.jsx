import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Code, BracketsCurly, Laptop, Terminal, Globe, Cpu } from '@phosphor-icons/react';
import { useMagnetic } from '../hooks/useMagnetic';


const Hero = () => {
    const headlineRef = useRef(null);
    const subRef = useRef(null);
    const btnRef = useRef(null);
    const terminalRef = useRef(null);

    // Magnetic Icons
    const icon1 = useMagnetic({ strength: 0.3 });
    const icon2 = useMagnetic({ strength: 0.4 });
    const icon3 = useMagnetic({ strength: 0.2 });
    const icon4 = useMagnetic({ strength: 0.5 });
    const icon5 = useMagnetic({ strength: 0.3 });

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.8 });

            // Motion Blur Entrance for Title
            tl.fromTo(headlineRef.current,
                { opacity: 0, y: 100, filter: 'blur(20px)', skewY: 10 },
                { opacity: 1, y: 0, filter: 'blur(0px)', skewY: 0, duration: 1.2, ease: 'expo.out' }
            )
                .fromTo(subRef.current,
                    { opacity: 0, x: -50 },
                    { opacity: 1, x: 0, duration: 0.8 },
                    "-=0.6"
                )
                .fromTo(terminalRef.current,
                    { opacity: 0, scale: 0.9, y: 50 },
                    { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power4.out' },
                    "-=0.4"
                )
                .fromTo(btnRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5 },
                    "-=0.5"
                );
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero" id="home">
            <div className="floating-icons">
                <div ref={icon1} className="mag-icon pos-1"><Code size={60} color="var(--primary)" /></div>
                <div ref={icon2} className="mag-icon pos-2"><BracketsCurly size={40} color="var(--secondary)" /></div>
                <div ref={icon3} className="mag-icon pos-3"><Cpu size={50} color="white" /></div>
                <div ref={icon4} className="mag-icon pos-4"><Terminal size={65} color="var(--secondary)" /></div>
                <div ref={icon5} className="mag-icon pos-5"><Globe size={45} color="var(--primary)" /></div>
            </div>

            <div className="hero-content container">
                <div className="hero-terminal-badge glass">
                    <span className="dot"></span> STATUS: AVAILABLE_FOR_PROJECTS
                </div>

                <h1 ref={headlineRef} className="hero-title">
                    <span className="h-line">FULL</span>
                    <span className="h-line neon-text-secondary">STACK</span>
                    <span className="h-line text-outline">DEVELOPER</span>
                </h1>

                <div ref={terminalRef} className="hero-mini-terminal glass">
                    <div className="term-header">
                        <span className="path">~/nandkishor-mali</span>
                    </div>
                    <div className="term-body">
                        <span className="prompt">➜</span> <span className="cmd">whoami</span>
                        <p className="res">Full Stack Developer | AI-Prompt Engineer | Android Developer</p>
                    </div>
                </div>

                <div className="hero-actions" ref={btnRef}>
                    <a href="#projects" className="btn btn-primary">
                        EXPLORE WORK
                    </a>
                    <a href="https://drive.google.com/file/d/1lVrphPuCTM0WxI0n6Mo0_c9oGtQQ2sUb/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ border: '1px solid var(--primary)', color: 'white' }}>
                        RESUME
                    </a>
                </div>
            </div>

            <div className="scroll-indicator">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
                <span>SCROLL_TO_EXPLORE</span>
            </div>
        </section>
    );
};

export default Hero;
