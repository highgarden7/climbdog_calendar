import { useNavigate, useParams } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import './EventDetail.css';

function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById } = useEvents();

  if (!id) {
    navigate('/calendar');
    return null;
  }

  const event = getEventById(Number(id));

  if (!event) {
    navigate('/calendar');
    return null;
  }

  const handleBack = () => {
    navigate(-1);
  };

  // 날짜 포맷팅
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekDay = weekDays[d.getDay()];
    return `${year}년 ${month}월 ${day}일 (${weekDay})`;
  };

  return (
    <div className="event-detail-container">
      {/* 헤더 */}
      <header className="event-detail-header">
        <button className="back-btn" onClick={handleBack}>
          ←
        </button>
        <h1 className="header-title">일정 상세</h1>
        <div className="header-spacer"></div>
      </header>

      {/* 일정 내용 */}
      <div className="event-detail-content">
        <div className="event-color-bar" style={{ backgroundColor: event.color }}></div>

        <div className="event-detail-section">
          <h2 className="event-detail-title">{event.title}</h2>
        </div>

        <div className="event-detail-section">
          <div className="detail-label">날짜</div>
          <div className="detail-value">{formatDate(event.date)}</div>
        </div>

        <div className="event-detail-section">
          <div className="detail-label">시간</div>
          <div className="detail-value">
            {event.startTime} - {event.endTime}
          </div>
        </div>

        <div className="event-detail-section">
          <div className="detail-label">위치</div>
          <div className="detail-value">을지로 담장</div>
        </div>

        <div className="event-detail-section">
          <div className="detail-label">메모</div>
          <div className="detail-value detail-memo">크루원 있어요..</div>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="event-actions">
        <button className="action-btn edit-btn">수정</button>
        <button className="action-btn delete-btn">삭제</button>
      </div>
    </div>
  );
}

export default EventDetail;
