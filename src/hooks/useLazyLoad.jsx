import { useState, useEffect, useRef } from 'react';

export const useLazyLoad = (options = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const elementRef = useRef(null);

    const { threshold = 0.1, rootMargin = '50px' } = options;

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        if (typeof IntersectionObserver !== 'function') {
            setIsIntersecting(true);
            return;
        }

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

    return { elementRef, isIntersecting };
};

export const LazyImage = ({ src, alt, className, ...props }) => {
    const { elementRef, isIntersecting } = useLazyLoad();
    const [status, setStatus] = useState('loading');

    return (
        <div ref={elementRef} className={`lazy-image-container ${className || ''}`}>
            {status === 'error' && <p className="is-size-7" role="status">画像を読み込めませんでした。</p>}
            {isIntersecting && status !== 'error' && (
                <img
                    src={src}
                    alt={alt}
                    className={`lazy-image ${status === 'loaded' ? 'loaded' : 'loading'}`}
                    onLoad={() => setStatus('loaded')}
                    onError={() => setStatus('error')}
                    {...props}
                />
            )}
            {status === 'loading' && isIntersecting && (
                <div className="lazy-placeholder">
                    <div className="loading-spinner"></div>
                </div>
            )}
        </div>
    );
};

export const LazyVideo = ({ src, className, ...props }) => {
    const { elementRef, isIntersecting } = useLazyLoad();
    const [status, setStatus] = useState('loading');

    return (
        <div ref={elementRef} className={`lazy-video-container ${className || ''}`}>
            {status === 'error' && <p className="is-size-7" role="status">動画を読み込めませんでした。</p>}
            {isIntersecting && status !== 'error' && (
                <video
                    className={`lazy-video ${status === 'loaded' ? 'loaded' : 'loading'}`}
                    onLoadedMetadata={() => setStatus('loaded')}
                    onError={() => setStatus('error')}
                    {...props}
                    src={src}
                >
                    お使いのブラウザでは動画が再生できません。
                </video>
            )}
            {status === 'loading' && isIntersecting && (
                <div className="lazy-placeholder">
                    <div className="loading-spinner"></div>
                </div>
            )}
        </div>
    );
};
