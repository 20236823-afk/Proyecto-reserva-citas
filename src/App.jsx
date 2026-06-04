import { useState } from 'react'
import Header from './components/Header/Header'
import SideBar from './components/SideBar/SideBar'
import Main from './components/Main/Main'
import './App.css'

const App = () => {
  const [currentSection, setCurrentSection] = useState('nueva-reserva')

  return (
    <div className="app">
      <Header />

      <div className="app-body">
        <SideBar
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />

        <Main currentSection={currentSection} />
      </div>
    </div>
  )
}

export default App