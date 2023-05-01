import { LoadingButton } from '@mui/lab'
import {
  Alert,
  Avatar,
  Backdrop,
  Button,
  Grid,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { CheckCircle, ImageArea } from 'mdi-material-ui'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import API from 'src/services/api'
import { useSWRConfig } from 'swr'

// import { Container } from './styles';

interface Props {
  close: () => void
}

const AddGameForm = ({close}: Props) => {
  const [image, setImage] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()
  const { mutate } = useSWRConfig()

  const onSubmit = async (data: any) => {
    setLoading(true)
    const formData = {
      name: data.name,
      description: data.description,
      price: data.price
    }

    try {
      const response = await API.post(`/games/create`, formData)
      if (response.status === 200) {
        if (response.data) {
          mutate(`/games`)
          close()
        }
      } else {
        console.log('error')
      }
    } catch (error) {}
    setLoading(false)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = () => {
        setImage(reader.result as string)
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper
          sx={{
            px: 6,
            py: 4,
            margin: 'auto',
            backgroundColor: theme => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff')
          }}
        >
          <Typography variant='h5' sx={{ pb: 4 }}>
           Criar novo jogo
          </Typography>
          {errors.image && (
            <Alert sx={{ mb: 4 }} severity='error'>
              Você precisa adicionar a imagem antes de salvar
            </Alert>
          )}
          <Grid container spacing={4}>

            <Grid item xs={12} sm container spacing={4} alignItems='center'>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Nome do jogo'
                  error={errors.name ? true : false}
                  helperText={errors.name ? 'Campo obrigatório' : ''}
                  {...register('name', { required: true })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  fullWidth
                  maxRows={4}
                  type='text'
                  label='Descrição'
                  placeholder='Descrição do jogo'
                  error={errors.description ? true : false}
                  helperText={errors.description ? 'Campo obrigatório' : ''}
                  {...register('description', { required: false })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label='Custo' placeholder='4' {...register('price')} />
              </Grid>
              <Grid item xs={12}>
                {/* <Button fullWidth variant='contained' type='submit' color='primary'>
                  Salvar
                </Button> */}
                <LoadingButton
                  loading={loading}
                  fullWidth
                  color='primary'
                  variant='contained'
                  type='submit'
                  loadingPosition='start'
                  startIcon={<CheckCircle />}
                >
                  {loading ? 'Salvando...' : 'Salvar'}
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </>
  )
}

export default AddGameForm
