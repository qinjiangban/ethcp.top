'use client'

export default function page() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-red-900 to-red-950 text-white">
                {/* 头部区域 */}
                <header className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-5xl sm:text-6xl font-bold mb-4">Ethereum Communist Party</h1>
                        <h2 className="text-2xl sm:text-3xl font-medium mb-6">共产主义社会中的世界计算机</h2>
                        <p className="text-xl sm:text-2xl italic text-red-200">探索新数字世界中的社会生产关系</p>
                    </div>
                </header>

                {/* 主要内容区域 */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                    {/* 介绍部分 */}
                    <section id="intro" className="mb-16 bg-red-800/30 p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold mb-6 border-b border-red-500 pb-2">项目介绍</h2>
                        <p className="text-lg leading-relaxed">ETHCP（以太坊共产党）是一个创新的Web3项目，旨在探索区块链技术与共产主义社会理念的结合。我们相信，以太坊作为世界计算机，可以成为构建新型社会生产关系的基础设施，实现资源的公平分配和集体所有制的数字化实践。</p>
                    </section>

                    {/* 愿景与使命 */}
                    <section id="vision" className="mb-16 bg-red-800/30 p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold mb-6 border-b border-red-500 pb-2">愿景与使命</h2>
                        <p className="text-lg leading-relaxed">我们的愿景是利用区块链技术创建一个去中心化的数字社会，在这个社会中，生产资料由集体所有，每个参与者都能公平地获取资源和机会。ETHCP致力于通过智能合约和去中心化应用，实现数字世界中的共产主义理想。</p>
                    </section>

                    {/* 核心原则 */}
                    <section id="principles" className="mb-16 bg-red-800/30 p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold mb-6 border-b border-red-500 pb-2">核心原则</h2>
                        <div className="text-lg leading-relaxed">
                            {"ETHCP基于以下核心原则：\n1. 集体所有制：所有项目资产和资源由社区集体所有和管理\n2. 按需分配：根据社区成员的需求和贡献进行资源分配\n3. 去中心化治理：通过DAO（去中心化自治组织）实现民主决策\n4. 技术创新：不断探索区块链技术在社会组织形式中的创新应用".split('\n').map((item, index) => (
                                <p key={index} className={index > 0 ? "mt-4" : ""}>{item}</p>
                            ))}
                        </div>
                    </section>

                    {/* 技术实现 */}
                    <section id="technology" className="mb-16 bg-red-800/30 p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold mb-6 border-b border-red-500 pb-2">技术实现</h2>
                        <p className="text-lg leading-relaxed">ETHCP项目基于以太坊区块链，确保项目的去中心化特性和社区自治能力。</p>
                    </section>

                    {/* 社区参与 */}
                    <section id="community" className="mb-16 bg-red-800/30 p-8 rounded-lg shadow-lg">
                        <h2 className="text-3xl font-bold mb-6 border-b border-red-500 pb-2">社区参与</h2>
                        <p className="text-lg leading-relaxed">ETHCP是一个开放的社区，欢迎所有认同项目理念的参与者加入。无论您是开发者、设计师、经济学家还是社会活动家，都可以在ETHCP找到自己的位置，共同探索区块链技术与共产主义理念的结合点，构建更加公平、透明的数字社会。</p>
                    </section>


                </main>

            </div>
        </>
    )
}