import { useState, useEffect } from 'react';
import './EventModal.css';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  onSave: (event: EventFormData) => void;
}

interface EventFormData {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
}

function EventModal({ isOpen, onClose, selectedDate, onSave }: EventModalProps) {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    date: selectedDate,
    startTime: '09:00',
    endTime: '10:00',
  });

  // 10분 단위 시간 옵션 생성 (00:00 ~ 23:50)
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

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        date: selectedDate,
      }));
    }
  }, [isOpen, selectedDate]);

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

    onSave(formData);

    // 폼 초기화
    setFormData({
      title: '',
      date: selectedDate,
      startTime: '09:00',
      endTime: '10:00',
    });

    onClose();
  };

  const handleChange = (field: keyof EventFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>일정 추가</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
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

          <div className="form-group">
            <label htmlFor="date">날짜</label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
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

            <div className="form-group">
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

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="btn-submit">
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventModal;
export { type EventFormData };
