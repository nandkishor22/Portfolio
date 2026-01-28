import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';


const CustomCursor = () => {
    const cursorRef = useRef(null);
    const codeRef = useRef(null);
    const [codeText, setCodeText] = useState('0x00');

    useEffect(() => {
        let ctx = gsap.context(() => {
            // We can leave the event listeners here or move them out. 
            // Since they trigger GSAP animations, having a context is useful if we want to kill them all.
        });

        const cursor = cursorRef.current;
        const codeElement = codeRef.current;

        // Hide default cursor
        document.body.style.cursor = 'none';

        const moveCursor = (e) => {
            // Main Bracket Cursor
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out',
                opacity: 1,
                overwrite: 'auto'
            });

            // Following Code Text
            gsap.to(codeElement, {
                x: e.clientX + 20,
                y: e.clientY + 20,
                duration: 0.4,
                ease: 'power3.out',
                overwrite: 'auto'
            });

            // Periodically change the "hex" code next to cursor
            if (Math.random() > 0.98) {
                const hex = '0x' + Math.floor(Math.random() * 16777215).toString(16).toUpperCase().slice(0, 2);
                setCodeText(hex);
            }
        };

        const handleHoverStart = () => {
            gsap.to(cursor, {
                scale: 1.5,
                rotate: 90,
                duration: 0.4,
                color: 'var(--secondary)',
                overwrite: 'auto'
            });
            gsap.to('.cursor-bracket-left', { x: -5, duration: 0.3, overwrite: 'auto' });
            gsap.to('.cursor-bracket-right', { x: 5, duration: 0.3, overwrite: 'auto' });
        };

        const handleHoverEnd = () => {
            gsap.to(cursor, {
                scale: 1,
                rotate: 0,
                duration: 0.4,
                color: 'var(--primary)',
                overwrite: 'auto'
            });
            gsap.to('.cursor-bracket-left', { x: 0, duration: 0.3, overwrite: 'auto' });
            gsap.to('.cursor-bracket-right', { x: 0, duration: 0.3, overwrite: 'auto' });
        };

        window.addEventListener('mousemove', moveCursor);

        // Interactive elements
        const updateInteractions = () => {
            const interactive = document.querySelectorAll('a, button, input, textarea, .tree-leaf, .packet-visual');
            interactive.forEach(el => {
                el.addEventListener('mouseenter', handleHoverStart);
                el.addEventListener('mouseleave', handleHoverEnd);
            });
        };

        updateInteractions();
        const observer = new MutationObserver(updateInteractions);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.body.style.cursor = 'auto';
            observer.disconnect();
            ctx.revert();
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="code-cursor">
                <span className="cursor-bracket-left">{'{'}</span>
                <div className="cursor-dot-core"></div>
                <span className="cursor-bracket-right">{'}'}</span>
            </div>
            <div ref={codeRef} className="cursor-data-label">
                <span className="data-prefix">MEM:</span>
                <span className="data-value">{codeText}</span>
            </div>
        </>
    );
};

export default CustomCursor;
