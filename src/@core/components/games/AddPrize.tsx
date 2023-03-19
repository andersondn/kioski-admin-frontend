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
  gameId: string
  close: () => void
}

const AddPrizeForm = ({ gameId, close }: Props) => {
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
    const formData = new FormData()
    formData.append('files', data.image[0])
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('weight', data.weight)
    try {
      const response = await API.post(`/games/${gameId}/prizes`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (response.status === 200) {
        if (response.data) {
          mutate(`/games/${gameId}`)
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
            Adicionar Prêmio
          </Typography>
          {errors.image && (
            <Alert sx={{ mb: 4 }} severity='error'>
              Você precisa adicionar a imagem antes de salvar
            </Alert>
          )}
          <Grid container spacing={4}>
            <Grid item xs='auto' container direction='column' spacing={4}>
              <Grid item>
                {image ? (
                  <img
                    width='220px'
                    height={'150px'}
                    style={{ objectFit: 'cover', borderRadius: '6px' }}
                    src={image}
                    alt='Imagem adicionada'
                  />
                ) : (
                  <Avatar
                    variant='rounded'
                    sx={{
                      width: 220,
                      height: 150,
                      backgroundColor: `#eee`,
                      color: '#bbb'
                    }}
                  >
                    <ImageArea sx={{ fontSize: 120 }} />
                  </Avatar>
                )}
              </Grid>
              <Grid item>
                <input

                  // accept='image/*'
                  // onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id='premio-imagem'
                  {...register('image', {
                    onChange: handleFileChange,
                    required: true
                  })}
                  type='file'
                />
                <label htmlFor='premio-imagem'>
                  <Button fullWidth variant='contained' component='span' color='primary'>
                    Escolher Imagem
                  </Button>
                </label>
              </Grid>
            </Grid>
            <Grid item xs={12} sm container spacing={4} alignItems='center'>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Prêmio'
                  error={errors.name ? true : false}
                  helperText={errors.name ? 'Campo obrigatório' : ''}
                  {...register('name', { required: true })}
                  placeholder='Torta de limão'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  fullWidth
                  maxRows={4}
                  type='text'
                  label='Descrição'
                  placeholder='Descrição do item'
                  error={errors.description ? true : false}
                  helperText={errors.description ? 'Campo obrigatório' : ''}
                  {...register('description', { required: true })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label='Peso' placeholder='4' {...register('weight')} />
              </Grid>
              <Grid item xs={6}>
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

export default AddPrizeForm
