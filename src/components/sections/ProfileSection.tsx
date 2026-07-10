import FadeIn from '../ui/FadeIn'
import profileData from '../../data/profile.json'
import type { ProfileData } from '../../types'

const profile = profileData as ProfileData

export default function ProfileSection() {
  return (
    <section id="profile" className="scroll-mt-24 pt-32 pb-16">
      <FadeIn>
        <div className="flex flex-col-reverse sm:flex-row sm:items-start gap-8">
          {/* 文字信息（左侧） */}
          <div className="flex-1 min-w-0">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-paper-text mb-1">
              {profile.name.en}
              <span className="text-paper-muted text-xl font-normal md:text-2xl ml-3">
                {profile.name.zh}
              </span>
            </h1>
            <p className="text-base mb-3">
              <span className="text-paper-text font-medium">{profile.alias.en}</span>
              <span className="text-paper-muted ml-2">{profile.alias.zh}</span>
            </p>
            <p className="text-lg text-paper-text font-medium mb-4">
              {profile.identity}
            </p>
            <p className="text-paper-muted max-w-prose mb-6 leading-relaxed">
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
          </div>

          {/* 个人照片（右侧，较大圆角矩形展示整张照片） */}
          <div className="flex-shrink-0">
            <img
              src="./assets/imgs/me.jpg"
              alt={`${profile.name.zh} 的个人照片`}
              className="w-40 h-52 sm:w-44 sm:h-60 rounded-2xl object-cover border border-paper-border grayscale-[10%] hover:grayscale-0 transition-all duration-500 shadow-sm"
            />
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
