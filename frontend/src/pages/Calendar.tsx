import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import climbdogLogo from '../assets/climbdog-logo2.png';
import './Calendar.css';

function Calendar() {
  const navigate = useNavigate();
  const { getEventsForDate } = useEvents();
  const [currentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(2); // 2월

  const months = [
    { value: 1, label: '1월' },
    { value: 2, label: '2월' },
    { value: 3, label: '3월' },
    { value: 4, label: '4월' },
    { value: 5, label: '5월' },
    { value: 6, label: '6월' },
    { value: 7, label: '7월' },
    { value: 8, label: '8월' },
    { value: 9, label: '9월' },
    { value: 10, label: '10월' },
    { value: 11, label: '11월' },
    { value: 12, label: '12월' },
  ];

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  // 해당 월의 날짜 계산
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  // 캘린더 그리드 생성
  const calendarDays = [];

  // 이전 달 빈 칸
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  // 현재 달 날짜
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const getEventsForDay = (day: number | null) => {
    if (!day) return [];
    const dateKey = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return getEventsForDate(dateKey);
  };

  // 날짜 클릭 핸들러
  const handleDayClick = (day: number | null) => {
    if (!day) return;
    const dateKey = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    navigate(`/calendar/${dateKey}`);
  };

  // + 버튼 클릭 시 일정 추가 페이지로 이동
  const handleAddButtonClick = () => {
    const today = new Date();
    const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    navigate(`/calendar/${dateKey}/add`);
  };

  return (
    <div className="calendar-container">
      {/* 헤더 */}
      <header className="calendar-header">
        <div className="header-left">
          <button className="menu-btn">☰</button>
          <img src={climbdogLogo} alt="CLIMBDOG" className="header-logo" />
        </div>
        <div className="header-right">
          <div className="month-selector">
            <select
              value={currentMonth}
              onChange={(e) => setCurrentMonth(Number(e.target.value))}
            >
              {months.map(month => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <span className="dropdown-arrow">▼</span>
          </div>
        </div>
      </header>

      {/* 월별 탭 */}
      <div className="month-tabs">
        {months.map(month => (
          <button
            key={month.value}
            className={`month-tab ${currentMonth === month.value ? 'active' : ''}`}
            onClick={() => setCurrentMonth(month.value)}
          >
            {month.label}
          </button>
        ))}
      </div>

      {/* 요일 헤더 */}
      <div className="weekdays">
        {weekDays.map((day, index) => (
          <div
            key={day}
            className={`weekday ${index === 0 ? 'sunday' : ''} ${index === 6 ? 'saturday' : ''}`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 달력 그리드 */}
      <div className="calendar-grid">
        {calendarDays.map((day, index) => {
          const dayEvents = getEventsForDay(day);
          const maxVisibleEvents = 1; // 최대 표시 일정 개수
          const visibleEvents = dayEvents.slice(0, maxVisibleEvents);
          const remainingCount = dayEvents.length - maxVisibleEvents;

          return (
            <div
              key={index}
              className={`calendar-day ${!day ? 'empty' : ''} ${day ? 'clickable' : ''}`}
              onClick={() => handleDayClick(day)}
            >
              {day && (
                <>
                  <div className="day-number">
                    {day}
                  </div>
                  <div className="day-events">
                    {visibleEvents.map(event => (
                      <div
                        key={event.id}
                        className="event-badge"
                        style={{ backgroundColor: event.color }}
                        title={`${event.startTime} - ${event.endTime}`}
                      >
                        {event.title}
                      </div>
                    ))}
                    {remainingCount > 0 && (
                      <div className="more-events">
                        +{remainingCount}개 일정
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* 일정 추가 버튼 */}
      <button className="add-event-btn" onClick={handleAddButtonClick}>
        <span className="plus-icon">+</span>
      </button>
    </div>
  );
}

export default Calendar;
