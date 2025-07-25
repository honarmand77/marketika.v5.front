import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function Alerts({message, severity}) {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity={severity}>
      {message}
    </Alert>
  );
}