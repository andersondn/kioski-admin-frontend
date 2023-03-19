import { LoadingButton } from '@mui/lab'
import { Box, Fade, Grid, Modal, Paper, Typography } from '@mui/material'
import { DeleteCircle } from 'mdi-material-ui'
import React from 'react'
import API from 'src/services/api'
import { useSWRConfig } from 'swr'
import AddPrizeForm from './AddPrize'

// import { Container } from './styles';
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  pt: 2,
  px: 4,
  pb: 3
}
interface Props {
  gameId?: string
  prize: any
  show: boolean
  confirm?: () => void
  close: () => void
}

const DeletePrizeModal = ({ prize, show, close, gameId }: Props) => {
  const [loading, setLoading] = React.useState(false)
  const {mutate}  = useSWRConfig()

  // const show = () => setOpen(true);
  const handleClose = () => close()

  const confirmDelete = async () => {
    setLoading(true)
    try {
      const response = await API.delete(`/games/${gameId}/prizes/${prize.id}`)
      mutate(`/games/${gameId}`)
      close()
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  if (!prize) return null

  return (
    <>
      <Modal open={show} onClose={handleClose} closeAfterTransition disableAutoFocus={true}>
        <Fade in={show}>
          <Box sx={modalStyle}>
            <Paper
              sx={{
                px: 6,
                py: 4,
                margin: 'auto',
                backgroundColor: theme => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff')
              }}
            >
              <Typography variant='h6' gutterBottom>
                você tem certeza que deseja deletar o prêmio {prize.name}?
              </Typography>

              <Grid container justifyContent='end'>
                <Grid item>
                  <LoadingButton
                    loading={loading}
                    color='primary'
                    variant='contained'
                    onClick={confirmDelete}
                    loadingPosition='start'
                    startIcon={<DeleteCircle />}
                  >
                    {loading ? 'Apagando...' : 'Sim, apagar'}
                  </LoadingButton>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default DeletePrizeModal
