import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Envelope, PaperPlaneTilt, GithubLogo, LinkedinLogo, Terminal } from '@phosphor-icons/react';


gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const sectionRef = useRef(null);
    const formRef = useRef(null);
    const [submitStatus, setSubmitStatus] = useState('idle'); // idle, sending, success, error

    useEffect(() => {
        let ctx = gsap.context(() => {
            const el = sectionRef.current;

            gsap.fromTo(el.querySelectorAll('.terminal-input-row'),
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 70%'
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus('sending');

        const formData = new FormData(formRef.current);

        try {
            const response = await fetch("https://formsubmit.co/ajax/malinandkishor445@gmail.com", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success === "true" || response.ok) {
                setSubmitStatus('success');
                formRef.current.reset();
            } else {
                console.error("Form submission failed:", data);
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error("Form error:", error);
            setSubmitStatus('error');
        }
    };

    return (
        <section ref={sectionRef} className="contact container" id="contact">
            <div className="contact-terminal terminal-window glass">
                <div className="terminal-header">
                    <div className="dot red"></div>
                    <div className="dot yellow"></div>
                    <div className="dot green"></div>
                    <div className="terminal-title">contact-service — bin/bash</div>
                </div>

                <div className="terminal-body contact-body">
                    {submitStatus === 'success' ? (
                        <div className="success-message-terminal">
                            <Terminal size={48} color="var(--secondary)" />
                            <h3>TRANSMISSION_COMPLETE</h3>
                            <p>Message packet sent successfully to the server.</p>
                            <button
                                className="terminal-submit-btn"
                                onClick={() => setSubmitStatus('idle')}
                                style={{ marginTop: '20px' }}
                            >
                                SEND_ANOTHER
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="contact-intro">
                                <h2 className="terminal-h2"><span className="keyword">run</span> init_connect.sh</h2>
                                <p className="terminal-p">
                                    <span className="comment">// Ready to start a new project?</span><br />
                                    <span className="comment">// Drop a message below to establish connection.</span>
                                </p>
                            </div>

                            <form ref={formRef} className="contact-terminal-form" onSubmit={handleSubmit}>
                                <input type="hidden" name="_captcha" value="false" />
                                <input type="hidden" name="_template" value="table" />
                                <div className="terminal-input-row">
                                    <span className="prompt">name:</span>
                                    <input type="text" name="name" placeholder="type your name..." required className="terminal-field" />
                                </div>

                                <div className="terminal-input-row">
                                    <span className="prompt">email:</span>
                                    <input type="email" name="email" placeholder="you@domain.com" required className="terminal-field" />
                                </div>

                                <div className="terminal-input-row">
                                    <span className="prompt">message:</span>
                                    <textarea name="message" placeholder="what's on your mind?" rows="4" required className="terminal-field"></textarea>
                                </div>

                                <div className="terminal-submit-row">
                                    <button type="submit" className="terminal-submit-btn" disabled={submitStatus === 'sending'}>
                                        {submitStatus === 'sending' ? (
                                            <>SENDING...</>
                                        ) : (
                                            <><PaperPlaneTilt size={20} weight="fill" /> SEND_DATA</>
                                        )}
                                    </button>
                                </div>
                                {submitStatus === 'error' && (
                                    <div className="error-msg" style={{ color: 'red', marginTop: '10px' }}>
                                        Error sending message. Please try again.
                                    </div>
                                )}
                            </form>
                        </>
                    )}

                    <div className="contact-footer-terminal">
                        <div className="terminal-meta">
                            <span className="key">socials</span>: <span className="bracket">[</span>
                            <a href="https://github.com/nandkishor22" className="val-link">Github</a>,
                            <a href="https://www.linkedin.com/in/nandkishor-mali-17b967326/" className="val-link">LinkedIn</a>,
                            <a href="mailto:malinandkishor445@gmail.com" className="val-link">Email</a>
                            <span className="bracket">]</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
