'use client'

import Link from "next/link"
import ConnectMenu from "./ConnectMenu"

export default function header() {
    return (
        <div className="navbar bg-base-100 shadow-sm">


            <div className="navbar-start">
                <Link href={`/`} role="button" className="btn btn-ghost ">
                    <img src="favicon.ico" alt="favicon.ico" className=" w-8 h-8" />
                    ETHCP
                </Link>
            </div>


            <div className="navbar-center">

            </div>


            <div className="navbar-end">
  
                <ConnectMenu />
            </div>


        </div>
    )
}