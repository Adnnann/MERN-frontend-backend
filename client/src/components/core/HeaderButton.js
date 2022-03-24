import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import LoginIcon from '@mui/icons-material/Login';

export default function HeaderButtons() {

  const login = () => {

  }

  const redirectToHomePage = () => {

  }

  const redirectToTeamPage = () => {
    
  }
  
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button onClick={redirectToHomePage}
      color='info' startIcon={<HomeIcon />}>Home</Button>
      <Button onClick={redirectToTeamPage}
      color='info' startIcon={<GroupsIcon />}>Team</Button>
      <Button onClick={login}
      color='info' startIcon={<LoginIcon />}>Login</Button>
    </ButtonGroup>
  );
}

