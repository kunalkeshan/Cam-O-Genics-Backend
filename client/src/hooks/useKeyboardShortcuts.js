/**
 * Use Keyboard Shortcuts hook
 */

// Dependencies
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useKeyboardShortcuts = () => {
    const navigate = useNavigate();
    useEffect(() => {
        window.addEventListener('keyup', (event) => {
            // Any page that's not an admin page
            if (!window.location.pathname.includes('admin') || !window.location.pathname.includes('contact')) {
                // . - Period to open up admin app
                if (event.key === '.') {
                    navigate('/admin');
                };
            }
        });
        return () => window.removeEventListener('keyup', () => null)
    }, [navigate])
}

export default useKeyboardShortcuts;