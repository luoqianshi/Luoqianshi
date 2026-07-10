import FadeIn from '../ui/FadeIn'
import SectionTitle from '../ui/SectionTitle'
import portfolioData from '../../data/portfolio.json'
import type { PortfolioItem } from '../../types'

const projects = portfolioData as PortfolioItem[]

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-16 border-t border-paper-border">
      <FadeIn>
        <SectionTitle id="portfolio">作品集</SectionTitle>
      </FadeIn>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <FadeIn key={project.name} delay={index * 100}>
            <article className="group flex flex-col md:flex-row gap-6 p-6 rounded-lg border border-paper-border bg-paper-card/50 hover:border-paper-link/40 transition-colors duration-300">
              {/* 缩略图 */}
              <div className="flex-shrink-0 w-full md:w-48 h-32 rounded-md overflow-hidden border border-paper-border bg-paper-card">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-paper-muted text-sm">${project.name}</div>`
                  }}
                />
              </div>

              {/* 内容 */}
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-xl font-bold text-paper-text mb-2 group-hover:text-paper-link transition-colors">
                  {project.name}
                </h3>
                <p className="text-paper-muted text-sm leading-relaxed mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded border border-paper-border text-paper-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
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
  )
}
