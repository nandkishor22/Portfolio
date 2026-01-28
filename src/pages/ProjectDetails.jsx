import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, LinkSimple, GithubLogo, Code, Star, Cpu, Database, Globe } from '@phosphor-icons/react';
import { supabase } from '../lib/supabase';
import CustomCursor from '../components/CustomCursor';


const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setProject(data);
            } catch (err) {
                console.error('Error fetching project:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="project-details-loading">
                <div className="loading-spinner"></div>
                <p>LOADING_PROJECT_DATA...</p>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="project-details-error">
                <h2>Project Not Found</h2>
                <button onClick={() => navigate('/')} className="back-btn">
                    <ArrowLeft size={20} /> Back to Home
                </button>
            </div>
        );
    }

    const title = project.Title || project.title;
    const description = project.Description || project.description;
    const image = project.Img || project.image_url;
    const liveUrl = project.Link || project.live_url;
    const githubUrl = project.Github || project.github_url;
    const techStack = project.TechStack || project.tech_stack || [];
    const features = project.Features || project.features || [];

    return (
        <>
            <CustomCursor />
            <div className="project-details-page">
                <div className="details-bg-effects">
                    <div className="bg-blob blob-1"></div>
                    <div className="bg-blob blob-2"></div>
                    <div className="bg-blob blob-3"></div>
                    <div className="grid-overlay"></div>
                </div>

                <div className="details-container">
                    <div className="details-header">
                        <button onClick={() => navigate('/', { state: { scrollTo: 'projects' } })} className="back-btn">
                            <ArrowLeft size={20} /> Back to Projects
                        </button>
                        <div className="breadcrumb">
                            <span>Projects</span>
                            <span className="separator">›</span>
                            <span className="current">{title}</span>
                        </div>
                    </div>

                    <div className="details-grid">
                        <div className="details-left">
                            <div className="project-title-section">
                                <h1 className="project-title">{title}</h1>
                                <div className="status-badge">
                                    <span className="status-dot"></span>
                                    PROJECT_ACTIVE
                                </div>
                            </div>

                            <p className="project-description">{description}</p>

                            <div className="project-stats">
                                <div className="stat-card">
                                    <Code size={24} className="stat-icon" />
                                    <div className="stat-content">
                                        <div className="stat-value">{techStack.length}</div>
                                        <div className="stat-label">Technologies</div>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <Star size={24} className="stat-icon" />
                                    <div className="stat-content">
                                        <div className="stat-value">{features.length}</div>
                                        <div className="stat-label">Features</div>
                                    </div>
                                </div>
                            </div>

                            <div className="action-buttons">
                                {liveUrl && (
                                    <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="action-btn primary">
                                        <Globe size={20} />
                                        Live Demo
                                    </a>
                                )}
                                {githubUrl && (
                                    <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="action-btn secondary">
                                        <GithubLogo size={20} />
                                        View Code
                                    </a>
                                )}
                            </div>

                            {techStack.length > 0 && (
                                <div className="tech-section">
                                    <h3 className="section-title">
                                        <Cpu size={20} />
                                        Technologies Used
                                    </h3>
                                    <div className="tech-grid">
                                        {techStack.map((tech, index) => (
                                            <div key={index} className="tech-badge">
                                                <Database size={16} />
                                                {tech}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="details-right">
                            <div className="project-image-container">
                                <img src={image} alt={title} className="project-image" />
                                <div className="image-scan-line"></div>
                            </div>

                            {features.length > 0 && (
                                <div className="features-section">
                                    <h3 className="section-title">
                                        <Star size={20} />
                                        Key Features
                                    </h3>
                                    <ul className="features-list">
                                        {features.map((feature, index) => (
                                            <li key={index} className="feature-item">
                                                <span className="feature-bullet">▹</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectDetails;
