import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';


// Using standard icons we know exist to avoid crash
import { Code, Gear } from '@phosphor-icons/react';

const VSCodePreloader = ({ onComplete }) => {
    const preloaderRef = useRef(null);
    const [typedText, setTypedText] = useState("");

    // Adjusted: Static code is now just the import and opening
    const staticCode = `import { Portfolio } from 'nandkishor-mali';\n\nconst profile = new Portfolio({\n`;
    const typingCode = `  name: "Nandkishor Mali",\n  role: "Full Stack Developer",\n  status: "Ready to Build"\n});\n\nprofile.init();`;

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Initial Startup Animation
            gsap.fromTo('.vscode-window',
                {
                    scale: 0.8,
                    opacity: 0,
                    filter: 'blur(10px)',
                    y: 50
                },
                {
                    scale: 1,
                    opacity: 1,
                    filter: 'blur(0px)',
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }
            );
        }, preloaderRef);

        // Start with static code already visible
        setTypedText(staticCode);

        let timer;
        let index = 0;

        const typeChar = () => {
            if (index < typingCode.length) {
                setTypedText(staticCode + typingCode.substring(0, index + 1));
                index++;
                timer = setTimeout(typeChar, 40); // Faster consistent speed
            } else {
                // Done typing
                setTimeout(() => {
                    // Exit Animation with Motion Blur
                    gsap.to('.vscode-window', {
                        y: -150,
                        opacity: 0,
                        filter: 'blur(15px)',
                        scale: 1.1,
                        duration: 0.4,
                        ease: "power2.in"
                    });

                    gsap.to(preloaderRef.current, {
                        opacity: 0,
                        duration: 0.5,
                        delay: 0.2,
                        onComplete: onComplete
                    });
                }, 600);
            }
        };

        // Start delay
        timer = setTimeout(typeChar, 1000);

        return () => {
            clearTimeout(timer);
            if (ctx) ctx.revert();
        };
    }, [onComplete]);

    return (
        <div ref={preloaderRef} className="preloader">
            <div className="vscode-window">
                <div className="vscode-header">
                    <div className="vscode-controls">
                        <div className="vc-dot red"></div>
                        <div className="vc-dot yellow"></div>
                        <div className="vc-dot green"></div>
                    </div>
                    <div className="vscode-title">intro.js — Visual Studio Code</div>
                </div>

                <div className="vscode-body">
                    {/* Condensed Sidebar for visual flair */}
                    <div className="vscode-sidebar">
                        {/* Using Code icon instead of Files to be safe */}
                        <Code size={24} className="sidebar-icon active" weight="bold" />
                        <Gear size={24} className="sidebar-icon" style={{ marginTop: 'auto', marginBottom: '15px' }} />
                    </div>

                    <div className="vscode-editor">
                        <div className="editor-tabs">
                            <div className="tab">
                                <span className="tab-icon">JS</span> intro.js
                            </div>
                        </div>

                        <div className="editor-content">
                            {/* We render the text inside a pre tag to preserve whitespace */}
                            <pre className="code-container" style={{ fontFamily: 'Consolas, monospace', fontSize: '16px', lineHeight: '1.5' }}>
                                {/* VS Code Dark+ String Color */}
                                <span style={{ color: '#ce9178' }}>{typedText}</span><span className="cursor-blink">|</span>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VSCodePreloader;
