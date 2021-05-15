import moment from 'moment';

const formatPublishedAt = (publishedAt) => {
  return moment(publishedAt).fromNow();
}
export default formatPublishedAt;
