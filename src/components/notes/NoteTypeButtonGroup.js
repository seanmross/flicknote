import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';

const useStyles = makeStyles(() => ({
  notSelected: {
    color: 'rgba(255, 255, 255, 0.38)'
  },
  selected: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    color: '#fff'
  }
}));

const NoteTypeButtonGroup = ({ noteType, handleChangeNoteType}) => {
  const classes = useStyles();

  return (
    <ButtonGroup disableElevation variant="outlined">
      <Tooltip title="Note">
        <Button 
          className={clsx({ [classes.selected]: noteType === 'note' })}
          onClick={() => handleChangeNoteType('note')}
        >
          <SpeakerNotesIcon 
            className={clsx({ [classes.notSelected]: noteType === 'quote' })} 
          />
        </Button>
      </Tooltip>
      <Tooltip title="Quote">
        <Button 
          className={clsx({ [classes.selected]: noteType === 'quote' })}
          onClick={() => handleChangeNoteType('quote')}
        >
          <FormatQuoteIcon 
            className={clsx({ [classes.notSelected]: noteType === 'note' })} 
          />
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
}
export default NoteTypeButtonGroup;
