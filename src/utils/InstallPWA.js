import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      console.log('we are being trigerred :D');
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('transitionend', handler);
  }, []);

  const triggerPrompt = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  if (!supportsPWA) {
    return null;
  }

  return (
    <div>
      <Button
        onClick={triggerPrompt}
        sx={{
          paddingX: '24px',
          borderRadius: '50px',
          fontWeight: '700',
          backgroundColor: '#ff9800',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#ffb74d',
          },
        }}
      >
        Download Aplikasi
      </Button>
    </div>
  );
};

export default InstallPWA;
