'use client'
import { useParams } from 'next/navigation'

const sectionContent: Record<string, Record<string, { title: string; content: string }>> = {
  '1': {
    '1': { title: '1.1 集体所有制', content: '集体所有制是共产主义的核心...' },
    '2': { title: '1.2 按需分配', content: '按需分配强调资源根据需求分配...' }
  },
  // 更多章节和小节
}

export default function SectionPage() {
  const params = useParams()
  const chapterId = params.chapter as string
  const sectionId = params.section as string
  const section = sectionContent[chapterId]?.[sectionId]

  if (!section) return <div>小节不存在</div>

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">{section.title}</h1>
      <div className="mb-8 text-lg leading-relaxed">
        <p>{section.content}</p>
      </div>
    </div>
  )
}