import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubLogo, Globe, ArrowRight, Cpu, Terminal, ShieldCheck, Database, MagnifyingGlass } from '@phosphor-icons/react';
import { supabase } from '../lib/supabase';


gsap.registerPlugin(ScrollTrigger);

const ProjectPacket = ({ project, index }) => {
    return (
        <div className="project-packet">
            <div className="packet-number">[{String(index + 1).padStart(2, '0')}]</div>

            <div className="packet-visual">
                <img src={project.Img || project.image_url} alt={project.Title || project.title} />
                <div className="packet-scan-line"></div>
                <div className="packet-glitch-overlay"></div>
            </div>

            <div className="packet-info">
                <div className="packet-header">
                    <span className="p-tag">PROJECT_INIT</span>
                    <h3>{project.Title || project.title}</h3>
                </div>

                <p className="p-desc">
                    {project.Description || project.description}
                </p>

                <div className="p-specs">
                    <div className="spec-item">
                        <Cpu size={14} />
                        <span>CORE: {project.TechStack?.[0] || project.tech_stack?.[0] || 'N/A'}</span>
                    </div>
                    <div className="spec-item">
                        <Database size={14} /> <span>STATUS: LIVE</span>
                    </div>
                </div>

                <a
                    href={`/project/${project.id}`}
                    className="p-launch-btn"
                >
                    View Details <ArrowRight size={16} />
                </a>
            </div>
        </div>
    );
};

const Projects = () => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const [log, setLog] = useState('SYSTEM_IDLE: Awaiting input...');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch projects from Supabase
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLog('FETCHING_DATA: Connecting to database...');

                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('id', { ascending: true });

                if (error) throw error;

                setProjects(data || []);
                setLog(`DATA_LOADED: ${data?.length || 0} projects retrieved`);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching projects:', err);
                setError(err.message);
                setLog('ERROR: Failed to load projects');
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        if (loading || projects.length === 0) return;

        let ctx = gsap.context(() => {
            let mm = gsap.matchMedia();

            mm.add("(min-width: 1025px)", () => {
                const track = trackRef.current;
                const scrollAmount = track.scrollWidth - window.innerWidth;

                // Create a resize observer to handle dynamic content loading (images)
                const resizeObserver = new ResizeObserver(() => {
                    ScrollTrigger.refresh();
                });
                resizeObserver.observe(track);

                // Only animate if content overflows viewport
                if (scrollAmount > 0) {
                    gsap.to(track, {
                        x: -scrollAmount,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top top",
                            end: () => `+=${track.scrollWidth - window.innerWidth}`, // Recalculate dynamically
                            scrub: 1,
                            pin: true,
                            invalidateOnRefresh: true, // Handle resize automatically
                            onUpdate: (self) => {
                                const progress = Math.min(100, Math.round(self.progress * 100));
                                setLog(`SCANNING_DATA_TRACK: ${progress}% COMPLETE...`);
                            }
                        }
                    });
                }

                return () => resizeObserver.disconnect();
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [loading, projects]);

    if (loading) {
        return (
            <section className="projects-intelligence" id="projects">
                <div className="hud-overlay">
                    <div className="hud-corner top-left"></div>
                    <div className="hud-corner top-right"></div>
                    <div className="hud-grid-pattern"></div>
                </div>
                <div className="loading-state">
                    <Terminal size={48} color="var(--primary)" />
                    <p>LOADING_PROJECTS...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="projects-intelligence" id="projects">
                <div className="error-state">
                    <ShieldCheck size={48} color="var(--secondary)" />
                    <p>ERROR: {error}</p>
                    <p className="error-hint">Please check your Supabase configuration</p>
                </div>
            </section>
        );
    }

    return (
        <section ref={sectionRef} className="projects-intelligence" id="projects">
            {/* Background Hud Elements */}
            <div className="hud-overlay">
                <div className="hud-corner top-left"></div>
                <div className="hud-corner top-right"></div>
                <div className="hud-grid-pattern"></div>
            </div>

            <div className="projects-top-hud">
                <div className="hud-title">
                    <Terminal size={18} color="var(--primary)" />
                    <span>INTELLIGENCE/PROJECT_FEED</span>
                </div>
                <div className="hud-search">
                    <MagnifyingGlass size={16} />
                    <span>grep "creative-solutions"</span>
                </div>
                <div className="hud-stats">
                    <ShieldCheck size={16} color="var(--secondary)" />
                    <span>ENCRYPTED_SESSION</span>
                </div>
            </div>

            <div ref={trackRef} className="projects-intelligence-track">
                {projects.map((project, index) => (
                    <ProjectPacket
                        key={project.id}
                        project={project}
                        index={index}
                    />
                ))}
            </div>

            {/* Bottom System Console */}
            <div className="system-console-bar">
                <div className="console-line">
                    <span className="console-prompt">➜</span> {log}
                </div>
                <div className="console-metadata">
                    <span>PROJECTS: {projects.length}</span>
                    <span>MEM: 24.5GB</span>
                    <span>STATUS: LIVE</span>
                </div>
            </div>
        </section>
    );
};

export default Projects;
