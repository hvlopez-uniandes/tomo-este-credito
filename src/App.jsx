import { useState } from 'react'
import './App.css'

const fmt = (n) => n.toLocaleString('es-CO')

function computeResult({ monto, cuota, plazo, ingreso }) {
  const total = cuota * plazo
  const extra = Math.max(0, total - monto)
  const dias = ingreso > 0 ? Math.round((extra / ingreso) * 30) : 0
  const ratio = ingreso > 0 ? cuota / ingreso : 1
  const totalAPagar = monto + extra
  const cuotaSegura = Math.round(ingreso * 0.3)
  const plazoSugerido = cuotaSegura > 0 ? Math.ceil(totalAPagar / cuotaSegura) : plazo

  let note, verdict, verdictClass
  let showAlt = false
  let altText = ''

  if (ratio > 0.4) {
    note = 'Esa cuota come más del 40% de lo que ganas. Un "sí" aquí te aprieta.'
    verdict = '✗ No te conviene así'
    verdictClass = 'bad'
    showAlt = plazoSugerido > plazo
    altText = `Con el mismo crédito, pagando en ${plazoSugerido} meses en vez de ${plazo}, tu cuota bajaría a aproximadamente $${fmt(cuotaSegura)} — una carga que tu ingreso sí soporta.`
  } else if (ratio > 0.35) {
    note = 'Podrías tomarlo, pero alargar el plazo te dejaría más aire.'
    verdict = '↔ Ajusta el plazo'
    verdictClass = 'mid'
    showAlt = plazoSugerido > plazo
    altText = `Si lo llevas a ${plazoSugerido} meses, la cuota baja a cerca de $${fmt(cuotaSegura)} al mes — más holgado con lo que ganas hoy.`
  } else if (extra > monto * 0.3) {
    note = 'Pagas bastante de más. Vale la pena comparar o esperar un mes bueno.'
    verdict = '↔ Ajusta el plazo'
    verdictClass = 'mid'
  } else {
    note = 'El sobrecosto es moderado — pero ahora lo ves en tu idioma, no en letra pequeña.'
    verdict = '✓ Te conviene'
    verdictClass = 'good'
  }

  return { extra, dias, note, verdict, verdictClass, showAlt, altText }
}

export default function App() {
  const [form, setForm] = useState({ monto: '', cuota: '', plazo: '', ingreso: '' })
  const [result, setResult] = useState(null)

  const handleChange = (e) => {
    const { id, value } = e.target
    setForm((f) => ({ ...f, [id]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const values = {
      monto: +form.monto,
      cuota: +form.cuota,
      plazo: +form.plazo,
      ingreso: +form.ingreso,
    }
    setResult(computeResult(values))
  }

  const handleRegister = () => {
    alert('¡Gracias! Te avisaremos cuando la herramienta esté disponible.')
  }

  return (
    <div className="phone">
      <div className="status"><span>9:41</span><span>●●●</span></div>
      <span className="variant-pill">Prototipo de producto · flujo completo</span>
      <div className="brand"><div className="brand-icon">D</div> Duolingo <span>· Finanzas</span></div>

      {!result && (
        <div id="hero">
          <h1>Descubre cuánto te cuesta <span className="hl">de más</span> ese crédito</h1>
          <p className="sub">En pesos y en días de trabajo — no en porcentajes que nadie entiende.</p>
        </div>
      )}

      <p className="scope">Para créditos de inversión en tu negocio o compra de herramientas de trabajo. No para emergencias.</p>

      {!result && (
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="monto">¿Cuánto te prestan? (COP)</label>
          <input type="number" id="monto" placeholder="Ej: 2.000.000" value={form.monto} onChange={handleChange} required />

          <label htmlFor="cuota">¿Cuánto pagas al mes? (COP)</label>
          <input type="number" id="cuota" placeholder="Ej: 350.000" value={form.cuota} onChange={handleChange} required />

          <label htmlFor="plazo">¿En cuántos meses?</label>
          <input type="number" id="plazo" placeholder="Ej: 12" value={form.plazo} onChange={handleChange} required />

          <label htmlFor="ingreso">¿Cuánto ganas al mes, más o menos? (COP)</label>
          <input type="number" id="ingreso" placeholder="Ej: 1.800.000" value={form.ingreso} onChange={handleChange} required />
          <div className="hint">Si tu ingreso varía, pon un promedio de los últimos meses.</div>

          <button type="submit" className="cta">Quiero ver mi costo real →</button>
        </form>
      )}

      {result && (
        <div className="result show">
          <h1 style={{ fontSize: 22, marginBottom: 14 }}>Tu costo real</h1>
          <div className="result-card">
            <p className="rc-label">Pagarías de más aproximadamente:</p>
            <p className="rc-big">+${fmt(result.extra)}</p>
            <p className="rc-days">≈ {result.dias} días de trabajo</p>
            <p className="rc-note">{result.note}</p>
          </div>
          <div className="result-card secondary">
            <p className="rc-label">Veredicto</p>
            <p className={`rc-verdict ${result.verdictClass}`}>{result.verdict}</p>
          </div>
          {result.showAlt && (
            <div className="result-card alt show">
              <p className="rc-alt-title">Una salida, no solo un "no"</p>
              <p className="rc-alt-body">{result.altText}</p>
            </div>
          )}
          <button type="button" className="cta" onClick={handleRegister}>Avísame cuando esté listo →</button>
          <button type="button" className="cta secondary" onClick={() => setResult(null)}>Probar otro crédito</button>
        </div>
      )}

      <p className="trust">Tus datos no se comparten ni se reportan a bancos.</p>
    </div>
  )
}
