import { useCallback } from 'react';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export const useSound = () => {
    const playHover = useCallback(() => {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    }, []);

    const playClick = useCallback(() => {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.05, audioCtx.currentTime); // Low volume
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    }, []);

    return { playHover, playClick };
};
