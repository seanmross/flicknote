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
import { sortSecondsAsc } from '../../util/utils';
import Note from './Note';

const useStyles = makeStyles(theme => ({
  root: {
    // marginTop: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(2),
    },
  },
  header: {
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2)
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

const Notes = ({ player }) => {
  const classes = useStyles();
  const [sortAnchorEl, sortSortAnchorEl] = useState(null);
  const [noteType, setNoteType] = useState('note');
  const [noteValue, setNoteValue] = useState('');
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
    const seconds = player.getCurrentTime();
    const newNote = {
      value: noteValue,
      type: noteType,
      seconds,
    };

    setNotesList([
      ...notesList,
      newNote
    ]);

    setNoteValue('');
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={`${classes.flex} ${classes.row}`}>
          <Typography variant="h6" className={classes.noteCount}>
            {notesList.length} Notes
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
            value={noteValue}
            onInput={e => setNoteValue(e.target.value)}
            onKeyPress={handleInputEnter}
            placeholder={`Add a ${noteType === 'note' ? 'note' : 'quote'}...`}
            fullWidth
            variant="outlined"
          />
        </div>
        <div className={classes.flex}>
          <Tooltip title="Note">
            <IconButton 
              color={noteType === 'note' ? 'secondary' : 'default'}
              onClick={() => handleChangeNoteType('note')}
            >
              <SpeakerNotesIcon htmlColor={noteType === 'note' ? 'inherit' : 'gray'} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Quote">
            <IconButton 
              color={noteType === 'quote' ? 'secondary' : 'default'}
              onClick={() => handleChangeNoteType('quote')}
            >
              <FormatQuoteIcon htmlColor={noteType === 'quote' ? 'inherit' : 'gray'} />
            </IconButton>
          </Tooltip>
          <div className={classes.grow}></div>
          <Button className={classes.cancelBtn}>cancel</Button>
          <Button 
            onClick={addNote}
            disabled={!noteValue}
            variant="contained" 
            color="secondary"
          >
            post
          </Button>
        </div>
      </div>
      {notesList.sort(sortSecondsAsc).map((note, i) => (
        <Note key={i} note={note}></Note>
      ))}
    </div>
  );
}
export default Notes;
