// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormLayoutsBasic from 'src/views/form-layouts/FormLayoutsBasic'
import FormLayoutsIcons from 'src/views/form-layouts/FormLayoutsIcons'
import FormLayoutsSeparator from 'src/views/form-layouts/FormLayoutsSeparator'
import FormLayoutsAlignment from 'src/views/form-layouts/FormLayoutsAlignment'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Box, Button, Link, Modal, Typography } from '@mui/material'
import { useState } from 'react'

const FormLayouts = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
  }

  return (
    <DatePickerWrapper>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Typography variant='h5'>Lista de kioskis</Typography>
          <Typography variant='body2'>Material Design Icons from the Community</Typography>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={handleOpen}>Adicionar kioski</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Text in a modal
              </Typography>
              <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLayoutsBasic />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormLayoutsIcons />
        </Grid>
        <Grid item xs={12}>
          <FormLayoutsSeparator />
        </Grid>
        <Grid item xs={12}>
          <FormLayoutsAlignment />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
