import FadeIn from '../ui/FadeIn'
import profileData from '../../data/profile.json'
import type { ProfileData } from '../../types'

const profile = profileData as ProfileData

export default function ProfileSection() {
  return (
    <section id="profile" className="scroll-mt-24 pt-32 pb-16">
      <FadeIn>
        <p className="text-paper-muted text-sm mb-2 tracking-wide">你好，我是</p>
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-paper-text mb-3">
          {profile.name.zh}
          <span className="text-paper-muted text-2xl font-normal ml-3">
            {profile.name.en}
          </span>
        </h1>
        <p className="text-lg text-paper-muted mb-1">
          网名：{profile.alias.zh}（{profile.alias.en}）
        </p>
        <p className="text-lg text-paper-text font-medium mb-6">
          {profile.identity}
        </p>
        <p className="text-paper-muted max-w-prose mb-8 leading-relaxed">
          {profile.bio}
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {Object.values(profile.links).map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-paper text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>
      </FadeIn>
    </section>
  )
}
