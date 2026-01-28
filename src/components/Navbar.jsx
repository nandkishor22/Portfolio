import React, { useState } from 'react';
import { List, X, SpeakerHigh, SpeakerSlash, Cpu, WifiHigh } from '@phosphor-icons/react';
import { useSound } from '../hooks/useSound';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const { playHover, playClick } = useSound();

    const toggleMenu = () => {
        if (soundEnabled) playClick();
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        if (soundEnabled) playClick();
        setIsOpen(false);
    }

    const onHover = () => {
        if (soundEnabled) playHover();
    }

    return (
        <nav className="navbar">
            <div className="nav-top-line container">
                <div className="sys-info">
                    <span className="info-item"><Cpu size={14} /> CPU: 0.2%</span>
                    <span className="info-item"><WifiHigh size={14} /> LATENCY: 24ms</span>
                </div>
                <div className="version-badge">V2.0.4_STABLE</div>
            </div>

            <div className="container nav-container glass">
                <a href="#home" className="logo" onMouseEnter={onHover}>
                    <span className="bracket">&lt;</span>
                    NANDKISHOR MALI
                    <span className="bracket">/&gt;</span>
                </a>

                <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <a href="#home" onClick={handleLinkClick} onMouseEnter={onHover}><span className="nav-num">01.</span>Home</a>
                    <a href="#about" onClick={handleLinkClick} onMouseEnter={onHover}><span className="nav-num">02.</span>About</a>
                    <a href="#projects" onClick={handleLinkClick} onMouseEnter={onHover}><span className="nav-num">03.</span>Projects</a>
                    <a href="#contact" onClick={handleLinkClick} onMouseEnter={onHover}><span className="nav-num">04.</span>Contact</a>

                    <div className="nav-actions">
                        <button
                            className="sound-toggle"
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            title={soundEnabled ? "Mute Sounds" : "Enable Sounds"}
                        >
                            {soundEnabled ? <SpeakerHigh size={20} /> : <SpeakerSlash size={20} />}
                        </button>
                    </div>

                    <button className="close-menu" onClick={toggleMenu}><X size={32} /></button>
                </div>

                <button className="hamburger" onClick={toggleMenu}>
                    <List size={32} color="white" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
