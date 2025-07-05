'use client'

export default function footer() {
    return (
        <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">

            <aside className="grid-flow-col items-center">
                <img src="/favicon.ico" alt="favicon.ico" className=" w-8 h-8" />
                <p>   &copy; {new Date().getFullYear()} ethcp.top For academic and exploratory purposes.</p>
            </aside>

            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">

            </nav>

        </footer>
    )
}