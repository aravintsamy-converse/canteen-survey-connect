import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import CanteenSurvay from './pages/CanteenSurvay';
import MachineProblem from './pages/MachineProblem';
import Refund from './pages/Refund';
import PageNotFound from './pages/PageNotFound';
import Layout from './component/Layout';
import { EquipmentIdProvider, useEqpId } from './EquipmentIdContext';

// Component to extract GUID and set it in context
const GuidExtractor: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Changed from equpmentId to guid
  const { setEqpId } = useEqpId();

  React.useEffect(() => {
    if (id) {
      setEqpId(id);
    }
  }, [id, setEqpId]);

  return <CanteenSurvay />;
};
function App() {

  return (
    <EquipmentIdProvider>
      <Router>
        <Routes>
        <Route element={<Layout />}>
        <Route path="/survey/home/:id" element={<GuidExtractor />} />
            <Route path="/survey/machine-problem" element={<MachineProblem />} />
            <Route path="/survey/need-refund" element={<Refund />} />
            <Route path="/" element={<Navigate to="/survey/home" replace />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </EquipmentIdProvider>
  );
}

export default App;