import React, { useEffect } from 'react';
import gsap from 'gsap';


const BackgroundLights = () => {
    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.to(".glow-orb", {
                y: -30,
                x: 20,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: {
                    each: 1,
                    from: "random"
                }
            });

            gsap.to(".orb-3", {
                scale: 1.2,
                duration: 6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="background-lights">
            <div className="glow-orb orb-1"></div>
            <div className="glow-orb orb-2"></div>
            <div className="glow-orb orb-3"></div>
        </div>
    );
};

export default BackgroundLights;
