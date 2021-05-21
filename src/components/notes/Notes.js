import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SortIcon from '@material-ui/icons/Sort';
import TextField from '@material-ui/core/TextField';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import InputAdornment from '@material-ui/core/InputAdornment';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2, 2)
    }
  },
  flex: {
    display: 'flex'
  },
  row: {
    marginBottom: theme.spacing(1)
  },
  noteCount: {
    marginRight: theme.spacing(2)
  },
  grow: {
    flex: 1
  },
  cancelBtn: {
    marginRight: theme.spacing(2)
  }
}))

const Notes = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const anchorOrigin = { vertical: 'bottom', horizontal: 'left' };
  const transformOrigin = { vertical: 'top', horizontal: 'left' };
  const [noteType, setNoteType] = useState('note');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeNoteType = (type) => {
    setNoteType(type);
  }

  return (
    <div className={classes.root}>
      <div className={`${classes.flex} ${classes.row}`}>
        <Typography variant="h6" className={classes.noteCount}>
          0 Notes
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
          <MenuItem onClick={handleClose}>From beginning</MenuItem>
          <MenuItem onClick={handleClose}>From end</MenuItem>
        </Menu>
      </div>
      <div className={classes.row}>
        <TextField
          placeholder={`Add a ${noteType == 'note' ? 'note' : 'quote'}...`}
          multiline
          rowsMax={5}
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: 
              <InputAdornment position="start">
                {noteType == 'note' ? 
                  <SpeakerNotesIcon htmlColor="white" /> : 
                  <FormatQuoteIcon htmlColor="white" />}
              </InputAdornment>,
          }}
        />
      </div>
      <div className={`${classes.flex} ${classes.row}`}>
        <Tooltip title="Note">
          <IconButton 
            onClick={() => changeNoteType('note')}
          >
            <SpeakerNotesIcon htmlColor={noteType == 'note' ? 'white' : 'gray'} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Quote">
          <IconButton 
            onClick={() => changeNoteType('quote')}
          >
            <FormatQuoteIcon htmlColor={noteType == 'quote' ? 'white' : 'gray'} />
          </IconButton>
        </Tooltip>
        <div className={classes.grow}></div>
        <Button className={classes.cancelBtn}>cancel</Button>
        <Button variant="contained" color="secondary">post</Button>
      </div>
    </div>
  );
}
export default Notes;
