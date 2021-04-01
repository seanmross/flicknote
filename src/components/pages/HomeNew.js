import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const tileData = [
  {
    img: 'https://i.ytimg.com/vi/GsT_NQZSMtA/mqdefault.jpg',
    title: 'Image',
    author: 'author',
    cols: 2,
  },
  {
    img: "https://i.ytimg.com/vi/uKPUiVuunAg/mqdefault.jpg",
    title: 'Image',
    author: 'author',
    cols: 2,
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <GridList cellHeight={180} className={classes.gridList} cols={3}>
      {tileData.map((tile) => (
        <GridListTile key={tile.img} cols={tile.cols || 1}>
          <img src={tile.img} alt={tile.title} />
        </GridListTile>
      ))}
    </GridList>
  );
}
export default Home;
