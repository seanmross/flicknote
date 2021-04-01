import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    color: theme.palette.primary.light,
  },
  container: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    paddingTop: '56.25%', /* 56.25 16:9 Aspect Ratio */
    maxWidth: '1280px',
    maxHeight: '720px'
  },
  responsiveIframe: {
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    width: '70%',
    height: '70%',
    border: 'none'
  }
}));

const Watch = () => {
  const classes = useStyles();
  const { videoId } = useParams();

  return (
    // <Container maxWidth="lg">
    //   <Grid container spacing={2}>
    //     <Grid item xs={12} sm={12} md={12} lg={8}>
    //     <iframe 
          
    //       allowFullScreen
    //       src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com"
    //       frameborder="0" 
    //     />
    //     </Grid>
    //     <Grid item md={12} lg={4}>
    //       <Paper className={classes.paper} />
    //     </Grid>
    //   </Grid>
    // </Container>
    <div className={classes.container}> 
      <iframe className={classes.responsiveIframe} src={`https://www.youtube.com/embed/${videoId}`}></iframe>
    </div>
  );
}
export default Watch;
