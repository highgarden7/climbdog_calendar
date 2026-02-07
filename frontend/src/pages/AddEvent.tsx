import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import './AddEvent.css';

function AddEvent() {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const { addEvent } = useEvents();

  const [formData, setFormData] = useState({
    title: '',
    date: date || '',
    startTime: '09:00',
    endTime: '10:00',
    location: '',
    memo: '',
  });

  // 10분 단위 시간 옵션 생성
  const generateTimeOptions = () => {
    const times: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 10) {
        const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        times.push(timeString);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (formData.startTime >= formData.endTime) {
      alert('종료 시간은 시작 시간보다 늦어야 합니다.');
      return;
    }

    addEvent({
      title: formData.title,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      color: '#8B7EC8', // 기본 색상
      location: formData.location,
      memo: formData.memo,
    });

    // 일정 리스트 페이지로 이동
    navigate(`/calendar/${formData.date}`);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="add-event-container">
      {/* 헤더 */}
      <header className="add-event-header">
        <button className="cancel-btn" onClick={handleCancel}>
          취소
        </button>
        <h1 className="header-title">일정 추가</h1>
        <button className="save-btn" onClick={handleSubmit}>
          저장
        </button>
      </header>

      {/* 폼 */}
      <form onSubmit={handleSubmit} className="add-event-form">
        <div className="form-section">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="일정 제목을 입력하세요"
            autoFocus
          />
        </div>

        <div className="form-section">
          <label htmlFor="date">날짜</label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
          />
        </div>

        <div className="form-section time-section">
          <div className="time-input-group">
            <label htmlFor="startTime">시작 시간</label>
            <select
              id="startTime"
              value={formData.startTime}
              onChange={(e) => handleChange('startTime', e.target.value)}
            >
              {timeOptions.map(time => (
                <option key={`start-${time}`} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div className="time-divider">-</div>

          <div className="time-input-group">
            <label htmlFor="endTime">종료 시간</label>
            <select
              id="endTime"
              value={formData.endTime}
              onChange={(e) => handleChange('endTime', e.target.value)}
            >
              {timeOptions.map(time => (
                <option key={`end-${time}`} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-section">
          <label htmlFor="location">위치</label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="위치를 입력하세요"
          />
        </div>

        <div className="form-section">
          <label htmlFor="memo">메모</label>
          <textarea
            id="memo"
            value={formData.memo}
            onChange={(e) => handleChange('memo', e.target.value)}
            placeholder="메모를 입력하세요"
            rows={4}
          />
        </div>
      </form>
    </div>
  );
}

export default AddEvent;
