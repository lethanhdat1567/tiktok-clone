import { forwardRef, useState } from 'react';
import images from '~/assets/imgs';
import classNames from 'classnames';
import styles from './img.module.scss';
function Image({ src, alt, className, ...props }, ref) {
    const handleError = () => {
        setFallback(images.unsetImg);
    };
    const [fallback, setFallback] = useState('');
    return (
        <img
            className={classNames(styles.wrapper, className)}
            {...props}
            src={fallback || src}
            alt={alt}
            ref={ref}
            onError={handleError}
        />
    );
}

export default forwardRef(Image);
