import { createContext, useContext, useState, ReactNode } from 'react';

export interface Event {
  id: number;
  title: string;
  color: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface DayEvents {
  [key: string]: Event[];
}

interface EventContextType {
  events: DayEvents;
  addEvent: (event: Omit<Event, 'id'>) => void;
  getEventsForDate: (date: string) => Event[];
  getEventById: (id: number) => Event | undefined;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [nextEventId, setNextEventId] = useState(9);
  const [events, setEvents] = useState<DayEvents>({
    '2026-02-02': [
      { id: 1, title: '송파', color: '#8B7EC8', date: '2026-02-02', startTime: '10:00', endTime: '12:00' },
      { id: 2, title: '그루투', color: '#8B7EC8', date: '2026-02-02', startTime: '14:00', endTime: '16:00' },
    ],
    '2026-02-05': [{ id: 3, title: '출장 올레이', color: '#FF6B4A', date: '2026-02-05', startTime: '09:00', endTime: '18:00' }],
    '2026-02-09': [{ id: 4, title: '양재', color: '#8B7EC8', date: '2026-02-09', startTime: '15:00', endTime: '17:00' }],
    '2026-02-16': [{ id: 5, title: '설날 연휴', color: '#00C9A7', date: '2026-02-16', startTime: '00:00', endTime: '23:59' }],
    '2026-02-17': [{ id: 6, title: '설날', color: '#00C9A7', date: '2026-02-17', startTime: '00:00', endTime: '23:59' }],
    '2026-02-18': [{ id: 7, title: '설날 연휴', color: '#00C9A7', date: '2026-02-18', startTime: '00:00', endTime: '23:59' }],
    '2026-02-21': [{ id: 8, title: '송섭 결혼', color: '#8B7EC8', date: '2026-02-21', startTime: '13:00', endTime: '15:00' }],
  });

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...event,
      id: nextEventId,
    };

    setEvents(prev => {
      const dateKey = event.date;
      const existingEvents = prev[dateKey] || [];
      return {
        ...prev,
        [dateKey]: [...existingEvents, newEvent],
      };
    });

    setNextEventId(prev => prev + 1);
  };

  const getEventsForDate = (date: string) => {
    return events[date] || [];
  };

  const getEventById = (id: number) => {
    for (const dateEvents of Object.values(events)) {
      const event = dateEvents.find(e => e.id === id);
      if (event) return event;
    }
    return undefined;
  };

  return (
    <EventContext.Provider value={{ events, addEvent, getEventsForDate, getEventById }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within EventProvider');
  }
  return context;
};
