import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MagnifyingGlass, Terminal, ArrowRight, CaretRight } from '@phosphor-icons/react';


const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const paletteRef = useRef(null);

    const commands = [
        { id: 'about', label: 'Navigate to About', shortcut: 'A', icon: <CaretRight size={18} /> },
        { id: 'projects', label: 'View Projects', shortcut: 'P', icon: <CaretRight size={18} /> },
        { id: 'contact', label: 'Get in Touch', shortcut: 'C', icon: <CaretRight size={18} /> },
        { id: 'resume', label: 'Download Resume', shortcut: 'R', icon: <CaretRight size={18} /> },
        { id: 'dark', label: 'Toggle Dark Mode', icon: <CaretRight size={18} /> },
    ];

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(paletteRef.current,
                { opacity: 0, scale: 0.95, y: -20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" }
            );
        }
    }, [isOpen]);

    const filtered = commands.filter(c =>
        c.label.toLowerCase().includes(query.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <div className="palette-overlay" onClick={() => setIsOpen(false)}>
            <div ref={paletteRef} className="command-palette glass" onClick={e => e.stopPropagation()}>
                <div className="palette-search">
                    <MagnifyingGlass size={20} color="var(--primary)" />
                    <input
                        autoFocus
                        type="text"
                        placeholder="Type a command or search..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <div className="esc-hint">ESC</div>
                </div>

                <div className="palette-list">
                    {filtered.length > 0 ? filtered.map((cmd) => (
                        <div key={cmd.id} className="palette-item">
                            <span className="item-icon">{cmd.icon}</span>
                            <span className="item-label">{cmd.label}</span>
                            {cmd.shortcut && <span className="item-shortcut">{cmd.shortcut}</span>}
                            <ArrowRight size={14} className="hover-arrow" />
                        </div>
                    )) : (
                        <div className="no-results">No commands found...</div>
                    )}
                </div>

                <div className="palette-footer">
                    <div className="footer-tip">
                        <Terminal size={14} /> + K to toggle
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
