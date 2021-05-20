import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SortIcon from '@material-ui/icons/Sort';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    padding: theme.spacing(1, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2, 2)
    }
  },
  noteCount: {
    marginRight: theme.spacing(2)
  }
}))

const Notes = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const anchorOrigin = { vertical: 'bottom', horizontal: 'left' };
  const transformOrigin = { vertical: 'top', horizontal: 'left' };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.noteCount}>
        24 Notes
      </Typography>
      <Button onClick={handleClick} startIcon={<SortIcon />}>
        sort by
      </Button>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        getContentAnchorEl={null}
        transformOrigin={transformOrigin}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Start first</MenuItem>
        <MenuItem onClick={handleClose}>End first</MenuItem>
      </Menu>
    </div>
  );
}
export default Notes;
