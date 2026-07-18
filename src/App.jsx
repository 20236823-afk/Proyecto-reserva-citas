import { useState } from 'react'
import Login from './components/Login/Login'
import Header from './components/Header/Header'
import SideBar from './components/SideBar/SideBar'
import AdminSideBar from './components/SideBar/AdminSideBar'
import Main from './components/Main/Main'
import AdminDashboard from './components/Main/Admin/AdminDashboard/AdminDashboard'
import ManageReservations from './components/Main/Admin/ManageReservations/ManageReservations'
import ManageServices from './components/Main/Admin/ManageServices/ManageServices'
import ManageNews from './components/Main/Admin/ManageNews/ManageNews'
import ManageSchedules from './components/Main/Admin/ManageSchedules/ManageSchedules'
import './App.css'

const App = () => {
  const [usuario, setUsuario] = useState(null)
  const [currentSection, setCurrentSection] = useState('nueva-reserva')

  const manejarLogin = (usuarioIngresado) => {
    setUsuario(usuarioIngresado)

    setCurrentSection(
      usuarioIngresado.rol === 'admin'
        ? 'admin-dashboard'
        : 'nueva-reserva'
    )
  }

  const cerrarSesion = () => {
    setUsuario(null)
    setCurrentSection('nueva-reserva')
  }

  if (!usuario) {
    return <Login onLogin={manejarLogin} />
  }

  const esAdmin = usuario.rol === 'admin'

  return (
    <div className="app">
      <Header
        usuario={usuario}
        cerrarSesion={cerrarSesion}
      />

      <div className="app-body">
        {esAdmin ? (
          <>
            <AdminSideBar
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
            />

            <main className="main">
              {currentSection === 'admin-dashboard' && (
                <AdminDashboard />
              )}

              {currentSection === 'admin-reservas' && (
                <ManageReservations />
              )}

              {currentSection === 'admin-servicios' && (
                <ManageServices />
              )}

              {currentSection === 'admin-noticias' && (
                <ManageNews />
              )}

              {currentSection === 'admin-horarios' && (
                <ManageSchedules />
              )}
            </main>
          </>
        ) : (
          <>
            <SideBar
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
            />

            <Main
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
              usuario={usuario}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default App