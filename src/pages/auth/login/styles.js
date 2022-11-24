import { makeStyles } from '@mui/styles';

export const useStyle = makeStyles({
  root: {
    backgroundColor: '#fffcf5',
    minHeight: '90vh',
    padding: '120px 20px',
  },
  formWrapper: {
    maxWidth: '400px',
    margin: '0px auto',
    border: '2px solid #e6e6e6',
    padding: '70px 30px',
    borderRadius: '10px',
    background: 'white',
  },
  heading: {
    textAlign: 'center',
  },
  subheading: {
    textAlign: 'center',
    marginBottom: '28px !important',
  },
  msg: {
    textAlign: 'center',
    padding: '30px 0',
    fontSize: '20px',
  },
  link: {
    color: '#ff9800',
    textDecoration: 'none',
    '&:hover': {
      color: '#ffb74d',
    },
  },
});
