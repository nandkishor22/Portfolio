import React, { useState, useEffect } from 'react';
import { Cpu, Clock, MusicNote, Database } from '@phosphor-icons/react';


const SystemDashboard = () => {
    const [time, setTime] = useState(new Date());
    const [cpuLoad, setCpuLoad] = useState(0.2);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        const cpuTimer = setInterval(() => setCpuLoad((Math.random() * 0.5 + 0.1).toFixed(1)), 3000);

        return () => {
            clearInterval(timer);
            clearInterval(cpuTimer);
        };
    }, []);

    return (
        <div className="system-dashboard glass">
            <div className="dash-section">
                <Clock size={16} color="var(--secondary)" />
                <span className="dash-val">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>

            <div className="dash-section">
                <Cpu size={16} color="var(--primary)" />
                <span className="dash-val">CPU: {cpuLoad}%</span>
            </div>

            <div className="dash-section music">
                <MusicNote size={16} color="#27c93f" />
                <div className="music-scroll">
                    <span>Now Playing: Code_Radio.wav</span>
                </div>
            </div>

            <div className="dash-section">
                <Database size={16} color="#ffa500" />
                <span className="dash-val">NVMe: 1.2TB FREE</span>
            </div>
        </div>
    );
};

export default SystemDashboard;
