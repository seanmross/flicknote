import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#282828',
    },
    secondary: {
      main: '#ff4d4d',
    },
  },
});
export default theme;

/**
  primary background: #282828
  icon button: #ffffff
  search input text: #e2e2e2
  search box border: #2a2a2a
  search button background: #303030
  search button icon: #6e6e6e

  text primary: #ffffff
  text secondary: #858585

  menu item icon: #858585
  menu item text: #ffffff
  menu item background active: #353535
 */