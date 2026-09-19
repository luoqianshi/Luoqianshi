import { Link } from 'react-router-dom'
import FadeIn from '../ui/FadeIn'
import gloriesData from '../../data/glories.json'
import type { GloryData } from '../../types'

const data = gloriesData as GloryData

const campus = data.items.filter((item) => item.categoryZh !== '社区与其他荣誉')
const levelCounts = ['国家级', '省级', '市级', '校级', '院级']
  .map((level) => ({ level, count: campus.filter((i) => i.level === level).length }))
  .filter((entry) => entry.count > 0)

const sparks = [
  { top: '18%', left: '38%', delay: '0s' },
  { top: '62%', left: '52%', delay: '0.4s' },
  { top: '30%', left: '70%', delay: '0.8s' },
]

/** 首页底部的 Awards 入口：奖牌轻晃、星光闪烁、纸面反光 */
export default function AwardsCta() {
  return (
    <section className="py-16 border-t border-paper-border">
      <FadeIn>
        <Link
          to="/awards"
          aria-label="查看我的校园奖励与荣誉"
          className="awards-cta group relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-paper-border bg-paper-card/60 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 hover:border-paper-link/40"
        >
          <span aria-hidden="true" className="cta-shine" />
          {sparks.map((spark) => (
            <span
              key={`${spark.top}-${spark.left}`}
              aria-hidden="true"
              className="cta-spark"
              style={{ top: spark.top, left: spark.left, animationDelay: spark.delay }}
            >
              ✨
            </span>
          ))}

          <span className="relative z-10 block">
            <span className="mb-2 block text-xs tracking-[0.22em] uppercase text-paper-muted">
              Honors &amp; Awards
            </span>
            <span className="block font-serif text-xl font-bold text-paper-text transition-colors group-hover:text-paper-link md:text-2xl">
              想看看我拿过哪些奖吗？
            </span>
            <span className="mt-2 block text-sm leading-relaxed text-paper-muted">
              {campus.length} 项校园奖励与荣誉支撑材料 · {levelCounts.map((l) => `${l.level} ${l.count}`).join(' · ')}
            </span>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-paper-link">
              翻开证书墙
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </span>
          </span>

          <span className="cta-medal relative z-10 flex h-16 w-16 flex-none items-center justify-center rounded-full border border-paper-border bg-paper-bg text-3xl shadow-sm">
            🏅
          </span>
        </Link>
      </FadeIn>
    </section>
  )
}
