import type { ReactNode } from 'react'

interface SectionTitleProps {
  children: ReactNode
  id?: string
}

export default function SectionTitle({ children, id }: SectionTitleProps) {
  return (
    <h2
      id={id}
      className="font-serif text-2xl font-bold text-paper-text mb-8 scroll-mt-24"
    >
      {children}
    </h2>
  )
}
