import numeral from 'numeral';
import moment from 'moment';

export const formatPublishedAt = (publishedAt) => {
  return moment(publishedAt).fromNow();
}

export const formatNum = (viewCount = '0') => {
  return numeral(viewCount).format('0.a').toUpperCase();
}

export const formatTime = (seconds = 0) => {
  let hrs = Math.floor(seconds / 3600);
  let mins = Math.floor((seconds % 3600) / 60);
  let secs = Math.floor(seconds % 60);
  
  hrs = hrs > 0 ? hrs + ':' : '';

  if (hrs && mins < 10) {
    mins = '0' + mins + ':';
  } else {
    mins = mins + ':';
  }

  if (secs < 10) {
    secs = '0' + secs;
  }

  return hrs + mins + secs;
}

export const sortSecondsAsc = ( a, b ) => {
  if ( a.seconds < b.seconds ){
    return -1;
  }
  if ( a.seconds > b.seconds ){
    return 1;
  }
  return 0;
}