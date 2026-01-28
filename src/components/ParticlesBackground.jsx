import React, { useEffect, useRef } from 'react';

const ParticlesBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        // Mouse interaction
        let mouse = { x: null, y: null };
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.1;
                this.speedX = (Math.random() * 1.5 - 0.75) * 0.5;
                this.speedY = (Math.random() * 1.5 - 0.75) * 0.5;
                this.color = Math.random() > 0.5 ? '#bc13fe' : '#00f3ff';
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

                // Mouse interaction
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 150) {
                        const angle = Math.atan2(dy, dx);
                        const force = (150 - distance) / 150;
                        const pushX = Math.cos(angle) * force * 2; // subtle push
                        const pushY = Math.sin(angle) * force * 2;
                        this.x -= pushX;
                        this.y -= pushY;
                    }
                }
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            let numberOfParticles = (canvas.width * canvas.height) / 15000;
            // Cap particles for performance
            if (numberOfParticles > 150) numberOfParticles = 150;

            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Connect particles
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 120})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0, // Behind content but in front of body bg
                pointerEvents: 'none',
                opacity: 0.4
            }}
        />
    );
};

export default ParticlesBackground;
