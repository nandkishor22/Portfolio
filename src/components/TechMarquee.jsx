import React from 'react';

import {
    Atom, FileCode,
    Database, Globe, Terminal, Cpu, BracketsCurly, Code
} from '@phosphor-icons/react';

const TechMarquee = () => {
    const icons = [
        { Icon: Atom, name: "React" },
        { Icon: FileCode, name: "HTML5" },
        { Icon: FileCode, name: "CSS3" },
        { Icon: FileCode, name: "JavaScript" },
        { Icon: FileCode, name: "TypeScript" },
        { Icon: Database, name: "Node.js" },
        { Icon: Globe, name: "Next.js" },
        { Icon: Terminal, name: "Bash" },
        { Icon: Cpu, name: "WebGL" },
        { Icon: BracketsCurly, name: "GSAP" },
    ];

    return (
        <div className="tech-marquee-container">
            <div className="marquee-track">
                {[...icons, ...icons, ...icons].map((item, index) => (
                    <div key={index} className="marquee-item">
                        <item.Icon size={40} weight="bold" className="marquee-icon" />
                        <span className="marquee-name">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechMarquee;
