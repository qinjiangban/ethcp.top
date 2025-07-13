'use client'

import Footer from "@/components/footer"


export default function page() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-red-900 to-red-950 text-white">
                {/* 头部区域 */}
                <header className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-5xl sm:text-6xl font-bold mb-4">Ethereum Communist Party</h1>
                        <h2 className="text-2xl sm:text-3xl font-medium mb-6">World Computer in Communist Society</h2>
                        <p className="text-xl sm:text-2xl italic text-red-200">Exploring Social Production Relations in the New Digital World</p>
                    </div>
                </header>

                {/* 主要内容区域 */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                    {/* 介绍部分 */}
                    <section id="intro" className="mb-16 bg-red-800/30 p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold mb-6 border-b border-red-500 pb-2">Project Introduction</h2>
                        <p className="text-lg leading-relaxed">ETHCP (Ethereum Communist Party) is an innovative Web3 project that aims to explore the combination of blockchain technology and communist social ideals. We believe that Ethereum, as a world computer, can serve as the infrastructure for building new social production relations, achieving fair resource distribution and digital practice of collective ownership.</p>
                    </section>

                    {/* 愿景与使命 */}
                    <section id="vision" className="mb-16 bg-red-800/30 p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold mb-6 border-b border-red-500 pb-2">Vision & Mission</h2>
                        <p className="text-lg leading-relaxed">Our vision is to use blockchain technology to create a decentralized digital society where the means of production are collectively owned and every participant can fairly access resources and opportunities. ETHCP is committed to realizing communist ideals in the digital world through smart contracts and decentralized applications.</p>
                    </section>

                    {/* 核心原则 */}
                    <section id="principles" className="mb-16 bg-red-800/30 p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold mb-6 border-b border-red-500 pb-2">Core Principles</h2>
                        <div className="text-lg leading-relaxed">
                            {"ETHCP is based on the following core principles:\n1. Collective Ownership: All project assets and resources are collectively owned and managed by the community\n2. Distribution According to Need: Resource allocation based on community members' needs and contributions\n3. Decentralized Governance: Democratic decision-making through DAO (Decentralized Autonomous Organization)\n4. Technological Innovation: Continuously exploring innovative applications of blockchain technology in social organizational forms".split('\n').map((item, index) => (
                                <p key={index} className={index > 0 ? "mt-4" : ""}>{item}</p>
                            ))}
                        </div>
                    </section>

                    {/* 技术实现 */}
                    <section id="technology" className="mb-16 bg-red-800/30 p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold mb-6 border-b border-red-500 pb-2">Technical Implementation</h2>
                        <p className="text-lg leading-relaxed">The ETHCP project is based on the Ethereum blockchain, ensuring the project's decentralized characteristics and community autonomy capabilities.</p>
                    </section>

                    {/* 社区参与 */}
                    <section id="community" className="mb-16 bg-red-800/30 p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold mb-6 border-b border-red-500 pb-2">Community Participation</h2>
                        <p className="text-lg leading-relaxed">ETHCP is an open community that welcomes all participants who identify with the project's philosophy. Whether you are a developer, designer, economist, or social activist, you can find your place in ETHCP to jointly explore the intersection of blockchain technology and communist ideals, building a more fair and transparent digital society.</p>
                    </section>


                </main>



                <div className="mt-8 flex justify-center">
                    <button
                        onClick={async () => {
                            const { sdk } = await import("@farcaster/miniapp-sdk");
                            await sdk.actions.viewProfile({ fid: 969615 }); // 请将123456替换为qinjiangban的真实fid
                        }}
                        className="btn btn-primary btn-lg my-4"
                    >
                        Developer qinjiangban 
                    </button>
                </div>


            </div>






            <Footer />
        </>
    )
}