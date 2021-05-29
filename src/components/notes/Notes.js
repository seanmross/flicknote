import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { sortSecondsAsc } from '../../util/utils';
import theme from '../../config/theme';
import Note from './Note';
import NoteTypeButtonGroup from './NoteTypeButtonGroup';
import SortMenu from './SortMenu';

const useStyles = makeStyles(theme => ({
  root: {
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
  },
  actions: {
    display: 'flex',
    alignItems: 'center'
  },
}));

const NoteTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
})(TextField);

const Notes = ({ player }) => {
  const classes = useStyles();
  const [noteType, setNoteType] = useState('note');
  const [noteValue, setNoteValue] = useState('');
  const [notesList, setNotesList] = useState([]);

  const changeNoteType = (type) => {
    setNoteType(type);
  }

  const handleInputEnter = (e) => {
    if (e.key === 'Enter') {
      addNote();
    }
  }

  const addNote = () => {
    const seconds = player.getCurrentTime();
    const createdAt = new Date().toUTCString();

    const newNote = {
      value: noteValue,
      type: noteType,
      seconds,
      createdAt
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
        <SortMenu />
        </div>
        <div className={classes.row}>
          <NoteTextField
            value={noteValue}
            onInput={e => setNoteValue(e.target.value)}
            onKeyPress={handleInputEnter}
            placeholder={`Add a ${noteType === 'note' ? 'note' : 'quote'}...`}
            fullWidth
            variant="outlined"
          />
        </div>
        <div className={classes.flex}>
          <NoteTypeButtonGroup 
            noteType={noteType} 
            handleChangeNoteType={changeNoteType} 
          />
          <div className={classes.grow}></div>
          <div className={clsx(classes.actions, classes.flex)}>
            <Button className={classes.cancelBtn}>cancel</Button>
            <Button 
              disableElevation
              onClick={addNote}
              disabled={!noteValue}
              variant="contained" 
              color="secondary"
            >
              post
            </Button>
          </div>
        </div>
      </div>
      {notesList.sort(sortSecondsAsc).map((note, i) => (
        <Note key={i} note={note}></Note>
      ))}
    </div>
  );
}
export default Notes;
