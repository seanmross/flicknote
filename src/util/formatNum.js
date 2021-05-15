import numeral from 'numeral';

const formatNum = (viewCount) => {
  return numeral(viewCount).format('0.a').toUpperCase();
}
export default formatNum;
