import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { AccountBox, ExitToApp, Feedback } from '@material-ui/icons';

const AccountMenu = ({ anchorEl, handleMenuClose, onSignOut }) => {
  const anchorOrigin = { vertical: 'bottom', horizontal: 'right' };
  const transformOrigin = { vertical: 'top', horizontal: 'right' };
  const isMenuOpen = Boolean(anchorEl);

  return (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={anchorOrigin}
      keepMounted
      transformOrigin={transformOrigin}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <AccountBox fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Profile</Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <Feedback fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Send feedback</Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <ExitToApp fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit" onClick={onSignOut}>Sign out</Typography>
      </MenuItem>
    </Menu>
  );
}
export default AccountMenu;
