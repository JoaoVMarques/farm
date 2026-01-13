import { useState } from 'react';

export function usePlant() {
  const [ isPlanted, setPlanted ] = useState(false);

  return {
    isPlanted,
    setPlanted,
  };
}