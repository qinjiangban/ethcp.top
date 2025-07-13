'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/frame-sdk';
import { sdk as miniAppSdk } from '@farcaster/miniapp-sdk';
import Link from 'next/link';

export default function farcaster({ children }) {
    const [showDialog, setShowDialog] = useState(false);
    const [isMiniApp, setIsMiniApp] = useState(true); // 默认假设在小程序中

    useEffect(() => {
        sdk.actions.ready();

        // 检测是否在小程序环境中
        const checkMiniApp = async () => {
            try {
                const isInMiniApp = await miniAppSdk.isInMiniApp();
                setIsMiniApp(isInMiniApp);
                if (!isInMiniApp) {
                    setShowDialog(true);
                }
            } catch (error) {
                console.error('Failed to check Mini App status:', error);
                setIsMiniApp(false);
                setShowDialog(true);
            }
        };
        checkMiniApp();
    }, []);

    return (
        <>
            {children}

            {/* 对话框模态 */}
            {showDialog && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h2 className="card-title">建议使用小程序</h2>
                        <p>为了获得最佳体验，建议在 Farcaster 小程序中使用此应用。点击下方按钮跳转到小程序版本。</p>
                        <div className="justify-end card-actions mt-6">
                            <button className="btn btn-ghost" onClick={()=>setShowDialog(false)}>取消</button>
                            <Link href="https://farcaster.xyz/miniapps/SjcreG-2Vz0Y/ethcp" target='_blank' className="btn btn-primary" >跳转小程序</Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
