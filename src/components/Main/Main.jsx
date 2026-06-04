import ReservationStart from './Student/ReservationStart/ReservationStart'
import MyReservation from './Student/MyReservation/MyReservation'
import News from './Student/News/News'
import './Main.css'

const Main = ({ currentSection }) => {
  return (
    <main className="main">
      {currentSection === 'nueva-reserva' && <ReservationStart />}
      {currentSection === 'mis-reservas' && <MyReservation />}
      {currentSection === 'noticias' && <News />}
    </main>
  )
}

export default Main