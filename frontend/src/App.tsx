import { JobForm } from './components/JobForm';
import { JobDashboard } from './components/JobDashboard';
import { JobDetailView } from './components/JobDetailView';

function App() {
  return (
    <div className="app-container">
      <div className="main-layout">
        <h1>Async URL Checker</h1>
        <JobForm />
        <JobDashboard />
      </div>
      <div className="main-layout">
        <JobDetailView />
      </div>
    </div>
  );
}

export default App;