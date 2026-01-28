import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Database, Code, Terminal, Lightning, GitBranch } from '@phosphor-icons/react';


gsap.registerPlugin(ScrollTrigger);

const TechStackDiagnostic = () => {
    const containerRef = useRef(null);

    const techStack = [
        { name: 'React.js', level: 98, color: '#61DAFB', desc: 'UI Framework' },
        { name: 'Next.js', level: 94, color: '#ffffff', desc: 'Full-Stack React' },
        { name: 'TypeScript', level: 92, color: '#3178C6', desc: 'Type Safety' },
        { name: 'Node.js', level: 90, color: '#339933', desc: 'Backend Runtime' },
        { name: 'Three.js', level: 85, color: '#049EF4', desc: '3D Graphics' },
        { name: 'GSAP', level: 95, color: '#88CE02', desc: 'Animation Engine' },
        { name: 'MongoDB', level: 88, color: '#47A248', desc: 'NoSQL Database' },
        { name: 'Git', level: 96, color: '#F05032', desc: 'Version Control' },
        { name: 'WebGL', level: 82, color: '#990000', desc: 'GPU Rendering' },
    ];

    const getIcon = (name) => {
        const iconProps = { size: 32, weight: "duotone" };
        switch (name) {
            case 'React.js': return <Code {...iconProps} />;
            case 'Next.js': return <Code {...iconProps} />;
            case 'TypeScript': return <Terminal {...iconProps} />;
            case 'Node.js': return <Database {...iconProps} />;
            case 'Three.js': return <Cpu {...iconProps} />;
            case 'GSAP': return <Lightning {...iconProps} />;
            case 'MongoDB': return <Database {...iconProps} />;
            case 'Git': return <GitBranch {...iconProps} />;
            case 'WebGL': return <Cpu {...iconProps} />;
            default: return <Code {...iconProps} />;
        }
    };

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".diag-card", {
                opacity: 0,
                y: 30,
                scale: 0.9,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                }
            });

            gsap.to(".diag-icon", {
                filter: "drop-shadow(0 0 15px currentColor)",
                repeat: -1,
                yoyo: true,
                duration: 2,
                ease: "sine.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="tech-diagnostic container" id="tech">
            <div className="terminal-header-top glass">
                <Terminal size={18} />
                <span>SYSTEM_DIAGNOSTIC / TECH_STACK_OVERVIEW</span>
                <div className="sys-status-pulse">
                    <span className="pulse-dot"></span>
                    MONITORING_ACTIVE
                </div>
            </div>

            <div className="diagnostic-grid">
                {techStack.map((tech, index) => (
                    <div key={index} className="diag-card glass" style={{ borderColor: `${tech.color}33` }}>
                        <div className="diag-header">
                            <div className="diag-icon" style={{ color: tech.color }}>
                                {getIcon(tech.name)}
                            </div>
                            <div className="diag-title-area">
                                <h3>{tech.name}</h3>
                                <span className="diag-sub">{tech.desc}</span>
                            </div>
                        </div>

                        <div className="diag-progress-area">
                            <div className="diag-stats">
                                <span>Stability: {tech.level}%</span>
                                <span>Status: OPTIMIZED</span>
                            </div>
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar-fill"
                                    style={{
                                        width: `${tech.level}%`,
                                        background: `linear-gradient(90deg, transparent, ${tech.color})`,
                                        boxShadow: `0 0 10px ${tech.color}`
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div className="diag-details">
                            <div className="detail-line">
                                <span className="d-key">v_check</span>
                                <span className="d-val">STABLE</span>
                            </div>
                            <div className="detail-line">
                                <span className="d-key">latency</span>
                                <span className="d-val">0.02ms</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="diagnostic-footer">
                <div className="scanline-horizontal"></div>
                <div className="footer-meta">
                    <span>INDEXED_ENTITIES: {techStack.length}</span>
                    <span>SECURITY_CLEARANCE: LEVEL_4</span>
                    <span>LAST_VERIFICATION: {new Date().toLocaleDateString()}</span>
                </div>
            </div>
        </section>
    );
};

export default TechStackDiagnostic;
