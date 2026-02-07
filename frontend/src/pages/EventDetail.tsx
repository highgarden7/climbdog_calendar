import { useNavigate, useParams } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import './EventDetail.css';

function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById, deleteEvent } = useEvents();

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

  const handleEdit = () => {
    // TODO: 수정 페이지로 이동 (나중에 구현)
    alert('수정 기능은 곧 추가될 예정입니다.');
  };

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteEvent(Number(id));
      navigate('/calendar');
    } catch (error) {
      alert('삭제에 실패했습니다.');
    }
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

        {event.location && (
          <div className="event-detail-section">
            <div className="detail-label">위치</div>
            <div className="detail-value">{event.location}</div>
          </div>
        )}

        {event.memo && (
          <div className="event-detail-section">
            <div className="detail-label">메모</div>
            <div className="detail-value detail-memo">{event.memo}</div>
          </div>
        )}
      </div>

      {/* 액션 버튼 */}
      <div className="event-actions">
        <button className="action-btn edit-btn" onClick={handleEdit}>수정</button>
        <button className="action-btn delete-btn" onClick={handleDelete}>삭제</button>
      </div>
    </div>
  );
}

export default EventDetail;
