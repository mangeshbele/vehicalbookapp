
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Form from './components/Form';
import MultiStepForm from './components/MultiForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MultiStepForm />} />
      </Routes>
    </Router>
  );
}

export default App;
