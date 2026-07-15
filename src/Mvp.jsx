import { Link } from 'react-router-dom'
import './Mvp.css'

const USERS = [
  {
    id: 'C1',
    name: 'Técnico de aires · 38 · Bogotá',
    ok: true,
    behavior: 'Llena los 4 campos sin dudar, lee la tarjeta de costo con atención, apenas mira el veredicto. Su caso cae en zona "te conviene" — no ve la tarjeta de alternativa.',
    quote: '"Esto es justo lo que me mostró el anuncio — no me sorprendió nada, y eso es bueno."',
    note: 'Confirma que la promesa de S6 se sostiene en el producto para su caso.',
  },
  {
    id: 'C2',
    name: 'Vendedora por catálogo · 34 · Medellín',
    ok: true,
    behavior: 'Pausa ~15 segundos en el campo de ingreso, pero continúa sola. Su caso cae en "ajusta el plazo" — lee la tarjeta azul dos veces.',
    quote: '"Ah, o sea que si pago en más meses la cuota baja. Eso sí me sirve — antes solo me decían \'ajusta el plazo\' y yo pensaba, ¿a cuánto?"',
    note: 'La alternativa accionable resuelve exactamente la frustración que anticipó Kano en S5.',
  },
  {
    id: 'C3',
    name: 'Conductor de plataforma · 41 · Cali',
    ok: true,
    behavior: 'Rápido con el formulario. Su caso cae en "no te conviene" — lee el veredicto rojo y casi cierra la app pensando que ya terminó, antes de notar la tarjeta azul debajo.',
    quote: '"Pensé que ahí se acababa, casi no bajo a ver lo azul. Deberían ponerlo más arriba o resaltarlo más."',
    note: 'Completó la tarea, pero casi se pierde el delighter — problema de jerarquía visual, no de contenido.',
  },
  {
    id: 'C4',
    name: 'Técnico de refrigeración · 29 · Barranquilla',
    ok: true,
    behavior: 'El más rápido y más comprometido de los 6. Su caso cae en "te conviene".',
    quote: '"Exactamente lo que buscaba — lo primero que veo es cuánto me cuesta de más, tal como decía el anuncio."',
    note: 'Mismo perfil que E4 (S4) — lleva dos entregas pidiendo justo esto.',
  },
  {
    id: 'C5',
    name: 'Negocio de comida · 45 · Bogotá',
    ok: false,
    behavior: 'Se detiene más de un minuto en "¿Cuánto ganas al mes, más o menos?". Su ingreso varía semana a semana; relee el texto de ayuda pero no sabe de cuántos meses promediar. Rompe el protocolo de pensar en voz alta y pregunta directamente a la moderadora.',
    quote: '"Es que mi plata no es fija — un mes bien y el otro flojo. No sé si esto me sirve a mí."',
    note: 'Única falla del test. No es ruido: es el mismo patrón de ingreso variable identificado desde S2 (Diego, Sebastián).',
  },
  {
    id: 'C6',
    name: 'Freelance diseño · 28 · Bogotá',
    ok: true,
    behavior: 'Rápida, atenta al detalle. Su caso cae en "ajusta el plazo" — nota la alternativa de inmediato.',
    quote: '"Me gusta que no solo dice \'ajusta el plazo\' sino que me dice a cuánto — eso sí se siente terminado, no a medias."',
    note: 'Arquetipo Valentina (S2). Valora la especificidad como señal de producto terminado.',
  },
]

const DECISIONS = [
  {
    q: '¿El flujo es intuitivo?',
    a: 'Sí, con matiz. 83,3% (5/6) completa la tarea sin ayuda, por encima del umbral orientador de 80% — pero el margen es estrecho, y la única falla no es ruido aleatorio: es el mismo patrón de ingreso variable que aparece desde S2.',
  },
  {
    q: '¿Los usuarios perciben el valor prometido en el marketing?',
    a: 'Sí, para la mayoría. 4 de 6 confirman espontáneamente — sin que se les pregunte — que lo que ven en el producto coincide con lo que el mensaje de S6 les prometió.',
  },
  {
    q: '¿Hay desconexión entre lo comunicado en S6 y lo experimentado en el producto?',
    a: 'Una, puntual y ya conocida. El marketing prometía simplicidad para cualquier trabajador independiente. Para el segmento de ingreso irregular, pedir un solo número de "ingreso promedio" no es tan simple como prometido.',
  },
  {
    q: '¿Qué ajustan antes de la presentación final?',
    a: '1) Cambiar el campo de ingreso a un rango o "mes bueno / mes flojo". 2) Subir la tarjeta de alternativa en la jerarquía visual para que no parezca el fin de la conversación. 3) Mantener el orden costo→veredicto — funcionó igual en producto que en marketing.',
  },
]

