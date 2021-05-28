import { formatTime } from '../../util/utils';
import { makeStyles } from '@material-ui/core/styles';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 2)
  },
  adornment: {
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1)
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(1)
  },
  body: {
    paddingBottom: theme.spacing(1)
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  actions: {
    display: 'flex'
  },
  gray: {
    color: theme.palette.text.secondary
  },
  spacingLeft: {
    marginLeft: theme.spacing(1)
  }
}))

const Note = ({ note }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.adornment}>
        {note.type === 'note' && <SpeakerNotesIcon fontSize="large" />}
        {note.type === 'quote' && <FormatQuoteIcon fontSize="large" />}
      </div>
      <div className={classes.main}>
        {/* <div className={classes.header}>
          <Typography variant="body2" className={classes.gray}>{formatTime(note.seconds)}</Typography>
        </div> */}
        <div className={classes.body}>
          <TextField
            size="small"
            value={note.value}
            fullWidth
            variant="outlined"
          />
        </div>
        <div className={classes.footer}>
          <Typography variant="body2" className={`${classes.gray} ${classes.spacingLeft}`}>
            {formatTime(note.seconds)}
          </Typography>
          <div className={classes.actions}>
            <Typography variant="body2" className={`${classes.gray} ${classes.spacingLeft}`}>
              12 mins ago
            </Typography>
            <IconButton size="small" className={classes.spacingLeft}>
              <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton size="small" className={classes.spacingLeft}>
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Note;