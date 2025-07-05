'use client'
import { useParams, useRouter } from 'next/navigation'

const chapterContent: Record<string, { title: string; content: string }> = {
    '1': {
        title: '第一章：共产主义基本原理',
        content: '本章介绍共产主义的基本理论，包括集体所有制、按需分配、消灭阶级等核心思想。结合区块链的去中心化、透明性，探讨数字时代的社会生产关系新模式。'
    },
    '2': {
        title: '第二章：区块链的去中心化与集体所有制',
        content: '区块链技术通过去中心化账本，实现了数据的公开透明和不可篡改。这与共产主义倡导的集体所有制理念高度契合。'
    },
    '3': {
        title: '第三章：智能合约与按需分配',
        content: '智能合约是区块链上的自动化协议，可以根据预设规则自动执行交易和分配资源。这为实现共产主义中的“按需分配”提供了技术手段。通过智能合约，社会成员可以根据实际需求自动获得资源分配，减少人为干预和腐败风险。本章将介绍智能合约的基本原理及其在实现公平分配中的应用前景。'
    },
}

export default function ChapterPage() {
    const params = useParams()
    const router = useRouter()
    const chapterId = params.chapter as string
    const chapter = chapterContent[chapterId]
    const prevChapterId = (Number(chapterId) - 1).toString()
    const nextChapterId = (Number(chapterId) + 1).toString()
    const hasPrev = !!chapterContent[prevChapterId]
    const hasNext = !!chapterContent[nextChapterId]

    if (!chapter) return <div>章节不存在</div>

    return (
        <div className="max-w-2xl mx-auto p-4 flex flex-col min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-red-700">{chapter.title}</h1>
            <div className="mb-8 text-lg leading-relaxed">
                <p>{chapter.content}</p>
            </div>

            <div className="flex gap-4 mt-8">
                {hasPrev && (
                    <button
                        className="btn btn-ghost"
                        onClick={() => router.push(`/edu/${prevChapterId}`)}
                    >
                        上一章节
                    </button>
                )}
                {hasNext && (
                    <button
                        className="btn btn-error"
                        onClick={() => router.push(`/edu/${nextChapterId}`)}
                    >
                        下一章节
                    </button>
                )}
            </div>
        </div>
    )
}