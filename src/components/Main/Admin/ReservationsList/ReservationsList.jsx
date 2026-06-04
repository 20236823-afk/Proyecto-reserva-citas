import { useState, useRef, useEffect } from 'react'
import './ReservationsList.css'

const ReservationsList = () => {
    
    const storedReservas = localStorage.getItem("reservas")
    const [reservas, setReservas] = useState(JSON.parse(storedReservas) || [
        { id: 1, alumno: 'Juan Pérez', codigo: '20230102', servicio: 'Ambientes deportivos', fecha: '04/06/2026', estado: 'Pendiente' },
        { id: 2, alumno: 'Maria Gomez', codigo: '20221456', servicio: 'Reserva de ambientes técnicos (SERCOM)', fecha: '04/06/2026', estado: 'Aceptada' },
        { id: 3, alumno: 'Carlos Vega', codigo: '20240987', servicio: 'Reserva de Laboratorios', fecha: '05/06/2026', estado: 'Pendiente' },
        { id: 4, alumno: 'Ana Loli', codigo: '20210432', servicio: 'Préstamo de equipos (SERCOM)', fecha: '05/06/2026', estado: 'Cancelada' },
        { id: 5, alumno: 'Luis Mendoza', codigo: '20231122', servicio: 'Reserva de cubículos', fecha: '06/06/2026', estado: 'Pendiente' }
    ])

    const [filtroActual, setFiltroActual] = useState('Todos')
    const [busqueda, setBusqueda] = useState('')
    const [ultimoEliminado, setUltimoEliminado] = useState(null)
    const [mostrarUndo, setMostrarUndo] = useState(false)
    const timeoutRef = useRef(null)

    
    const [metricas, setMetricas] = useState({ total: 0, aceptadas: 0, pendientes: 0 })

  
    useEffect(() => {
        setMetricas({
            total: reservas.length,
            aceptadas: reservas.filter(r => r.estado === 'Aceptada').length,
            pendientes: reservas.filter(r => r.estado === 'Pendiente').length
        })
    }, [reservas])

    const cambiarEstadoCita = (reservationId, nuevoEstado) => {
        const updatedReservas = reservas.map(reserva => 
            reserva.id === reservationId ? { ...reserva, estado: nuevoEstado } : reserva
        )
        localStorage.setItem("reservas", JSON.stringify(updatedReservas))
        setReservas(updatedReservas)
    }

    const deleteReservation = (reservationId) => {
        const personaABorrar = reservas.find(reserva => reserva.id === reservationId)
        setUltimoEliminado(personaABorrar)
        setMostrarUndo(true)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setMostrarUndo(false), 10000)

        const updatedReservas = reservas.filter(reserva => reserva.id !== reservationId)
        localStorage.setItem("reservas", JSON.stringify(updatedReservas))
        setReservas(updatedReservas)
    }

    const deshacerEliminacion = () => {
        if (ultimoEliminado) {
            const listaRestaurada = [...reservas, ultimoEliminado].sort((a, b) => a.id - b.id)
            localStorage.setItem("reservas", JSON.stringify(listaRestaurada))
            setReservas(listaRestaurada)
            setMostrarUndo(false)
        }
    }

    const reservasFiltradas = reservas.filter((cita) => {
        const cumpleFiltroEstado = filtroActual === 'Todos' || cita.estado === filtroActual;
        const cumpleBuscador = cita.alumno.toLowerCase().includes(busqueda.toLowerCase()) || cita.codigo.includes(busqueda);
        return cumpleFiltroEstado && cumpleBuscador;
    })

    return (
        <div className="reservations-container" style={{ position: 'relative' }}>
            
         
            <div className="stats-container">
                <div className="stat-card"><h4>TOTAL RESERVAS</h4><p className="stat-number">{metricas.total}</p></div>
                <div className="stat-card"><h4>ACEPTADAS</h4><p className="stat-number" style={{color: '#16a34a'}}>{metricas.aceptadas}</p></div>
                <div className="stat-card"><h4>PENDIENTES</h4><p className="stat-number" style={{color: '#ea580c'}}>{metricas.pendientes}</p></div>
            </div>

            <h3>PANEL DE CONTROL DE RESERVAS</h3>

            <div className="toolbar-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '15px', flexWrap: 'wrap' }}>
                <div className="filter-container">
                    {['Todos', 'Pendiente', 'Aceptada', 'Cancelada'].map((tipo) => (
                        <button key={tipo} onClick={() => setFiltroActual(tipo)} className={`filter-btn ${filtroActual === tipo ? 'active' : ''}`}>{tipo}</button>
                    ))}
                </div>
                <input type="text" placeholder="Buscar..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="search-input"/>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>Alumno</th><th>Código</th><th>Servicio Solicitado</th><th>Fecha</th><th>Estado</th><th>Acciones del Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {reservasFiltradas.length > 0 ? (
                        reservasFiltradas.map((cita) => (
                            <tr key={cita.id}>
                                <td>{cita.alumno}</td>
                                <td>{cita.codigo}</td>
                                <td>{cita.servicio}</td>
                                <td>{cita.fecha}</td>
                                <td><span className={`status-badge ${cita.estado.toLowerCase()}`}>{cita.estado}</span></td>
                                <td>
                                    {cita.estado === 'Pendiente' && (
                                        <>
                                            <button onClick={() => cambiarEstadoCita(cita.id, 'Aceptada')} className="btn-action-accept">Aceptar</button>
                                            <button onClick={() => cambiarEstadoCita(cita.id, 'Cancelada')} className="btn-action-cancel">Cancelar</button>
                                        </>
                                    )}
                                    <button onClick={() => deleteReservation(cita.id)} className="btn-action-delete">Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No hay reservas.</td></tr>
                    )}
                </tbody>
            </table>

            {mostrarUndo && (
                <div className="undo-toast">
                    <span>Reserva de <strong>{ultimoEliminado?.alumno}</strong> eliminada.</span>
                    <button onClick={deshacerEliminacion} className="undo-btn">Deshacer(10seg)</button>
                </div>
            )}
        </div>
    )
}

export default ReservationsList