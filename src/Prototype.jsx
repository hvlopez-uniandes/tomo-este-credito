import { useEffect, useState } from 'react'
import './App.css'

const fmt = (n) => n.toLocaleString('es-CO')

const QUESTIONS = [
  { key: 'monto', label: '¿Cuánto te prestan?', placeholder: 'Ej: 2.000.000', hint: null },
  { key: 'cuota', label: '¿Cuánto pagas al mes?', placeholder: 'Ej: 350.000', hint: null },
  { key: 'plazo', label: '¿En cuántos meses?', placeholder: 'Ej: 12', hint: null },
  {
    key: 'ingreso',
    label: '¿Cuánto ganas al mes, más o menos?',
    placeholder: 'Ej: 1.800.000',
    hint: 'Si tu ingreso varía, pon un promedio de los últimos meses.',
  },
]

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

function TopBar({ onBack, progress }) {
  return (
    <div className="topbar">
      <button type="button" className="back-btn" onClick={onBack} aria-label="Atrás">←</button>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}

export default function Prototype() {
  const [step, setStep] = useState('landing') // landing | q:<index> | loading | result | email | done
  const [form, setForm] = useState({ monto: '', cuota: '', plazo: '', ingreso: '' })
  const [result, setResult] = useState(null)
  const [email, setEmail] = useState('')

  const qIndex = step.startsWith('q') ? Number(step.split(':')[1]) : -1

  useEffect(() => {
    if (step !== 'loading') return
    const t = setTimeout(() => {
      setResult(computeResult({
        monto: +form.monto,
        cuota: +form.cuota,
        plazo: +form.plazo,
        ingreso: +form.ingreso,
      }))
      setStep('result')
    }, 900)
    return () => clearTimeout(t)
  }, [step, form])

  const goToQuestion = (i) => setStep(`q:${i}`)

  const handleAnswerSubmit = (e) => {
    e.preventDefault()
    if (qIndex < QUESTIONS.length - 1) {
      goToQuestion(qIndex + 1)
    } else {
      setStep('loading')
    }
  }

  const handleBack = () => {
    if (qIndex > 0) goToQuestion(qIndex - 1)
    else setStep('landing')
  }

  const handleFieldChange = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  const handleConfirmEmail = (e) => {
    e.preventDefault()
    setStep('done')
  }

  const handleRestart = () => {
    setForm({ monto: '', cuota: '', plazo: '', ingreso: '' })
    setResult(null)
    setEmail('')
    setStep('landing')
  }

  return (
    <div className="phone">
      <div className="status"><span>9:41</span><span>●●●</span></div>

      {step === 'landing' && (
        <>
          <span className="variant-pill">Prototipo de producto · alta fidelidad</span>
          <div className="brand"><div className="brand-icon">D</div> Duolingo <span>· Finanzas</span></div>
          <div id="hero">
            <h1>Descubre cuánto te cuesta <span className="hl">de más</span> ese crédito</h1>
            <p className="sub">En pesos y en días de trabajo — no en porcentajes que nadie entiende.</p>
          </div>
          <p className="scope">Para créditos de inversión en tu negocio o compra de herramientas de trabajo. No para emergencias.</p>
          <button type="button" className="cta" onClick={() => goToQuestion(0)}>Comenzar →</button>
        </>
      )}

      {qIndex >= 0 && (
        <>
          <TopBar onBack={handleBack} progress={((qIndex + 1) / QUESTIONS.length) * 100} />
          <form className="question-screen" onSubmit={handleAnswerSubmit}>
            <p className="q-step">Pregunta {qIndex + 1} de {QUESTIONS.length}</p>
            <h1 className="q-label">{QUESTIONS[qIndex].label}</h1>
            <input
              key={QUESTIONS[qIndex].key}
              type="number"
              autoFocus
              placeholder={QUESTIONS[qIndex].placeholder}
              value={form[QUESTIONS[qIndex].key]}
              onChange={handleFieldChange(QUESTIONS[qIndex].key)}
              required
            />
            {QUESTIONS[qIndex].hint && <div className="hint">{QUESTIONS[qIndex].hint}</div>}
            <button type="submit" className="cta">
              {qIndex < QUESTIONS.length - 1 ? 'Continuar →' : 'Ver mi costo real →'}
            </button>
          </form>
        </>
      )}

      {step === 'loading' && (
        <div className="loading-screen">
          <div className="spinner" />
          <p className="loading-text">Calculando tu costo real…</p>
        </div>
      )}

      {step === 'result' && result && (
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
          <button type="button" className="cta" onClick={() => setStep('email')}>Avísame cuando esté listo →</button>
          <button type="button" className="cta secondary" onClick={handleRestart}>Probar otro crédito</button>
        </div>
      )}

      {step === 'email' && (
        <form className="register-form full" onSubmit={handleConfirmEmail}>
          <h1 style={{ fontSize: 22 }}>¿A qué correo te avisamos?</h1>
          <p className="sub">Te escribimos apenas la herramienta esté disponible. Nada más.</p>
          <input
            type="email"
            autoFocus
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="cta">Confirmar →</button>
          <button type="button" className="cta secondary" onClick={() => setStep('done')}>Ahora no</button>
        </form>
      )}

      {step === 'done' && (
        <div className="done-screen">
          <p className="register-done">
            {email
              ? <>¡Listo! Te avisaremos a <strong>{email}</strong> cuando esté disponible.</>
              : 'Listo, sin problema — puedes volver cuando quieras.'}
          </p>
          <button type="button" className="cta secondary" onClick={handleRestart}>Evaluar otro crédito</button>
        </div>
      )}

      {step !== 'landing' && step !== 'email' && step !== 'done' && (
        <p className="trust">Tus datos no se comparten ni se reportan a bancos.</p>
      )}
    </div>
  )
}
