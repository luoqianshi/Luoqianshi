import ProfileSection from '../components/sections/ProfileSection'
import PortfolioSection from '../components/sections/PortfolioSection'
import AwardsSection from '../components/sections/AwardsSection'

export default function Home() {
  return (
    <div className="max-w-content mx-auto px-6">
      <ProfileSection />
      <PortfolioSection />
      <AwardsSection />
    </div>
  )
}
