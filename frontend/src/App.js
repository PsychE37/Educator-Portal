import './App.css';
import SyllabusHomePage from './SyllabusHome';
import CalendarHomePage from './CalendarHome';
import SchedulePage from './Schedule';
import LoginPage from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/syllabus" element={<SyllabusHomePage/>} />
        <Route path="/calendar" element={<CalendarHomePage/>} />
        <Route path="/schedule" element={<SchedulePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
