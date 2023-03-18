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
  styled
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

const Games = () => {
  const [open, setOpen] = useState(false)

  const router = useRouter()
  const { gameId } = router.query

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

  const { data: game, isLoading, error } = useSWR(`/games/${gameId}`, {})

  // const {companies, company, changeCompany } = useCompanyContext();
  if (isLoading) return <div>Carregando...</div>
  if (error) return <div>Erro ao carregar {JSON.stringify(error)}</div>

  const columns: GridColDef[] = [
    {
      field: 'image',
      headerName: 'Imagem',
      minWidth: 150,
      align: 'center',
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams<Date>) => (
        <Image src='https://picsum.photos/200' width={150} height={200} />
      )
    },

    // { field: 'gameId', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nome', minWidth: 150, flex: 0.5, disableColumnMenu: true, sortable: false },
    { field: 'weight', headerName: 'Peso', minWidth: 50, disableColumnMenu: true, sortable: false },
    { field: 'createdAt', headerName: 'Ações', minWidth: 100, disableColumnMenu: true, sortable: false }
  ]

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Typography variant='h5'>{game.name}</Typography>
          <Typography variant='body2'>Aqui você pode criar e gerenciar os jogos.</Typography>
        </Grid>
        <Grid container alignContent={'center'} justifyContent={'end'} xs={3}>
          <Grid item justifyContent={'end'}>
            <Button variant='contained' onClick={handleOpen}>
              <Plus />
              Adicionar premio
            </Button>
          </Grid>
        </Grid>

        <Grid item md={12}>
          <Grid container spacing={5}>
            {game.prizes.map((prize: any) => (
              <PrizeCard key={prize.prizeId} prize={prize} />
            ))}
          </Grid>
        </Grid>
      </Grid>

          <AddPrizeForm />

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

export default Games
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('md')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))
const PrizeCard = ({ prize }: any) => {
  return (
    <Grid item sm={6}>
      <Card>
        <Grid container spacing={6}>
          <StyledGrid item xs={5}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* <img width={107} height={90} alt='Apple iPhone 11 Pro' src='/images/cards/iPhone-11-pro.png' /> */}
              <Image className='rounded' alt={prize.name} src='https://picsum.photos/200' width={200} height={120} />
            </CardContent>
          </StyledGrid>
          <Grid
            item
            xs={7}
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
                <Button>Remover</Button>
              </Box>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}
