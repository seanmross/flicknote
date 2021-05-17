import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useVideo from '../../hooks/useVideo';
import useChannel from '../../hooks/useChannel';
import Typography from '@material-ui/core/Typography';
import formatNum from '../../util/formatNum';
import formatPublishedAt from '../../util/formatPublishedAt';
import Hidden from '@material-ui/core/Hidden';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2),
    },
  },
  stats: {
    color: theme.palette.text.secondary,
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
    marginRight: theme.spacing(1.5)
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
  description: {
    whiteSpace: 'pre-wrap'
  },
  accordionSummary: {
    flexDirection: 'column'
  },
  statsMobile: {
    margin: 0
  },
  showMoreBtn: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2)
  }
}));

const WatchInfo = ({ videoId }) => {
  const classes = useStyles();
  const [video, videoLoading] = useVideo(videoId);
  const [channel, channelLoading] = useChannel(video?.snippet.channelId);

  const [showMore, setShowMore] = useState(false);

  const showMoreBtnText = () => {
    return !showMore ? 'show more' : 'show less';
  }

  const content = (video, channel) => (
    <React.Fragment>
      {/* Desktop */}
      <Hidden smDown>
        <Typography variant="h6">{video.snippet.title}</Typography>
        <Typography variant="body2" className={classes.stats}>
          {formatNum(video.statistics.viewCount)} views 
          <span className={classes.bullet}>•</span> 
          {formatPublishedAt(video.snippet.publishedAt)}
        </Typography>
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
        <Collapse in={showMore} collapsedHeight={40}>
          <Typography variant="body2" className={classes.description}>
            {video.snippet.description}
          </Typography>
        </Collapse>
        <div className={classes.showMoreBtn}>
          <Button onClick={() => setShowMore(!showMore)}>{showMoreBtnText()}</Button>
        </div>
      </Hidden>

      {/* Mobile */}
      <Hidden mdUp>
        <Accordion className={classes.accordion}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.accordionSummary}>
              <Typography variant="body1">
                {video.snippet.title}
              </Typography>
              <Typography variant="body2" className={`${classes.stats} ${classes.statsMobile}`}>
                {formatNum(video.statistics.viewCount)} views 
                <span className={classes.bullet}>•</span> 
                {formatPublishedAt(video.snippet.publishedAt)}
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails}>
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
            <Collapse in={showMore} collapsedHeight={40}>
              <Typography variant="body2" className={classes.description}>
                {video.snippet.description}
              </Typography>
            </Collapse>
            <div className={classes.showMoreBtn}>
              <Button onClick={() => setShowMore(!showMore)}>{showMoreBtnText()}</Button>
            </div>
          </AccordionDetails>
        </Accordion>
      </Hidden>
    </React.Fragment>
  );

  return (
    <div className={classes.root}>
      {video ? (channel ? content(video, channel) : '') : ''}
    </div>
  );
}
export default WatchInfo;


const longText = `Welcome to our stream 👋 We hope you have a good time and enjoy the music :)
Music playing → lofi hip hop / beats
 
🎧Listen to the playlist on Spotify, Apple Music & More!
→ https://collegemusic.co.uk/lofi

✅Listen to our latest YouTube upload here:
https://collegemusic.co.uk/latest-upload

Join the Discord Family! (Over 10,000 + members) - https://collegemusic.co.uk/discord

Connect with us here 💜 
Instagram » https://collegemusic.co.uk/instagram
TikTok » https://collegemusic.co.uk/tiktok
Twitter » https://collegemusic.co.uk/twitter
Facebook » https://collegemusic.co.uk/facebook
Soundcloud » https://collegemusic.co.uk/soundcloud
Spotify » https://collegemusic.co.uk/lofi
Snapchat » https://collegemusic.co.uk/snapchat

▶️ YouTube Lofi Playlist - http://bit.ly/YouTubeLofiPlaylist

--- --- ---

We care about our listeners, particularly those of you who have talked about feeling alone or depressed, or even suicidal. We know sometimes things can get tough, but we want to let you know you’re not alone and there are people out there who can help. 

Our study girl recently took a break to focus on her own mental health. To find out more about what happened, click here: 

→  https://collegemusic.co.uk/what-happened

At the link below, you’ll find a selection of VICE articles offering mental health support, which we hope will act as guidance, advice and simply a reminder: You are not alone.

→ https://collegemusic.co.uk/vice-support

--- --- ---

환영합니다! 여기에서 즐거운 시간을 보내시고, 감미로운 비트를 즐겨주시기 바랍니다!

Subscribing (with notifications 🔔 turned on) & liking the stream helps so much 💙 + if the stream goes down you'll get notified the new link immediately!

Help us keep this stream running 🔌 - 
Paypal: https://goo.gl/ySwmf7

- Useful Chat Commands (봇 명령어) -
​!talk "Whatever you wanna say"  » Nightbot will talk back to you!
!song » Displays the current song playing
!donate » Help us keep the stream going!
!weather enterlocation » Tells you the weather at the location specified 
!share » Generates a Twitter link to share
!social » Shows College Music social media links
!subscribe » Gives you a link to subscribe to our channel
!contact » Stream not working? Let us know 
!rules » Help familiarize yourself with our chat rules
!hug » Feeling lonely?
!funny » Our bot's funniest quote of the day

If you or a friend are experiencing suicidal feelings, please use the appropriate command in the live chat to show relevant helpline information:

!helpusa » displays mental health helpline info for USA
!helpuk » displays mental health helpline info for UK
!helprussia » displays mental health helpline info for Russia
!helpmexico » displays mental health helpline info for Mexico
!helpkor » displays mental health helpline info for South Korea
!helpjapan » displays mental health helpline info for Japan
!helpgermany » displays mental health helpline info for Germany
!helpfrance » displays mental health helpline info for France
!helpcanda » displays mental health helpline info for Canada
!helpbrazil » displays mental health helpline info for Brazil
!global » displays mental health helpline for the rest of the world

---- FAQs ----

➤ Genres?
Lofi Hiphop - JazzHop - Chillhop - Ambient - Electronic

➤ How long have you been streaming?
We were one of the first music channels to stream on YouTube! We have been running lofi streams since 2017 and others since early 2016! 

➤ How long will this be online?
All day, everyday. 

 --------
✖ Background and animation by Gloria Gemignani
Music in this video
Learn more
Listen ad-free with YouTube Premium
Song
lofi hip hop radio - beats to study/chill/relax
`