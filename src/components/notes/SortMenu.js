import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SortIcon from '@material-ui/icons/Sort';

const SortMenu = () => {
  const [sortAnchorEl, sortSortAnchorEl] = useState(null);

  const handleClickSort = (e) => {
    sortSortAnchorEl(e.currentTarget);
  };

  const handleCloseSort = () => {
    sortSortAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickSort} startIcon={<SortIcon />}>
        sort by
      </Button>
      <Menu
        anchorEl={sortAnchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        getContentAnchorEl={null}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        keepMounted
        open={Boolean(sortAnchorEl)}
        onClose={handleCloseSort}
      >
        <MenuItem onClick={handleCloseSort}>From beginning</MenuItem>
        <MenuItem onClick={handleCloseSort}>From end</MenuItem>
      </Menu>
    </React.Fragment>
  );
}
export default SortMenu;
