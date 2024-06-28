import { useState, useEffect } from 'react';
function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const handler = setInterval(() => {
            setDebounceValue(value);
        }, delay);
        return () => clearInterval(handler);
    }, [value]);
    return debounceValue;
}

export default useDebounce;
