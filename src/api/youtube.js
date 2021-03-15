import axios from 'axios';

const API_KEY = 'AIzaSyB9qZg-UIveLfL6R7OcHkcjeEOPAL8BOyM';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: API_KEY,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 5
  },
});
