import { useNavigate } from 'react-router-dom';
import climbdogLogo from '../assets/climbdog-logo.png';
import './Landing.css';

function Landing() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/calendar');
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <img
          src={climbdogLogo}
          alt="ClimbDog Calendar"
          className="landing-logo"
        />
        <button
          className="start-button"
          onClick={handleStart}
        >
          시작하기
        </button>
      </div>
    </div>
  );
}

export default Landing;
