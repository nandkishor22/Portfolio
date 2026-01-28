import React, { useEffect, useState } from 'react';
import { CaretUp, Code, Terminal, Database } from '@phosphor-icons/react';


const Footer = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = totalScroll / windowHeight;
            setProgress(scroll);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <footer className="footer">
            <div className="terminal-separator">
                <span className="line"></span>
                <span className="dot"></span>
                <span className="line"></span>
            </div>

            <div className="container footer-content-terminal">
                <div className="footer-top-row">
                    <div className="footer-brand-terminal">
                        <Terminal size={32} color="var(--primary)" />
                        <div className="brand-text">
                            <h3>NANDKISHOR.DEV</h3>
                            <p className="comment">// system-status: normal</p>
                        </div>
                    </div>

                    <div className="footer-stats-terminal glass">
                        <div className="stat">
                            <span className="label">PORT:</span>
                            <span className="value">3000</span>
                        </div>
                        <div className="stat">
                            <span className="label">ENV:</span>
                            <span className="value">PRODUCTION</span>
                        </div>
                        <div className="stat">
                            <span className="label">LANG:</span>
                            <span className="value">EN_IN</span>
                        </div>
                    </div>
                </div>

                <div className="footer-main-terminal">
                    <div className="footer-links-terminal">
                        <a href="#home"><span className="hash">#</span>home</a>
                        <a href="#about"><span className="hash">#</span>about</a>
                        <a href="#projects"><span className="hash">#</span>projects</a>
                        <a href="#contact"><span className="hash">#</span>contact</a>
                    </div>

                    <div className="footer-copyright-terminal">
                        <span className="bracket">[</span> © {new Date().getFullYear()} NANDKISHOR_MALI <span className="bracket">]</span>
                    </div>
                </div>
            </div>

            {/* Magnetic Caret Button */}
            <div className="scroll-progress-container" onClick={scrollToTop}>
                <div className="progress-value">{(progress * 100).toFixed(0)}%</div>
                <div className="scroll-circle">
                    <svg width="60" height="60" viewBox="0 0 60 60">
                        <circle cx="30" cy="30" r="28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                        <circle cx="30" cy="30" r="28" fill="none" stroke="var(--primary)" strokeWidth="2"
                            strokeDasharray="175.9"
                            strokeDashoffset={175.9 - (175.9 * progress)}
                            style={{ transition: 'stroke-dashoffset 0.1s' }}
                        />
                    </svg>
                    <CaretUp size={24} className="up-arrow" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
