// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Box, Button, Link, Modal, Typography } from '@mui/material'
import { useState } from 'react'
import useSWR from 'swr'
import CompanyList from 'src/views/company/table'


const Companies = () => {
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

  const { data: companies } = useSWR('/company')


  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Typography variant='h5'>Seus estabelecimentos</Typography>
          <Typography variant='body2'>Esses são os estabelecimentos vinculados a sua conta.</Typography>
        </Grid>
        <Grid item justifyItems={'end'} xs={3}>
          <Button onClick={handleOpen}>Novo estabelecimento</Button>

        </Grid>

        <Grid item md={12}>
<CompanyList companies={companies} />

          {/* {JSON.stringify(companies)} */}
        </Grid>

      </Grid>

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
    </>
  )
}

export default Companies