export default function Mvp() {
  return (
    <div className="mvp-page">
      <header className="mvp-header">
        <span className="mvp-tag">Semana 7 · Prototipo de producto + hallazgos (grupal, sin nota)</span>
        <h1>MVP — ¿Tomo este crédito?</h1>
        <p className="mvp-sub">
          En S6 validamos que sabemos comunicar el valor. Esta semana probamos si el usuario puede
          realmente <em>acceder</em> a ese valor a través de la interfaz.
        </p>
        <Link to="/prototype" className="mvp-cta">Probar el prototipo →</Link>
      </header>

      <section className="mvp-section">
        <h2>El prototipo</h2>
        <p>
          Flujo único, de entrada a valor: 4 datos en lenguaje propio (monto, cuota, plazo, ingreso),
          costo real primero (pesos y días de trabajo), veredicto después, y una alternativa concreta
          cuando el veredicto es negativo.
        </p>
        <div className="mvp-criteria">
          <div className="mvp-criterio"><strong>Interactivo</strong> — el usuario navega solo, sin guía.</div>
          <div className="mvp-criterio"><strong>Completo</strong> — de la entrada al momento de valor.</div>
          <div className="mvp-criterio"><strong>Realista</strong> — mockup de teléfono, marca, copy final.</div>
          <div className="mvp-criterio"><strong>Enfocado</strong> — solo el flujo de evaluación.</div>
        </div>
      </section>

      <section className="mvp-section">
        <h2>El test de usabilidad</h2>
        <p>
          Técnica <strong>think-aloud</strong>, con los mismos 6 usuarios que reaccionaron al mensaje
          de marketing en S6 — para comparar promesa vs. experiencia persona por persona.
        </p>
        <p className="mvp-task">
          <strong>Tarea:</strong> "Usa esta herramienta para saber si te conviene tomar un crédito de
          $2.000.000, pagando una cuota de $350.000 durante 12 meses, ganando aproximadamente
          $1.800.000 al mes."
        </p>
      </section>

      <section className="mvp-section">
        <h2>Resultados por usuario</h2>
        <div className="mvp-users">
          {USERS.map((u) => (
            <div className="mvp-user" key={u.id}>
              <div className="mvp-user-head">
                <span className="mvp-user-avatar">{u.id}</span>
                <span className="mvp-user-name">{u.name}</span>
                <span className={`mvp-user-tag ${u.ok ? 'ok' : 'help'}`}>
                  {u.ok ? 'Completó sin ayuda' : 'Necesitó ayuda'}
                </span>
              </div>
              <p className="mvp-user-behavior">{u.behavior}</p>
              <p className={`mvp-user-quote ${u.ok ? '' : 'help'}`}>{u.quote}</p>
              <p className="mvp-user-note">{u.note}</p>
            </div>
          ))}
        </div>
        <div className="mvp-metric">
          <span>5 de 6 completan sin ayuda</span>
          <div className="mvp-metric-bar"><div style={{ width: '83.3%' }} /></div>
          <span>83,3% · meta 80%</span>
        </div>
      </section>

      <section className="mvp-section">
        <h2>La decisión</h2>
        <div className="mvp-decisions">
          {DECISIONS.map((d) => (
            <div className="mvp-decision" key={d.q}>
              <p className="mvp-decision-q">{d.q}</p>
              <p className="mvp-decision-a">{d.a}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mvp-footer">
        Entrega formativa — alimenta el video de S8. La evaluación oral individual (25%, sumativa)
        se realiza por separado, en conversación con el agente de voz.
      </footer>
    </div>
  )
}
