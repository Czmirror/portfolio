import { useLazyLoad } from './useLazyLoad.jsx';

export const LazyIframe = ({ src, title, className, ...props }) => {
    const { elementRef, isIntersecting } = useLazyLoad();

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
