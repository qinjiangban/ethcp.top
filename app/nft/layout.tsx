import Footer from "@/components/footer"

export const metadata = {
    title: { absolute: 'Mint NFT', },
}

export default function layout({ children }) {
    return (
        <>
            {children}
            <Footer />
        </>
    )
}