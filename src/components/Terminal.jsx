import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Terminal = () => {
    const [text, setText] = useState('');
    const containerRef = useRef(null);
    const codeSnippet = `
const developer = {
  name: "Nandkishor",
  skills: ["React", "WebGL", "GSAP"],
  passion: "Creative Coding",
  status: "Available for Hire"
};

console.log("Welcome to my world!");
`;

    // Typewriter effect
    useEffect(() => {
        let currentIndex = 0;
        let timeout;

        const type = () => {
            if (currentIndex < codeSnippet.length) {
                setText(codeSnippet.substring(0, currentIndex + 1));
                currentIndex++;
                timeout = setTimeout(type, 30 + Math.random() * 50); // Random typing speed
            }
        };

        // Start typing when in view
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 80%",
            onEnter: () => {
                if (currentIndex === 0) type();
            }
        });

        return () => clearTimeout(timeout);
    }, []);

    return (
        <section ref={containerRef} className="container" style={{ margin: '0 auto 100px', maxWidth: '800px', width: '100%', padding: '0 20px' }}>
            <div className="glass" style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                {/* Terminal Header */}
                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
                    <div style={{ flex: 1, textAlign: 'center', color: '#888', fontFamily: 'monospace', fontSize: '12px' }}>
                        nandkishor-portfolio — bash
                    </div>
                </div>

                {/* Terminal Body */}
                <div style={{ padding: '24px', background: 'rgba(10, 5, 20, 0.95)', minHeight: '300px', fontFamily: 'monospace', fontSize: '16px', lineHeight: '1.6', overflowX: 'auto' }}>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#a0a0a0' }}>
                        <span style={{ color: '#bc13fe' }}>➜</span> <span style={{ color: '#00f3ff' }}>~</span> <span style={{ color: 'white' }}>node about-me.js</span>
                        <br />
                        <br />
                        <span className="code-content" dangerouslySetInnerHTML={{
                            __html: text
                                .replace(/const|var|let/g, '<span style="color:#bc13fe">const</span>')
                                .replace(/"(.*?)"/g, '<span style="color:#27c93f">"$1"</span>')
                                .replace(/([a-zA-Z0-9_]+):/g, '<span style="color:#00f3ff">$1</span>:')
                        }} />
                        <span className="blink-cursor">|</span>
                    </pre>
                </div>
            </div>
        </section>
    );
};

export default Terminal;
