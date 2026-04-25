import { Toaster } from 'sonner'
import AppNav from './components/AppNav'
import Hero from './components/Hero'
import MarqueeBand from './components/MarqueeBand'
import MarqueeBandReverse from './components/MarqueeBandReverse'
import HowItWorks from './components/HowItWorks'
import ConcertsSection from './components/ConcertsSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-obsidian">
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#131313',
            border: '1px solid rgba(201,167,242,0.2)',
            color: '#F5F0E8',
            fontFamily: 'Geist, sans-serif',
          },
        }}
      />
      <AppNav />
      <main>
        <Hero />
        <MarqueeBand />
        <MarqueeBandReverse />
        <HowItWorks />
        <MarqueeBand />
        <MarqueeBandReverse />
        <ConcertsSection />
      </main>
    </div>
  )
}
