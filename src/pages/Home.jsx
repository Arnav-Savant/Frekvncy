import '../styles/home.css'
import { useDocumentTitle, useReveal } from '../hooks.js'
import Hero, { Nav } from '../components/home/Hero.jsx'
import { Ticker, About, Founder, Footer } from '../components/home/Sections.jsx'
import Repertoire from '../components/home/Repertoire.jsx'
import Events from '../components/home/Events.jsx'
import Code from '../components/home/Code.jsx'
import Join from '../components/home/Join.jsx'

export default function Home() {
  useDocumentTitle('frekvncy · Find your frequency')
  const ref = useReveal()
  return (
    <div className="page-home" ref={ref}>
      <Nav />
      <Hero />
      <Ticker />
      <About />
      <Repertoire />
      <Events />
      <Founder />
      <Code />
      <Join />
      <Footer />
    </div>
  )
}
