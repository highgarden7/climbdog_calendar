import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as api from '../services/api';

export interface Event {
  id: number;
  title: string;
  color: string;
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
  memo?: string;
}

interface DayEvents {
  [key: string]: Event[];
}

interface EventContextType {
  events: DayEvents;
  loading: boolean;
  addEvent: (event: Omit<Event, 'id'>) => Promise<void>;
  updateEvent: (id: number, event: Partial<Omit<Event, 'id'>>) => Promise<void>;
  deleteEvent: (id: number) => Promise<void>;
  getEventsForDate: (date: string) => Event[];
  getEventById: (id: number) => Event | undefined;
  refreshEvents: () => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<DayEvents>({});
  const [loading, setLoading] = useState(true);

  // 모든 이벤트를 날짜별로 그룹화
  const groupEventsByDate = (eventList: Event[]): DayEvents => {
    return eventList.reduce((acc, event) => {
      if (!acc[event.date]) {
        acc[event.date] = [];
      }
      acc[event.date].push(event);
      return acc;
    }, {} as DayEvents);
  };

  // 초기 로드
  const loadEvents = async () => {
    try {
      setLoading(true);
      const allEvents = await api.getAllEvents();
      setEvents(groupEventsByDate(allEvents));
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const addEvent = async (event: Omit<Event, 'id'>) => {
    try {
      const newEvent = await api.createEvent(event);
      setEvents(prev => {
        const dateKey = event.date;
        const existingEvents = prev[dateKey] || [];
        return {
          ...prev,
          [dateKey]: [...existingEvents, newEvent],
        };
      });
    } catch (error) {
      console.error('Failed to add event:', error);
      throw error;
    }
  };

  const updateEvent = async (id: number, eventData: Partial<Omit<Event, 'id'>>) => {
    try {
      const updatedEvent = await api.updateEvent(id, eventData);

      // 기존 이벤트 제거
      setEvents(prev => {
        const newEvents = { ...prev };
        for (const date in newEvents) {
          newEvents[date] = newEvents[date].filter(e => e.id !== id);
          if (newEvents[date].length === 0) {
            delete newEvents[date];
          }
        }

        // 업데이트된 이벤트 추가
        const dateKey = updatedEvent.date;
        const existingEvents = newEvents[dateKey] || [];
        return {
          ...newEvents,
          [dateKey]: [...existingEvents, updatedEvent],
        };
      });
    } catch (error) {
      console.error('Failed to update event:', error);
      throw error;
    }
  };

  const deleteEvent = async (id: number) => {
    try {
      await api.deleteEvent(id);

      setEvents(prev => {
        const newEvents = { ...prev };
        for (const date in newEvents) {
          newEvents[date] = newEvents[date].filter(e => e.id !== id);
          if (newEvents[date].length === 0) {
            delete newEvents[date];
          }
        }
        return newEvents;
      });
    } catch (error) {
      console.error('Failed to delete event:', error);
      throw error;
    }
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

  const refreshEvents = async () => {
    await loadEvents();
  };

  return (
    <EventContext.Provider value={{ events, loading, addEvent, updateEvent, deleteEvent, getEventsForDate, getEventById, refreshEvents }}>
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
