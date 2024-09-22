"use client";
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { sha256 } from 'js-sha256';

const MouseMovementTracker = () => {
    useEffect(() => {
        let movements = [];

        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
            const timestamp = Date.now();
            movements.push({ x: clientX, y: clientY, timestamp });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            const fingerprint = sha256(JSON.stringify(movements));
            Cookies.set('mouseMovementFingerprint', fingerprint, { path: '/', sameSite: 'Lax' });
            console.log('Mouse Movement Fingerprint:', fingerprint);
        };
    }, []);

    return null;
};

export default MouseMovementTracker;
