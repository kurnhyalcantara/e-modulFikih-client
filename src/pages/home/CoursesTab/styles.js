import { makeStyles } from '@mui/styles';

export const useStyle = makeStyles({
  root: {
    maxWidth: '100%',
  },
  tabcontainer: {
    '& .Mui-selected': {
      color: '#ff9800 !important',
      fontWeight: '600 !important',
    },
  },
});
