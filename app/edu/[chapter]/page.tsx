'use client'
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation'

const chapterContent: Record<string, { title: string; content: string }> = {
    '1': {
        title: 'Chapter 1: Basic Principles of Communism',
        content: 'This chapter introduces the basic theories of communism, including collective ownership, distribution according to need, elimination of classes, and other core ideas. It explores new models of social production relations in the digital age, combining blockchain decentralization and transparency.'
    },
    '2': {
        title: 'Chapter 2: Blockchain Decentralization and Collective Ownership',
        content: 'Blockchain technology achieves data transparency and immutability through decentralized ledgers. This highly aligns with the communist advocacy of collective ownership.'
    },
    '3': {
        title: 'Chapter 3: Smart Contracts and Distribution According to Need',
        content: 'Smart contracts are automated protocols on the blockchain that execute transactions and resource distribution based on preset rules. This provides a technical means to realize "distribution according to need" in communism. Through smart contracts, social members can automatically obtain resource allocation based on actual needs, reducing human intervention and corruption risks. This chapter introduces the basic principles of smart contracts and their application prospects in achieving fair distribution.'
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

    if (!chapter) return <div>Chapter not found</div>

    const isLastChapter = !hasNext

    return (
        <div className="max-w-2xl mx-auto p-4 flex flex-col min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-red-700">{chapter.title}</h1>
            <div className="mb-8 text-lg leading-relaxed">
                <p>{chapter.content}</p>
            </div>

            <div className="flex gap-4 mt-8">
                {hasPrev && (
                    <button
                        className="btn btn-outline"
                        onClick={() => router.push(`/edu/${prevChapterId}`)}
                    >
                        Previous Chapter
                    </button>
                )}
                {hasNext && (
                    <button
                        className="btn btn-error"
                        onClick={() => router.push(`/edu/${nextChapterId}`)}
                    >
                        Next Chapter
                    </button>
                )}
                {isLastChapter && (
                    <Link href={`/nft`} className="btn btn-primary" >
                        Go to NFT Page
                    </Link>
                )}
            </div>
        </div>
    )
}