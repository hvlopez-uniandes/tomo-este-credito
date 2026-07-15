import { Navigate, Route, Routes } from 'react-router-dom'
import Prototype from './Prototype'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/prototype" replace />} />
      <Route path="/prototype" element={<Prototype />} />
    </Routes>
  )
}
