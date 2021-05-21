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
  const [sortAnchorEl, sortSortAnchorEl] = useState(null);
  const [noteType, setNoteType] = useState('note');
  const [value, setValue] = useState('');
  const [notesList, setNotesList] = useState([]);

  const handleClickSort = (e) => {
    sortSortAnchorEl(e.currentTarget);
  };

  const handleCloseSort = () => {
    sortSortAnchorEl(null);
  };

  const handleChangeNoteType = (type) => {
    setNoteType(type);
  }

  const handleInputEnter = (e) => {
    if (e.key === 'Enter') {
      addNote();
    }
  }

  const addNote = () => {
    setNotesList([
      ...notesList,
      value
    ]);
    setValue('');
  }

  return (
    <div className={classes.root}>
      <div className={`${classes.flex} ${classes.row}`}>
        <Typography variant="h6" className={classes.noteCount}>
          0 Notes
        </Typography>
        <Button onClick={handleClickSort} startIcon={<SortIcon />}>
          sort by
        </Button>
        <Menu
          anchorEl={sortAnchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          getContentAnchorEl={null}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          keepMounted
          open={Boolean(sortAnchorEl)}
          onClose={handleCloseSort}
        >
          <MenuItem onClick={handleCloseSort}>From beginning</MenuItem>
          <MenuItem onClick={handleCloseSort}>From end</MenuItem>
        </Menu>
      </div>
      <div className={classes.row}>
        <TextField
          value={value}
          onInput={e => setValue(e.target.value)}
          onKeyPress={handleInputEnter}
          placeholder={`Add a ${noteType === 'note' ? 'note' : 'quote'}...`}
          fullWidth
          variant="outlined"
          InputProps={{ startAdornment: 
            <InputAdornment position="start">
              {noteType === 'note' ? 
                <SpeakerNotesIcon htmlColor="white" /> : 
                <FormatQuoteIcon htmlColor="white" />
              }
            </InputAdornment>
          }}
        />
      </div>
      <div className={`${classes.flex} ${classes.row}`}>
        <Tooltip title="Note">
          <IconButton 
            onClick={() => handleChangeNoteType('note')}
          >
            <SpeakerNotesIcon 
              htmlColor={
                noteType === 'note' ? 'white' : 'gray'
              } 
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Quote">
          <IconButton 
            onClick={() => handleChangeNoteType('quote')}
          >
            <FormatQuoteIcon 
              htmlColor={
                noteType === 'quote' ? 'white' : 'gray'
              } 
            />
          </IconButton>
        </Tooltip>
        <div className={classes.grow}></div>
        <Button className={classes.cancelBtn}>cancel</Button>
        <Button 
          onClick={addNote}
          disabled={!value}
          variant="contained" 
          color="secondary"
        >
          post
        </Button>
      </div>
      <div className={classes.row}>
        <ul>
          {notesList.map(note => <div>{note}</div> )}
        </ul>
      </div>
    </div>
  );
}
export default Notes;
