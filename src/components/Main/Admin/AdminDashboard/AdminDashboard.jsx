import { useState, useEffect } from 'react'
import ReservationsList from '../ReservationsList/ReservationsList'
import './AdminDashboard.css'

const AdminDashboard = () => {
    
    const [metrics, setMetrics] = useState({ total: 0, aceptadas: 0, pendientes: 0 })

    
    useEffect(() => {
        const stored = localStorage.getItem("reservas")
        if (stored) {
            const datos = JSON.parse(stored)
            setMetrics({
                total: datos.length,
                aceptadas: datos.filter(r => r.estado === 'Aceptada').length,
                pendientes: datos.filter(r => r.estado === 'Pendiente').length
            })
        } else {
          
            setMetrics({ total: 3, aceptadas: 1, pendientes: 2 })
        }
    }, [])

    return (
        <div className="dashboard-wrapper">
            <h2>Panel de Control General (Administrador)</h2>

            
            <div className="metrics-row">
                <div className="metric-card">
                    <h4>Solicitudes Totales</h4>
                    <p className="metric-number total">{metrics.total}</p>
                </div>
                <div className="metric-card">
                    <h4>Citas Aceptadas</h4>
                    <p className="metric-number accepted">{metrics.aceptadas}</p>
                </div>
                <div className="metric-card">
                    <h4>Citas Pendientes</h4>
                    <p className="metric-number pending">{metrics.pendientes}</p>
                </div>
            </div>

            
            <ReservationsList onUpdateMetrics={setMetrics} />
        </div>
    )
}

export default AdminDashboard