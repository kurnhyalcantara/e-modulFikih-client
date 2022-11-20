import { makeStyles } from '@mui/styles';

export const useStyle = makeStyles({
  root: {
    marginTop: '50px',
    flexGrow: 1,
  },
  footers: {
    paddingBottom: '10px',
    backgroundColor: '#FDECDF',
  },
  branding: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: '14px',
    color: '#2C3644',
  },
  heading: {
    margin: '0px',
    padding: '0px',
    fontWeight: 400,
    fontSize: '16px',
    paddingBottom: '10px',
  },
  footer: {
    marginTop: '20px',
    paddingBottom: '15px',
    backgroundColor: '#006f59',
    textAlign: 'center',
    color: 'white',
  },
  ico: {
    color: '#ff9800 !important',
    marginRight: '10px',
  },
  contact: {
    color: '#2C3644',
    display: 'flex',
    alignItems: 'center',
  },
  icons: {
    color: '#ff9800',
  },
  icon: {
    margin: '6px',
    border: '0.5px solid #ff9800',
  },
  menubutton: {},
});
