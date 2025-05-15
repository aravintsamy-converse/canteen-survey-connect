import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import CanteenSurvay from './pages/CanteenSurvay';
import MachineProblem from './pages/MachineProblem';
import Refund from './pages/Refund';
import PageNotFound from './pages/PageNotFound';
import Layout from './component/Layout';
import { GuidProvider, useGuid } from './GuidContext';

// Component to extract GUID and set it in context
const GuidExtractor: React.FC = () => {
  const { guid } = useParams<{ guid: string }>();
  const { setGuid } = useGuid();

  React.useEffect(() => {
    if (guid) {
      setGuid(guid);
    }
  }, [guid, setGuid]);

  return <CanteenSurvay />;
};

function App() {
  return (
    <GuidProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/survey/home/:guid" element={<GuidExtractor />} />
            <Route path="/survey/machine-problem" element={<MachineProblem />} />
            <Route path="/survey/need-refund" element={<Refund />} />
            <Route path="/" element={<Navigate to="/survey/home" replace />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </GuidProvider>
  );
}

export default App;