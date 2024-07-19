import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Toasts from '@/utils/toasts';

export default function CustomDialog({
  button,
  title = '',
  desc,
  smbtnText = 'Đồng ý',
  handle = null,
  children,
  openValidate = null,
}) {
  const [open, setOpen] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  // Open Dialog
  const handleOpenDialog = async () => {
    // Check validate open
    if (openValidate === null) {
      setOpen(true);
    } else {
      // Open dialog if success and show error toast if error
      openValidate.status ? setOpen(true) : Toasts.error(openValidate.error);
    }
  };

  // Close Dialog
  const handleCloseDialog = () => {
    setOpen(false);
  };

  // Dilog handle
  const handleDialog = async () => {
    // Enable Dialog
    setIsLoading(true);

    // Close dialog
    handleCloseDialog();

    // Set time out
    setTimeout(async () => {
      // Handling
      handle && (await handle());

      // Disable Loading
      setIsLoading(false);
    }, 300);
  };

  return (
    <div>
      <Box onClick={handleOpenDialog}>{button}</Box>
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{desc}</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions sx={{ margin: '15px', marginTop: 0 }}>
          <Button onClick={handleCloseDialog}>Huỷ</Button>
          {isLoading ? (
            <LoadingButton loading variant="contained">
              {smbtnText}
            </LoadingButton>
          ) : (
            <Button variant="contained" onClick={handleDialog} disabled={isLoading}>
              {smbtnText}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
