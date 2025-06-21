'use client';

import { useEffect } from 'react';
import { sdk } from '@farcaster/frame-sdk';

export default function farcaster({ children }) {
    useEffect(() => {
        sdk.actions.ready();
    }, []);

    return (
        <>
            {children}
        </>
    );
}
