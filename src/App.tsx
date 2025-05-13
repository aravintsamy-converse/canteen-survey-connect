import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CanteenSurvay from './pages/CanteenSurvay'
import MachineProblem from './pages/MachineProblem'
import Refund from './pages/Refund'
function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<CanteenSurvay />} />
      <Route path="/machine-problem" element={<MachineProblem />} />
      <Route path="/refund" element={<Refund />} />
    </Routes>
  </Router>
  )
}

export default App
