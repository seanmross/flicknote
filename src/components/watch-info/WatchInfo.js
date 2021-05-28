import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import useVideo from '../../hooks/useVideo';
import useChannel from '../../hooks/useChannel';
import { formatNum, formatPublishedAt } from '../../util/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2),
    },
  },
  stats: {
    color: theme.palette.text.secondary,
  },
  statsSpacing: {
    marginBottom: theme.spacing(2)
  },
  bullet: {
    margin: '0 4px'
  },
  channelInfo: {
    display: 'flex',
    marginBottom: theme.spacing(2)
  },
  channelImg: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    marginRight: theme.spacing(1.5),
    backgroundColor: theme.palette.primary.light
  },
  channelTitle: {
    fontWeight: 'bold'
  },
  subscribers: {
    color: theme.palette.text.secondary
  },
  accordion: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 0,
    boxShadow: 'none'
  },
  accordionDetails: {
    flexDirection: 'column'
  },
  accordionSummary: {
    flex: 1
  },
  description: {
    whiteSpace: 'pre-wrap'
  },
  showMoreBtn: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2)
  },
  largeBackdropLine: {
    height: '32px',
    backgroundColor: theme.palette.primary.light,
    marginBottom: theme.spacing(1),
    borderRadius: '2px'
  },
  smallBackdropLine: {
    height: '20px',
    backgroundColor: theme.palette.primary.light,
    marginBottom: theme.spacing(1),
    borderRadius: '2px'
  },
  grow: {
    flex: 1
  }
}));

const WatchInfo = ({ videoId }) => {
  const classes = useStyles();
  const [video] = useVideo(videoId);
  const [channel] = useChannel(video?.snippet.channelId);
  const [showMore, setShowMore] = useState(false);
  const theme = useTheme();
  const bpMatches = useMediaQuery(theme.breakpoints.up('sm'));

  const channelInfo = (channel) => (
    <div className={classes.channelInfo}>
      <img 
        className={classes.channelImg}
        src={channel.snippet.thumbnails.default.url}  
        alt=""
      />
      <div>
        <Typography variant="body1" className={classes.channelTitle}>
          {channel.snippet.title}
        </Typography>
        <Typography variant="body2" className={classes.subscribers}>
          {formatNum(channel.statistics.subscriberCount)} subscribers
        </Typography>
      </div>
    </div>
  );

  const videoDescription = (video) => (
    <React.Fragment>
      <Collapse in={showMore} collapsedHeight={40}>
        <Typography variant="body2" className={classes.description}>
          {video.snippet.description}
        </Typography>
      </Collapse>
      <div className={classes.showMoreBtn}>
        <Button onClick={() => setShowMore(!showMore)}>
          {!showMore ? 'show more' : 'show less'}
        </Button>
      </div>
    </React.Fragment>
  );

  const header = (video) => (
    <React.Fragment>
      <Typography variant={bpMatches ? 'h6' : 'body1'}>{video.snippet.title}</Typography>
      <Typography variant="body2" className={clsx(classes.stats, { [classes.statsSpacing]: bpMatches })}>
        {formatNum(video.statistics.viewCount)} views 
        <span className={classes.bullet}>•</span> 
        {formatPublishedAt(video.snippet.publishedAt)}
      </Typography>
    </React.Fragment>
  )

  const headerBackdrop = (
    <div className={clsx({[classes.statsSpacing]: bpMatches })}>
      <div className={clsx({ 
        [classes.largeBackdropLine]: bpMatches, 
        [classes.smallBackdropLine]: !bpMatches
        })} style={{width: '90%'}}>
      </div>
      <div className={classes.smallBackdropLine} style={{width: '30%'}}></div>
    </div>
  );

  const channelInfoBackdrop = (
    <div className={classes.channelInfo}>
      <div className={classes.channelImg}></div>
      <div className={classes.grow}>
        <div className={classes.smallBackdropLine} style={{width: '60%'}}></div>
        <div className={classes.smallBackdropLine} style={{width: '30%'}}></div>
      </div>
    </div>
  );

  const vidDescriptionBackdrop = (
    <>
      <div className={classes.smallBackdropLine} style={{width: '100%'}}></div>
      <div className={classes.smallBackdropLine} style={{width: '60%'}}></div>
    </>
  );

  return (
    <div className={classes.root}>
      {/* Desktop */}
      <Hidden smDown>
        {video ? header(video) : headerBackdrop}
        {channel ? channelInfo(channel) : channelInfoBackdrop}
        {video ? videoDescription(video) : vidDescriptionBackdrop}
      </Hidden>

      {/* Mobile */}
      <Hidden mdUp>
        <Accordion className={classes.accordion}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.accordionSummary}>
              {video ? header(video) : headerBackdrop}
            </div>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails}>
            {channel && channelInfo(channel)}
            {video && videoDescription(video)}
          </AccordionDetails>
        </Accordion>
      </Hidden>
    </div>
  );
}
export default WatchInfo;
