import { useState } from 'react'
import FadeIn from '../ui/FadeIn'
import SectionTitle from '../ui/SectionTitle'
import portfolioData from '../../data/portfolio.json'
import type { PortfolioItem } from '../../types'

const projects = portfolioData as PortfolioItem[]

export default function PortfolioSection() {
  const [active, setActive] = useState<string | null>(null)
  return (
    <section id="portfolio" className="py-16 border-t border-paper-border">
      <FadeIn>
        <SectionTitle id="portfolio">
          Products
          <span className="text-paper-muted text-lg font-normal ml-2">作品集</span>
        </SectionTitle>
      </FadeIn>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <FadeIn key={project.name} delay={index * 100}>
            <article className="group flex flex-col md:flex-row gap-6 p-6 rounded-lg border border-paper-border bg-paper-card/50 hover:border-paper-link/40 transition-colors duration-300">
              {/* 缩略图，点击放大查看 */}
              <div className="flex-shrink-0 w-full md:w-48 h-32 rounded-md overflow-hidden border border-paper-border bg-paper-card">
                {project.image ? (
                  <button
                    type="button"
                    onClick={() => setActive(project.image!)}
                    className="block w-full h-full text-left"
                    aria-label={`放大查看 ${project.name} 截图`}
                  >
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
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

      {/* 图片放大查看（点击截图打开原图，模糊背景遮罩） */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 cursor-zoom-out"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="关闭预览"
            className="absolute top-4 right-4 z-[60] flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-paper-text text-2xl leading-none shadow-lg hover:bg-white transition-colors"
          >
            &times;
          </button>
          <img
            src={active}
            alt="作品截图"
            className="max-w-full max-h-full rounded-lg shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
