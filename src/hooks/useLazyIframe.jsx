import { useState, useEffect, useRef } from 'react';

export const LazyIframe = ({ src, title, className, ...props }) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    observer.unobserve(element);
                }
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, []);

    return (
        <div ref={elementRef} className={`lazy-iframe-container ${className || ''}`}>
            {isIntersecting ? (
                <iframe
                    src={src}
                    title={title}
                    className="lazy-iframe loaded"
                    {...props}
                />
            ) : (
                <div className="lazy-placeholder">
                    <div className="loading-spinner"></div>
                    <p style={{ marginTop: '1rem', color: '#c7d5e0' }}>動画を読み込み中...</p>
                </div>
            )}
        </div>
    );
};