import { useNavigate, useParams } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import './DayEventsList.css';

function DayEventsList() {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const { getEventsForDate } = useEvents();

  if (!date) {
    navigate('/calendar');
    return null;
  }

  const events = getEventsForDate(date);

  // 날짜 포맷팅
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekDay = weekDays[d.getDay()];
    return { month, day, weekDay };
  };

  const { month, day, weekDay } = formatDate(date);

  const handleEventClick = (eventId: number) => {
    navigate(`/event/${eventId}`);
  };

  const handleAddEvent = () => {
    navigate(`/calendar/${date}/add`);
  };

  const handleBack = () => {
    navigate('/calendar');
  };

  return (
    <div className="day-events-container">
      {/* 헤더 */}
      <header className="day-events-header">
        <button className="back-btn" onClick={handleBack}>
          ←
        </button>
        <div className="header-date">
          <span className="header-month">{month}월</span>
          <span className="header-day">{day}일</span>
          <span className="header-weekday">{weekDay}요일</span>
        </div>
        <div className="header-spacer"></div>
      </header>

      {/* 일정 리스트 */}
      <div className="events-list">
        {events.length === 0 ? (
          <div className="no-events">
            <p>일정이 없습니다</p>
            <button className="add-first-event-btn" onClick={handleAddEvent}>
              일정 추가하기
            </button>
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="event-item"
              onClick={() => handleEventClick(event.id)}
            >
              <div className="event-time-indicator" style={{ backgroundColor: event.color }}></div>
              <div className="event-content">
                <div className="event-title">{event.title}</div>
                <div className="event-time">
                  {event.startTime} - {event.endTime}
                </div>
                <div className="event-location">을지로 담장</div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 일정 추가 버튼 */}
      {events.length > 0 && (
        <button className="add-event-fab" onClick={handleAddEvent}>
          <span className="plus-icon">+</span>
        </button>
      )}
    </div>
  );
}

export default DayEventsList;
