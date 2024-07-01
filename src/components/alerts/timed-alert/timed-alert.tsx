import React, { useEffect, useState } from 'react';
// import ProgressBar from '../../progress-bar/progress-bar';
import './timed-alert.scss';

interface TimedAlertProps {
  type: 'error' | 'warning' | 'success',
  message: string;
  duration: number;
  onClose: () => void;
}

const TimedAlert: React.FC<TimedAlertProps> = ({ type, message, duration, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return prev - (100 / (duration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration, onClose]);

  return (
    <section className={`alert alert--${type}`}>
      <p>{message}</p>
    </section>
  );
};

export default TimedAlert;