import '../styles/diwali.css'
import { useDocumentTitle } from '../hooks.js'
import Hero from '../components/diwali/Hero.jsx'
import { Bar, Facts, Host, Program, Details, Footer } from '../components/diwali/Sections.jsx'
import Pass from '../components/diwali/Pass.jsx'

export default function DiwaliBash() {
  useDocumentTitle("Diwali Bash '26 · frekvncy")
  return (
    <div className="page-diwali">
      <Bar />
      <Hero />
      <Facts />
      <Host />
      <Program />
      <Details />
      <Pass />
      <Footer />
    </div>
  )
}
