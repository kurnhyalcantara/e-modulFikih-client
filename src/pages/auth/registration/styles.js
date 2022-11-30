import { makeStyles } from '@mui/styles';

export const useStyle = makeStyles({
  root: {
    backgroundColor: '#fff5f6',
    minHeight: '90vh',
    padding: '120px 20px',
  },
  formWrapper: {
    maxWidth: '400px',
    margin: '0px auto',
    border: '1px solid #e6e6e6',
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
  btn: {
    height: '40px',
  },
  msg: {
    textAlign: 'center',
    padding: '30px 0',
    fontSize: '20px',
  },
  link: {
    color: '#ed6c02',
    textDecoration: 'none',
  },
  option: {
    width: '100%',
    border: '1px solid #cbcbcb',
    borderRadius: '4px',
    height: '60px',
    fontSize: '15px',
    marginBottom: '15px',
    padding: '0 10px',
  },
});
