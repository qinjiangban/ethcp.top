'use client'

import Link from "next/link"
import ConnectMenu from "./ConnectMenu"

export default function header() {
    return (



        <div className="navbar bg-base-100 shadow-sm">

            <div className="flex-1">
                <Link href={`/`} className="btn btn-ghost text-xl">
                    <img src="/favicon.ico" alt="favicon.ico" className=" w-8 h-8" />
                    <span>  ETHCP</span>
                </Link>
            </div>

            <div className="flex-none">

                <ConnectMenu />

            </div>
        </div>

    )
}