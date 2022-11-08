import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

const InstallPWA = () => {
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      console.log('we are being trigerred :D');
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
