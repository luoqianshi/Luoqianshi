import { Link } from 'react-router-dom'
import FadeIn from '../components/ui/FadeIn'

interface PlaceholderPageProps {
  title: string
  description: string
  icon: string
}

export default function PlaceholderPage({ title, description, icon }: PlaceholderPageProps) {
  return (
    <div className="max-w-content mx-auto px-6 min-h-[60vh] flex items-center justify-center">
      <FadeIn>
        <div className="text-center">
          <div className="text-5xl mb-6 text-paper-border">{icon}</div>
          <h1 className="font-serif text-3xl font-bold text-paper-text mb-3">
            {title}
          </h1>
          <p className="text-paper-muted max-w-md mx-auto mb-8 leading-relaxed">
            {description}
          </p>
          <Link
            to="/"
            className="link-paper text-sm"
          >
            ← 返回首页
          </Link>
        </div>
      </FadeIn>
    </div>
  )
}
