import './App.css'
import './../node_modules/leaflet/dist/leaflet.css'

import { Header } from './components/Header'
import { HeaderBanner } from './components/HeaderBanner'
import { Hero } from './components/Hero'
import { Footer } from './components/Footer'
import { Map } from './components/Map'

function App() {
 
  return (
    <div className="App">
      <HeaderBanner />
      <Header />
      <Hero />
      <Map/>
      <Footer />
    </div>
  )
}

export default App
