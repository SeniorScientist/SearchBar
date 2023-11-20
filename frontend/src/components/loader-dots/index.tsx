import { themeColor } from '@/styles/theme';
import React, { useState, useEffect } from 'react';

interface Props {
  color: themeColor
  length: number
}

const DOT_TIMER = 200

const LoaderDots: React.FC<Props> = ({
  color = 'inherit',
  length = 3
}) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => (prevDots.length === length ? '' : prevDots + '.'));
    }, DOT_TIMER);

    return () => clearInterval(intervalId);
  }, [length]);

  return (
    <div>
      <span className="color-${color}">{dots}</span>
    </div>
  );
};

export default LoaderDots;