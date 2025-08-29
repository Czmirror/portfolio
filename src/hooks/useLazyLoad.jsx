import { useState, useEffect, useRef } from 'react';

export const useLazyLoad = (options = {}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const elementRef = useRef(null);

    const { threshold = 0.1, rootMargin = '50px' } = options;

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
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [threshold, rootMargin]);

    return { elementRef, isIntersecting, isLoaded, setIsLoaded };
};

export const LazyImage = ({ src, alt, className, ...props }) => {
    const { elementRef, isIntersecting, isLoaded, setIsLoaded } = useLazyLoad();

    const handleLoad = () => {
        setIsLoaded(true);
    };

    return (
        <div ref={elementRef} className={`lazy-image-container ${className || ''}`}>
            {isIntersecting && (
                <img
                    src={src}
                    alt={alt}
                    className={`lazy-image ${isLoaded ? 'loaded' : 'loading'}`}
                    onLoad={handleLoad}
                    {...props}
                />
            )}
            {!isLoaded && isIntersecting && (
                <div className="lazy-placeholder">
                    <div className="loading-spinner"></div>
                </div>
            )}
        </div>
    );
};

export const LazyVideo = ({ src, className, ...props }) => {
    const { elementRef, isIntersecting, isLoaded, setIsLoaded } = useLazyLoad();

    const handleLoadedData = () => {
        setIsLoaded(true);
    };

    return (
        <div ref={elementRef} className={`lazy-video-container ${className || ''}`}>
            {isIntersecting && (
                <video
                    className={`lazy-video ${isLoaded ? 'loaded' : 'loading'}`}
                    onLoadedData={handleLoadedData}
                    {...props}
                >
                    <source src={src} type="video/mp4" />
                    お使いのブラウザでは動画が再生できません。
                </video>
            )}
            {!isLoaded && isIntersecting && (
                <div className="lazy-placeholder">
                    <div className="loading-spinner"></div>
                </div>
            )}
        </div>
    );
};