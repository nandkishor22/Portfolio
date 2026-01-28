import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GitCommit, GitBranch, GitMerge } from '@phosphor-icons/react';


gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const sectionRef = useRef(null);
    const lineRef = useRef(null);

    const experiences = [
        
        {
            year: "2023-2026",
            title: "Diploma in Computer Engineering",
            company: "Padmabhushan Vasantdada Patil Institute of Technology",
            desc: "Relevant Coursework: Object-Oriented Programming, Web Development",
            type: "merge"
        },
        {
            year: "2025 jun - 2025 Aug",
            title: "Industrial Training",
            company: "Swara Software Solutions",
            desc: "Web Development and Machine Learning",
            type: "commit"
        }
    ];

    useEffect(() => {
        let ctx = gsap.context(() => {
            const line = lineRef.current;

            gsap.fromTo(line,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        end: "bottom 80%",
                        scrub: true
                    }
                }
            );

            const items = sectionRef.current.querySelectorAll('.exp-item');
            items.forEach((item) => {
                gsap.fromTo(item,
                    { opacity: 0, x: -30 },
                    {
                        opacity: 1,
                        x: 0,
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%"
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="experience container" id="experience">
            <div className="terminal-path-display glass">
                <GitBranch size={16} /> <span className="path">git checkout logs/experience</span>
            </div>

            <h2 className="section-title-terminal">
                <span className="hash">#</span> Career Path
            </h2>

            <div className="git-timeline">
                <div ref={lineRef} className="git-line"></div>

                <div className="exp-list">
                    {experiences.map((exp, index) => (
                        <div key={index} className="exp-item">
                            <div className="git-node">
                                {exp.type === 'commit' && <GitCommit size={24} color="var(--primary)" weight="bold" />}
                                {exp.type === 'branch' && <GitBranch size={24} color="var(--secondary)" weight="bold" />}
                                {exp.type === 'merge' && <GitMerge size={24} color="#27c93f" weight="bold" />}
                            </div>

                            <div className="exp-content glass">
                                <div className="exp-header">
                                    <span className="exp-year">{exp.year}</span>
                                    <h3 className="exp-title">{exp.title}</h3>
                                    <span className="exp-company">@ {exp.company}</span>
                                </div>
                                <p className="exp-desc">
                                    <span className="comment">// {exp.desc}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
