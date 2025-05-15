import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CanteenSurvay from './pages/CanteenSurvay';
import MachineProblem from './pages/MachineProblem';
import Refund from './pages/Refund';
import PageNotFound from './pages/PageNotFound';
import Layout from './component/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/survey/home/:guid" element={<CanteenSurvay />} />
          <Route path="/survey/machine-problem/:guid" element={<MachineProblem />} />
          <Route path="/survey/need-refund/:guid" element={<Refund />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;