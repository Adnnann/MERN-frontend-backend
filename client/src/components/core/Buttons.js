import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function Buttons(
  {firstButton,
  firstButtonText,
  firstButtonIcon,
  secondButton,
  secondButtonText,
  secondButtonIcon,
  thirdButton,
  thirdButtonText,
  thirdButtonIcon
 }
) {

  return (
    <ButtonGroup  variant="contained">
      <Button onClick={firstButton}
        color='info' startIcon={firstButtonIcon}>
        {firstButtonText}
      </Button>

      <Button onClick={secondButton}
        color='info' startIcon={secondButtonIcon}>
        {secondButtonText}
      </Button>
      
      <Button onClick={thirdButton}
        color='info' startIcon={thirdButtonIcon}>
        {thirdButtonText}
      </Button>
     
    </ButtonGroup>
    
  );
}

