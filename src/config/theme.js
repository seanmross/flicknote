import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#1e1e1e',
      contrastText: '#fff'
    },
    secondary: {
      main: '#ff4d4d',
    },
  },
});
export default theme;
