// ** MUI Imports
import Grid, { GridProps } from '@mui/material/Grid'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Link,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Divider,
  Typography,
  CardActions,
  styled,
  Fade
} from '@mui/material'
import { useState } from 'react'
import useSWR from 'swr'
import CompanyList from 'src/views/company/table'
import { useCompanyContext } from 'src/@core/context/CompanyContext'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams, ptBR } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import Image from 'next/dist/client/image'
import { Plus } from 'mdi-material-ui'
import AddPrizeForm from 'src/@core/components/games/AddPrize'
import DeletePrizeModal from 'src/@core/components/games/DeletePrize'
import useModal from 'src/@core/hooks/useModal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  pt: 2,
  px: 4,
  pb: 3
}


const Games = () => {
  const [open, setOpen] = useState(false)
  const {selected, isShowing, close, open: openModal} = useModal();

  const router = useRouter()
  const { gameId } = router.query as any

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }


  const { data: game, isLoading, error } = useSWR(`/games/${gameId}`, {})

  // const {companies, company, changeCompany } = useCompanyContext();
  if (isLoading) return <div>Carregando...</div>
  if (error) return <div>Erro ao carregar {JSON.stringify(error)}</div>

return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Typography variant='h5'>Jogos: {game.name}</Typography>
          <Typography variant='body2'>Aqui você pode criar e gerenciar os jogos.</Typography>
        </Grid>
        <Grid container alignContent={'center'} justifyContent={'end'} xs={3}>
          <Grid item justifyContent={'end'}>
            <Button variant='contained' onClick={handleOpen}>
              <Plus />
              Adicionar prêmio
            </Button>
          </Grid>
        </Grid>

        <Grid item md={12}>
          <Grid container spacing={5}>
            {game.prizes.map((prize: any) => (
              <PrizeCard key={prize.prizeId} prize={prize} deleteFunction={
                () => openModal(prize)
              } />
            ))}
          </Grid>
        </Grid>
      </Grid>
      <DeletePrizeModal gameId={gameId} prize={selected} show={isShowing}  close={close}  />
      <Modal open={open} onClose={handleClose} closeAfterTransition disableAutoFocus={true}>
        <Fade in={open}>
          <Box sx={style}>
            <AddPrizeForm gameId={gameId as string}
            close={() => setOpen(false)} />
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default Games
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  [theme.breakpoints.up('md')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))
const PrizeCard = ({ prize, deleteFunction }: any) => {
  return (
    <Grid item md={6} sm={12}>
      <Card>
        <Grid container spacing={6}>
          <StyledGrid item >
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image objectFit='cover' className='rounded' alt={prize.name} src={prize.image} width={220} height={150} />
            </CardContent>
          </StyledGrid>
          <Grid
            item

            sx={{
              paddingTop: ['0 !important', '0 !important', '1.5rem !important'],
              paddingLeft: ['1.5rem !important', '1.5rem !important', '0 !important']
            }}
          >
            <CardContent sx={{ paddingBottom: 1 }}>
              <Typography variant='h6' sx={{ marginBottom: 0 }}>
                {prize.name}
              </Typography>
              <Typography sx={{ fontWeight: 500, marginBottom: 0 }}>
                Peso:{' '}
                <Box component='span' sx={{ fontWeight: 'bold' }}>
                  {prize.weight}
                </Box>
              </Typography>
              <Typography sx={{ fontWeight: 500, marginBottom: 0 }}>
                Probabilidade:{' '}
                <Box component='span' sx={{ fontWeight: 'bold' }}>
                  25%
                </Box>
              </Typography>
            </CardContent>
            <CardActions className='card-action-dense'>
              <Box sx={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
                <Button>Editar</Button>
                <Button onClick={deleteFunction}>Remover</Button>
              </Box>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}
