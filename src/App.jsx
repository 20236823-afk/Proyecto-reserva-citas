import Header from './components/Header/Header'
import SideBar from './components/SideBar/SideBar'
import Main from './components/Main/Main'
import './App.css'

const App = () => {
  return (
    <div className="app">
      <Header />

      <div className="app-body">
        <SideBar />
        <Main />
      </div>
    </div>
  )
}

export default App