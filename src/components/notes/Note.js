import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { formatTime, formatPublishedAt } from '../../util/utils';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      '& .note-actions': {
        opacity: 1
      }
    }
  },
  flex: { 
    display: 'flex' 
  },
  adornment: { 
    paddingRight: theme.spacing(2),
    alignItems: 'center'
  },
  main: {
    flexDirection: 'column',
    flex: 1
  },
  seekTo: {
    color: '#3EA6FF',
    '&:hover': {
      cursor: 'pointer',
    }
  },
  bullet: { 
    margin: '0 4px' 
  },
  gray: { 
    color: theme.palette.text.secondary 
  },
  grow: { 
    flex: 1
  },
  spacingLeft: { 
    marginLeft: theme.spacing(1) 
  },
  body: { 
    paddingBottom: theme.spacing(1) 
  },
  hide: {
    opacity: 0
  },
  iconBtn: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

const Note = ({ note }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, classes.flex)}>
      <div className={clsx(classes.adornment, classes.flex)}>
        {note.type === 'note' && <SpeakerNotesIcon fontSize="large" />}
        {note.type === 'quote' && <FormatQuoteIcon fontSize="large" />}
      </div>
      <div className={clsx(classes.main, classes.flex)}>
        <div className={classes.flex}>
          <Typography variant="body2" className={clsx(classes.seekTo)}>
            {formatTime(note.seconds)}
          </Typography>
          <div className={classes.bullet}>•</div>
          <Typography variant="body2" className={classes.gray}>
            {formatPublishedAt(note.date)}
          </Typography>
          <div className={classes.grow}></div>
          <div className={`${classes.hide} note-actions`}>
            <EditIcon fontSize="small" className={classes.iconBtn} />
            <DeleteIcon fontSize="small" className={clsx(classes.spacingLeft, classes.iconBtn)} />
          </div>
        </div>
        <div className={classes.body}>
          <Typography variant="body2">{note.value}</Typography>
        </div>
      </div>
    </div>
  );
}
export default Note;