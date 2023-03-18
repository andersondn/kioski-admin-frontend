// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { useState } from 'react'
import useSWR from 'swr'
import CompanyList from 'src/views/company/table'
import { useCompanyContext } from 'src/@core/context/CompanyContext'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams, ptBR } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import { Plus } from 'mdi-material-ui'

const Games = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const showGameDetails = (gameId: string) => {
    console.log(gameId)
    router.push(`/jogos/${gameId}`)
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

  const { data: games, isLoading } = useSWR('/games', {})

  // const {companies, company, changeCompany } = useCompanyContext();
  if (isLoading) return <div>Carregando...</div>

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', minWidth: 150, flex: 0.5 },
    { field: 'price', headerName: 'Custo', minWidth: 150 },
    { field: 'createdAt', headerName: 'Data de criação', minWidth: 150 },
    {
      field: 'id',
      headerName: 'Ações',
      minWidth: 150,
      renderCell: (params: GridRenderCellParams<Date>) => (
        <strong>
        s  <Button
            variant='contained'
            onClick={() => showGameDetails(params.value)}
            size='small'
            style={{ marginLeft: 16 }}
            tabIndex={params.hasFocus ? 0 : -1}
          >
            Detalhes
          </Button>
        </strong>
      )
    }
  ]

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Typography variant='h5'>Jogos</Typography>
          <Typography variant='body2'>Aqui você pode criar e gerenciar os jogos.</Typography>
        </Grid>
        <Grid container alignContent={'center'} justifyContent={'end'} xs={3}>
          <Grid item justifyContent={'end'}>
            <Button variant='contained' onClick={handleOpen}>
              <Plus />
              Novo jogo
            </Button>
          </Grid>
        </Grid>

        <Grid item md={12}>
          <Card>
            <DataGrid
              rows={games}
              columns={columns}
              autoHeight
              getRowId={row => row.id}
              rowSelection={false}
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            />
            {/* </CardContent> */}
          </Card>
          {/* {JSON.stringify(companies)} */}
          {/* {JSON.stringify(clients)} */}
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

export default Games
