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
    <div style={{ margin: '1.5rem 0' }}>
      <Button onClick={triggerPrompt} className="rounded-button download-pwa">
        Download Aplikasi
      </Button>
    </div>
  );
};

export default InstallPWA;
