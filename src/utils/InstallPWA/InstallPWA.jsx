import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const InstallPWA = () => {
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPromptInstall(e);
    };
    return () => window.addEventListener("beforeinstallprompt", handler);
  }, []);

  const triggerPrompt = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
    return toast.warning(
        "Tidak tersedia untuk saat ini, silahkan coba lagi nanti"
      );
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
