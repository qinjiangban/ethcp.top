'use client'

export default function footer() {
    return (
        <footer className=" w-full p-6 text-center text-red-700 text-sm">
            <p>&copy; {new Date().getFullYear()} ethcp.top For academic and exploratory purposes.</p>
        </footer>
    )
}