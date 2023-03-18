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

const Clients = () => {
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

  const { data: clients, isLoading } = useSWR('/clients', {})

  // const {companies, company, changeCompany } = useCompanyContext();
  if (isLoading) return <div>Carregando...</div>

  const columns: GridColDef[]  = [
    { field: 'id', headerName: 'ID', width: 70  },
    { field: 'name', headerName: 'Nome', minWidth: 150, flex: 1 },
    { field: 'phoneNumber', headerName: 'Telefone', minWidth: 150},
    { field: 'createdAt', headerName: 'Data de criação', minWidth: 150 },
    {
      field: 'date',
      headerName: 'Ações',
      minWidth: 150,
      renderCell: (params: GridRenderCellParams<Date>) => (
        <strong>
          {/* {params.value.getFullYear()} */}
          <Button variant='contained' size='small' style={{ marginLeft: 16 }} tabIndex={params.hasFocus ? 0 : -1}>
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
          <Typography variant='h5'>Clientes</Typography>
          <Typography variant='body2'>Esses são os clientes do seu estabelecimento.</Typography>
        </Grid>
        {/* <Grid item justifyItems={'end'} xs={3}>
          <Button onClick={handleOpen}>Novo estabelecimento</Button>
        </Grid> */}

        <Grid item md={12}>
          <Card>
            <DataGrid
              rows={clients}
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

export default Clients
