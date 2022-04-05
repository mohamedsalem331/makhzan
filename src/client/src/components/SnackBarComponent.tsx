import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

interface ISnackBarProps {
  Message: string
  AlertOn: boolean
  Severity?: AlertColor
}

const CustomizedSnackBar: React.FC<ISnackBarProps> = ({
  Message = '',
  AlertOn = false,
  Severity = 'success',
}) => {
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    setOpen(AlertOn)
  }, [AlertOn, Message])

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity={Severity} sx={{ width: '100%' }}>
          {Message}
        </Alert>
      </Snackbar>
    </Stack>
  )
}

export default CustomizedSnackBar
