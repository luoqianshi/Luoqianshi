import { useMemo, useState } from 'react'
import FadeIn from '../components/ui/FadeIn'
import Lightbox, { type LightboxImage } from '../components/ui/Lightbox'
import ProgressiveImage from '../components/ui/ProgressiveImage'
import SectionTitle from '../components/ui/SectionTitle'
import gloriesData from '../data/glories.json'
import type { GloryData } from '../types'

const data = gloriesData as GloryData

const LEVEL_ORDER = [
  '国家级',
  '省级',
  '市级',
  '校级',
  '院级',
  '国际会议',
  '软件著作权',
  '任职证明',
  '集体',
  '社区',
]

export default function Awards() {
  const [filter, setFilter] = useState<string>('全部')
  const [active, setActive] = useState<number | null>(null)

  const visibleItems = useMemo(
    () => (filter === '全部' ? data.items : data.items.filter((i) => i.categoryZh === filter)),
    [filter]
  )

  /** 扁平化后的图集，供灯箱左右切换；indexById 用于定位卡片图片在图集中的位置 */
  const { gallery, indexById } = useMemo(() => {
    const list: LightboxImage[] = []
    const map = new Map<string, number>()
    visibleItems.forEach((item) =>
      item.images.forEach((img, i) => {
        map.set(`${item.id}#${i}`, list.length)
        list.push({
          path: img.path,
          thumb: img.thumb,
          caption: img.caption,
          label: `${item.id} · ${item.title}`,
        })
      })
    )
    return { gallery: list, indexById: map }
  }, [visibleItems])

  const groups = useMemo(
    () =>
      data.categories
        .map((category) => ({
          ...category,
          items: visibleItems.filter((item) => item.categoryZh === category.zh),
        }))
        .filter((group) => group.items.length > 0),
    [visibleItems]
  )

  const levelCounts = useMemo(() => {
    const counts = new Map<string, number>()
    data.items.forEach((item) => counts.set(item.level, (counts.get(item.level) ?? 0) + 1))
    return LEVEL_ORDER.filter((level) => counts.has(level)).map((level) => ({
      level,
      count: counts.get(level)!,
    }))
  }, [])

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>()
    data.items.forEach((item) =>
      counts.set(item.categoryZh, (counts.get(item.categoryZh) ?? 0) + 1)
    )
    return counts
  }, [])

  const filters = ['全部', ...data.categories.map((c) => c.zh)]

  return (
    <div className="max-w-content mx-auto px-6">
      <header className="scroll-mt-24 pt-32 pb-10">
        <FadeIn>
          <p className="text-xs tracking-[0.22em] uppercase text-paper-muted mb-3">
            Honors &amp; Awards
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-paper-text text-balance">
            校园奖励与荣誉
          </h1>
          <p className="mt-4 text-paper-muted leading-relaxed">
            {data.summary.schools} 期间的奖学金、荣誉称号、学科竞赛、科研成果、学生干部任职与集体荣誉，
            共 {data.summary.total} 项支撑材料 · 时间跨度 {data.summary.period}。
            点击任意证书可放大查看原图。
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {levelCounts.map(({ level, count }) => (
              <span
                key={level}
                className={`lv ${data.items.find((i) => i.level === level)?.levelClass ?? 'lv-col'}`}
              >
                {level} {count}
              </span>
            ))}
          </div>
        </FadeIn>
      </header>

      {/* 分类筛选 */}
      <FadeIn delay={80} className="sticky top-[60px] z-30">
        <div className="-mx-6 px-6 py-3 bg-paper-bg/85 backdrop-blur-md border-y border-paper-border flex flex-wrap gap-2">
          {filters.map((name) => {
            const isActive = filter === name
            return (
              <button
                key={name}
                type="button"
                onClick={() => {
                  setFilter(name)
                  setActive(null)
                }}
                className={`text-xs px-3 py-1 rounded-full border transition-colors duration-200 ${
                  isActive
                    ? 'border-paper-link bg-paper-link text-white'
                    : 'border-paper-border bg-paper-card/60 text-paper-muted hover:text-paper-text hover:border-paper-link/40'
                }`}
              >
                {name}
                <span className={isActive ? 'text-white/70 ml-1' : 'text-paper-muted/70 ml-1'}>
                  {name === '全部' ? data.items.length : categoryCounts.get(name) ?? 0}
                </span>
              </button>
            )
          })}
        </div>
      </FadeIn>

      {groups.map((group) => (
        <section key={group.zh} id={group.en.toLowerCase().replace(/\W+/g, '-')} className="py-12">
          <FadeIn>
            <SectionTitle>
              {group.zh}
              <span className="text-paper-muted text-sm font-normal ml-2 tracking-wide">
                {group.en}
              </span>
            </SectionTitle>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {group.items.map((item, itemIndex) => (
              <FadeIn key={item.id} delay={itemIndex * 60}>
                <figure className="group flex h-full flex-col rounded-xl border border-paper-border bg-paper-card/50 overflow-hidden hover:border-paper-link/40 transition-colors duration-300">
                  <div
                    className={`grid gap-px bg-paper-border/60 ${
                      item.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
                    }`}
                  >
                    {item.images.map((img, i) => (
                      <button
                        key={img.file}
                        type="button"
                        onClick={() => setActive(indexById.get(`${item.id}#${i}`) ?? 0)}
                        aria-label={`放大查看 ${item.title} 证书`}
                        className="block bg-paper-card overflow-hidden"
                      >
                        <ProgressiveImage
                          src={img.thumb}
                          lqip={img.lqip}
                          alt={`${item.title} 证书`}
                          guard
                          className="h-44 w-full"
                          imgClassName="object-contain p-3 group-hover:scale-[1.02] transition-transform duration-300"
                        />
                      </button>
                    ))}
                  </div>

                  <figcaption className="flex-1 px-4 py-3 border-t border-paper-border/60">
                    <div className="flex items-start gap-2">
                      <span className="font-serif text-xs text-paper-muted pt-0.5 flex-none">
                        {item.id}
                      </span>
                      <h3 className="flex-1 text-sm font-medium text-paper-text leading-snug">
                        {item.title}
                      </h3>
                      <span className={`lv ${item.levelClass} flex-none`}>{item.level}</span>
                    </div>
                    <p className="text-paper-muted text-xs mt-1.5 leading-relaxed">
                      {item.org}
                      {item.date && <span className="text-paper-muted/80"> · {item.date}</span>}
                    </p>
                    {item.images.some((img) => img.caption) && (
                      <ul className="mt-2 space-y-0.5">
                        {item.images
                          .filter((img) => img.caption)
                          .map((img) => (
                            <li
                              key={img.file}
                              className="text-[11px] text-paper-muted/85 leading-relaxed"
                            >
                              {img.caption}
                            </li>
                          ))}
                      </ul>
                    )}
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </section>
      ))}

      <p className="pb-16 text-xs text-paper-muted/80 border-t border-paper-border pt-6 leading-relaxed">
        材料整理口径：分类 — 等级 — 时间；证书图片源自《{data.source.replace(/\.html$/, '')}》。
        <br />
        证书为个人私密材料，已转为 WebP 渐进式加载（列表用缩略图、放大时才取原图），并禁用右键另存与拖拽下载、放大视图叠加水印；
        如需核验原件，欢迎直接与我联系。
      </p>

      {active !== null && (
        <Lightbox
          images={gallery}
          index={active}
          secure
          onClose={() => setActive(null)}
          onIndexChange={setActive}
        />
      )}
    </div>
  )
}
