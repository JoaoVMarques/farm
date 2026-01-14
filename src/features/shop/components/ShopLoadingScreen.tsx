import { useEffect, useState } from 'react';
import { Card, ProgressBar } from 'react-bootstrap';

interface props {
  onFinish: () => void
}

export function ShopLoadingScreen({ onFinish }: props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        const newProgress = oldProgress + diff;

        if (newProgress >= 100) {
          return 100;
        }
        return newProgress;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        onFinish();
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [progress, onFinish]);

  return (
    <Card className="loading-card p-4 text-center">
      <h2 className="mb-4">Conectando ao Servidor...</h2>
      <div className="mb-2">Discando ...</div>
      <ProgressBar
        animated
        now={ progress }
        label={ `${Math.round(progress)}%` }
        variant="info"
        className="w-100"
        style={ { height: '25px' } }
      />
      <small className="text-muted mt-3 d-block">
        Aguarde, sua linha telefônica está sendo usada...
      </small>
    </Card>
  );
}