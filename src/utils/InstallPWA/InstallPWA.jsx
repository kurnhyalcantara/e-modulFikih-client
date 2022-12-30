import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

const InstallPWA = () => {
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
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
    <Button onClick={triggerPrompt} className="rounded-button" fullWidth>
      Download
    </Button>
  );
};

export default InstallPWA;
