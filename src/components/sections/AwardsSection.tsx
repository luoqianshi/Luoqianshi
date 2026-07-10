import FadeIn from '../ui/FadeIn'
import SectionTitle from '../ui/SectionTitle'
import awardsData from '../../data/awards.json'
import type { AwardItem } from '../../types'

const awards = awardsData as AwardItem[]

export default function AwardsSection() {
  return (
    <section id="awards" className="py-16 border-t border-paper-border">
      <FadeIn>
        <SectionTitle id="awards">获奖情况</SectionTitle>
      </FadeIn>

      <div className="space-y-4">
        {awards.map((award, index) => (
          <FadeIn key={index} delay={index * 80}>
            <div className="flex items-baseline justify-between py-3 border-b border-paper-border/60 last:border-b-0">
              <div>
                <span className="text-paper-text font-medium">{award.title}</span>
                <span className="text-paper-muted text-sm ml-3">
                  — {award.organization}
                </span>
              </div>
              <span className="text-xs text-paper-muted flex-shrink-0 ml-4">
                {award.category}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
