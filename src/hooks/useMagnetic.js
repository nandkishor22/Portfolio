import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const useMagnetic = (options = { strength: 0.5, duration: 0.6 }) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const xTo = gsap.quickTo(el, "x", { duration: options.duration, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: options.duration, ease: "power3.out" });

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { top, left, width, height } = el.getBoundingClientRect();

            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const deltaX = clientX - centerX;
            const deltaY = clientY - centerY;

            xTo(deltaX * options.strength);
            yTo(deltaY * options.strength);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [options.strength, options.duration]);

    return ref;
};
