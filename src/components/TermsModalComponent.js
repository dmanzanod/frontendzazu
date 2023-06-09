import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import React from 'react'
import TermsAndConditionsComponent from './TermsAndConditionsComponent'
import CloseIcon from '@mui/icons-material/Close';
const TermsModalComponent = ({open,onClose}) => {
  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent sx={{paddingLeft:8}}>
            <TermsAndConditionsComponent/>
        </DialogContent>

    </Dialog>
  )
}

export default TermsModalComponent