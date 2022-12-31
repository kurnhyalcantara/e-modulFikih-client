import { ButtonBase } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BootstrapedButton = styled(ButtonBase)(() => ({
  '&. MuiButtonBase-root': {
    borderRadius: '0.5rem',
    height: '2.5rem',
  },
}));
