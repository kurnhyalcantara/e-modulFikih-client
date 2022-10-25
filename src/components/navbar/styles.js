import { makeStyles } from '@mui/styles';

export const useStyle = makeStyles({
  root: {
    flexGrow: 1,
    color: '#5B6A72',
    backgroundColor: 'white',
    lineHeight: '21px',
  },
  menuButton: {
    padding: '0 35px',
  },
  search: {
    border: '1px solid #C6C6C6',
    borderRadius: '4px',
    width: '270px',
    height: '20px',
    margin: '7px',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
  },
  hints: {
    width: '100%',
    padding: '0 12px',
  },
  signin: {
    color: '#006f59 !important',
    border: '1px solid #dee2e6 !important',
    borderRadius: '30px !important',
    padding: '1.5rem !important',
    height: '48px',
    fontWeight: '700 !important',
  },
  logout: {
    width: '100px',
    height: '30px',
    borderRadius: '6px',
    color: '#019275 !important',
    display: 'flex',
    backgroundColor: '#f1fffb !important',
    alignItems: 'center',
    fontSize: '14px',
    justifyContent: 'center',
  },
});
