import { Navigate, Route, Routes } from 'react-router-dom'
import Prototype from './Prototype'
import Mvp from './Mvp'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/mvp" replace />} />
      <Route path="/mvp" element={<Mvp />} />
      <Route path="/prototype" element={<Prototype />} />
    </Routes>
  )
}
