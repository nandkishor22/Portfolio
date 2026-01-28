import { useEffect, useRef } from 'react';

export const useTilt = ({ sensitivity = 10 }) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleMouseMove = (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -sensitivity;
            const rotateY = ((x - centerX) / centerX) * sensitivity;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        };

        const handleMouseLeave = () => {
            el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        };

        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);

        el.style.transition = 'transform 0.1s ease-out';
        el.style.transformStyle = 'preserve-3d';

        return () => {
            el.removeEventListener('mousemove', handleMouseMove);
            el.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [sensitivity]);

    return ref;
};
