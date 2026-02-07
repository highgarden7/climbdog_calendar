import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import Landing from './pages/Landing';
import Calendar from './pages/Calendar';
import DayEventsList from './pages/DayEventsList';
import AddEvent from './pages/AddEvent';
import EventDetail from './pages/EventDetail';
import './App.css';

function App() {
  return (
    <EventProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/calendar/:date" element={<DayEventsList />} />
          <Route path="/calendar/:date/add" element={<AddEvent />} />
          <Route path="/event/:id" element={<EventDetail />} />
        </Routes>
      </Router>
    </EventProvider>
  );
}

export default App;
