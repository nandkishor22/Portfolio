import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Palette, Lightning, Atom, Sparkle } from '@phosphor-icons/react';


gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const skillRefs = useRef([]);
    const terminalRef = useRef(null);

    // Register trigger
    useEffect(() => {
        let ctx = gsap.context(() => {
            const el = sectionRef.current;

            gsap.fromTo(el,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%"
                    }
                }
            );

            gsap.fromTo(skillRefs.current,
                { opacity: 0, x: -20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: "top 70%"
                    }
                }
            );
        }, sectionRef); // Scope to sectionRef

        return () => ctx.revert();
    }, []);

    const addToRefs = (el) => {
        if (el && !skillRefs.current.includes(el)) {
            skillRefs.current.push(el);
        }
    };

    const skills = [
        { name: 'HTML/CSS', icon: <Code size={32} /> },
        { name: 'JavaScript', icon: <Lightning size={32} /> },
        { name: 'React', icon: <Atom size={32} /> },
        { name: 'GSAP', icon: <Sparkle size={32} /> },
        { name: 'UI Design', icon: <Palette size={32} /> },
    ];

    return (
        <section ref={sectionRef} className="about container" id="about">
            <div className="about-grid">
                {/* Replaced Image Frame with Terminal Window */}
                <div className="about-image-wrapper">
                    <div ref={terminalRef} className="terminal-window">
                        <div className="terminal-header">
                            <div className="dot red"></div>
                            <div className="dot yellow"></div>
                            <div className="dot green"></div>
                            <div className="terminal-title">developer-profile — info</div>
                        </div>
                        <div className="terminal-body">
                            <pre className="pre-container">
                                <span className="comment">// Profile initialized</span>
                                <span className="keyword">const</span> <span className="variable">developer</span> = {'{'}
                                <span className="key">name</span>: <span className="string">"Nandkishor Mali"</span>,
                                <span className="key">role</span>: <span className="string">"Full Stack Developer"</span>,
                                <span className="key">location</span>: <span className="string">"India"</span>,
                                <span className="key">status</span>: <span className="string">"Building the Future"</span>
                                {'}'};
                            </pre>
                            <div className="terminal-image-container">
                                <img
                                    src="public/developer.jpg"
                                    alt="Developer"
                                    className="terminal-profile-img"
                                />
                                <div className="scan-line"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={contentRef} className="about-content">
                    <div className="terminal-block">
                        <div className="terminal-header-mini">
                            <span className="prompt-mini">➜ about-me.md </span>
                        </div>
                        <div className="terminal-content-text">
                            <h2 className="section-title-terminal">
                                <span className="hash">#</span> About Me
                            </h2>
                            <p className="bio-text-terminal">
                                &gt; I'm a passionate Full Stack Developer with a knack for creating immersive.<br />
                                &gt; Blending technical expertise with a keen eye for design, I build performant and beautiful applications.<br />
                                <span className="cursor-blink">_</span>
                            </p>
                        </div>
                    </div>

                    <div className="skills-grid-terminal">
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                ref={addToRefs}
                                className="skill-item-terminal"
                            >
                                <span className="bracket">[</span>
                                <span className="skill-name">{skill.name}</span>
                                <span className="bracket">]</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
