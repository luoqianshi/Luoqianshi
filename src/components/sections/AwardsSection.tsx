import { useState } from 'react'
import FadeIn from '../ui/FadeIn'
import SectionTitle from '../ui/SectionTitle'
import awardsData from '../../data/awards.json'
import type { AwardItem } from '../../types'

const awards = awardsData as AwardItem[]

export default function AwardsSection() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section id="awards" className="py-16 border-t border-paper-border">
      <FadeIn>
        <SectionTitle id="awards">获奖情况</SectionTitle>
      </FadeIn>

      {/* 卡片画廊 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {awards.map((award, index) => (
          <FadeIn key={index} delay={index * 100}>
            <figure className="group flex flex-col rounded-xl border border-paper-border bg-paper-card/50 overflow-hidden hover:border-paper-link/40 transition-colors duration-300">
              {/* 证书预览，点击放大查看清晰原图 */}
              <button
                type="button"
                onClick={() => setActive(award.image)}
                className="block w-full text-left bg-paper-card"
                aria-label={`放大查看 ${award.title} 证书`}
              >
                <img
                  src={award.image}
                  alt={`${award.title} 证书`}
                  className="w-full h-48 object-contain p-3 group-hover:scale-[1.02] transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
              </button>

              <figcaption className="px-4 py-3 border-t border-paper-border/60">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-paper-text font-medium">{award.title}</span>
                  <span className="text-xs text-paper-muted flex-shrink-0">
                    {award.category}
                  </span>
                </div>
                <p className="text-paper-muted text-sm mt-0.5">
                  {award.organization}
                </p>
              </figcaption>
            </figure>
          </FadeIn>
        ))}
      </div>

      {/* 证书放大查看（点击图片打开原图，模糊背景遮罩） */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 cursor-zoom-out"
          onClick={() => setActive(null)}
        >
          <img
            src={active}
            alt="证书原图"
            className="max-w-full max-h-full rounded-lg shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
