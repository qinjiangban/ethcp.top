import Footer from "@/components/footer";



export default function layout({ children }) {
    return (
        <div className="">
            {children}
            <Footer />
        </div>
    )
}