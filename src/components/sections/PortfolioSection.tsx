import { useState } from 'react'
import FadeIn from '../ui/FadeIn'
import Lightbox, { type LightboxImage } from '../ui/Lightbox'
import ProgressiveImage from '../ui/ProgressiveImage'
import SectionTitle from '../ui/SectionTitle'
import portfolioData from '../../data/portfolio.json'
import type { PortfolioItem } from '../../types'

const projects = portfolioData as PortfolioItem[]

const featured = projects.filter((p) => p.category === 'featured')
const others = projects.filter((p) => p.category === 'others')
const knowledge = projects.filter((p) => p.category === 'knowledge')

interface CompactSectionProps {
  id: string
  title: string
  subtitle: string
  items: PortfolioItem[]
  onPreview: (project: PortfolioItem) => void
}

/** 紧凑板块：小图表格窗格统一展示截图，下方文字列出名称+简介+链接 */
function CompactSection({ id, title, subtitle, items, onPreview }: CompactSectionProps) {
  return (
    <section id={id} className="py-16 border-t border-paper-border">
      <FadeIn>
        <SectionTitle id={id}>
          {title}
          <span className="text-paper-muted text-lg font-normal ml-2">{subtitle}</span>
        </SectionTitle>
      </FadeIn>

      {/* 截图表格窗格 */}
      <FadeIn delay={100}>
        <div
          className={`grid gap-4 mb-10 ${
            items.length >= 3 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2'
          }`}
        >
          {items.map((project) => (
            <button
              key={project.name}
              type="button"
              onClick={() => onPreview(project)}
              aria-label={`放大查看 ${project.name} 截图`}
              className="group block h-28 md:h-32 rounded-md overflow-hidden border border-paper-border bg-paper-card hover:border-paper-link/40 transition-colors duration-300"
            >
              <ProgressiveImage
                src={project.thumb ?? project.image}
                lqip={project.lqip}
                alt={project.name}
                className="h-full w-full"
                imgClassName="object-cover object-top group-hover:scale-[1.05] transition-transform duration-300"
              />
            </button>
          ))}
        </div>
      </FadeIn>

      {/* 文字列表 */}
      <div className="space-y-6">
        {items.map((project, index) => (
          <FadeIn key={project.name} delay={index * 80}>
            <article className="group">
              <h3 className="font-serif text-lg font-bold text-paper-text mb-1 group-hover:text-paper-link transition-colors">
                {project.name}
              </h3>
              <p className="text-paper-muted text-sm leading-relaxed mb-2">
                {project.description}
              </p>
              <div className="flex gap-4">
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-paper text-sm"
                >
                  Website
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-paper text-sm"
                >
                  GitHub
                </a>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

export default function PortfolioSection() {
  const [active, setActive] = useState<LightboxImage | null>(null)

  const openPreview = (project: PortfolioItem) =>
    setActive({
      path: project.image,
      thumb: project.thumb,
      caption: '',
      label: project.name,
    })

  return (
    <>
      {/* 主打作品 */}
      <section id="portfolio" className="py-16 border-t border-paper-border">
        <FadeIn>
          <SectionTitle id="portfolio">
            Products
            <span className="text-paper-muted text-lg font-normal ml-2">作品集</span>
          </SectionTitle>
        </FadeIn>

        <div className="space-y-8">
          {featured.map((project, index) => (
            <FadeIn key={project.name} delay={index * 100}>
              <article className="group flex flex-col md:flex-row gap-6 p-6 rounded-lg border border-paper-border bg-paper-card/50 hover:border-paper-link/40 transition-colors duration-300">
                {/* 缩略图，点击放大查看 */}
                <div className="flex-shrink-0 w-full md:w-48 h-32 rounded-md overflow-hidden border border-paper-border bg-paper-card">
                  {project.image ? (
                    <button
                      type="button"
                      onClick={() => openPreview(project)}
                      className="block w-full h-full text-left"
                      aria-label={`放大查看 ${project.name} 截图`}
                    >
                      <ProgressiveImage
                        src={project.thumb ?? project.image}
                        lqip={project.lqip}
                        alt={project.name}
                        className="h-full w-full"
                        imgClassName="object-cover group-hover:scale-[1.05] transition-transform duration-300"
                      />
                    </button>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-paper-muted text-sm px-2 text-center">
                      {project.name}
                    </div>
                  )}
                </div>

                {/* 内容 */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-xl font-bold text-paper-text mb-2 group-hover:text-paper-link transition-colors">
                    {project.name}
                  </h3>
                  {project.badge && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5 mb-2">
                      🏆 {project.badge}
                    </span>
                  )}
                  <p className="text-paper-muted text-sm leading-relaxed mb-3">
                    {project.description}
                  </p>
                  <div className="flex gap-4">
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-paper text-sm"
                    >
                      Website
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-paper text-sm"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 其它作品 */}
      <CompactSection
        id="others"
        title="Others"
        subtitle="其它作品"
        items={others}
        onPreview={openPreview}
      />

      {/* 个人知识库 */}
      <CompactSection
        id="knowledge"
        title="Knowledge Base"
        subtitle="个人知识库"
        items={knowledge}
        onPreview={openPreview}
      />

      {/* 图片放大查看：缩略图先占位，原图加载完成后淡入 */}
      {active && (
        <Lightbox
          images={[active]}
          index={0}
          onClose={() => setActive(null)}
          onIndexChange={() => {}}
        />
      )}
    </>
  )
}
