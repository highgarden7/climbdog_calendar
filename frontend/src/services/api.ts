const API_BASE_URL = 'http://localhost:3000/api';

export interface Event {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  color: string;
  location?: string;
  memo?: string;
}

export interface CreateEventDto {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  color: string;
  location?: string;
  memo?: string;
}

export interface UpdateEventDto {
  title?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  color?: string;
  location?: string;
  memo?: string;
}

// 모든 일정 가져오기
export const getAllEvents = async (): Promise<Event[]> => {
  const response = await fetch(`${API_BASE_URL}/events`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
};

// 특정 날짜의 일정 가져오기
export const getEventsByDate = async (date: string): Promise<Event[]> => {
  const response = await fetch(`${API_BASE_URL}/events?date=${date}`);
  if (!response.ok) {
    throw new Error('Failed to fetch events by date');
  }
  return response.json();
};

// 특정 일정 가져오기
export const getEventById = async (id: number): Promise<Event> => {
  const response = await fetch(`${API_BASE_URL}/events/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch event');
  }
  return response.json();
};

// 일정 생성
export const createEvent = async (
  eventData: CreateEventDto,
): Promise<Event> => {
  const response = await fetch(`${API_BASE_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });
  if (!response.ok) {
    throw new Error('Failed to create event');
  }
  return response.json();
};

// 일정 수정
export const updateEvent = async (
  id: number,
  eventData: UpdateEventDto,
): Promise<Event> => {
  const response = await fetch(`${API_BASE_URL}/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });
  if (!response.ok) {
    throw new Error('Failed to update event');
  }
  return response.json();
};

// 일정 삭제
export const deleteEvent = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/events/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete event');
  }
};
