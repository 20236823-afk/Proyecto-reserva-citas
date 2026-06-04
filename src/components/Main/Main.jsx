import { useState } from 'react'

import ReservationStart from './Student/ReservationStart/ReservationStart'
import GeneralInfo from './Student/GeneralInfo/GeneralInfo'
import ScheduleSelector from './Student/ScheduleSelector/ScheduleSelector'
import Participants from './Student/Participants/Participants'
import ReservationSummary from './Student/ReservationSummary/ReservationSummary'

import './Main.css'

const Main = () => {
  const [paso, setPaso] = useState(1)

  return (
    <main className="main">

      {paso === 1 && (
        <ReservationStart
          siguientePaso={() => setPaso(2)}
        />
      )}

      {paso === 2 && (
        <GeneralInfo
          volverPaso={() => setPaso(1)}
          siguientePaso={() => setPaso(3)}
        />
      )}

      {paso === 3 && (
         <ScheduleSelector
          volverPaso={() => setPaso(2)}
          siguientePaso={() => setPaso(4)}
        />
      )}

      {paso === 4 && (
        <Participants
          volverPaso={() => setPaso(3)}
          siguientePaso={() => setPaso(5)}
        />
      )}

      {paso === 5 && (
        <ReservationSummary
        volverPaso={() => setPaso(4)}
        />
      )}

    </main>
  )
}

export default Main