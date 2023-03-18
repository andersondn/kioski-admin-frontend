import { Button, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

// import { Container } from './styles';

const AddPrizeForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const onSubmit = (data: any) => console.log(data)

  const [file, setFile] = useState<File>()
  const [image, setImage] = useState<string>()
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
      console.log(e.target.files[0])
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = () => {
        console.log(reader.result)
        setImage(reader.result as string)
      }
    }
  }

  return (
    <>
      <h1>Add game</h1>
      {watch('example')}
     <form onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor='form-layouts-basic-password'>Password</InputLabel>
            <OutlinedInput
              label='Password'
              id='form-layouts-basic-password'
              aria-describedby='form-layouts-basic-password-helper'
              {...register('example', {required: true}) }
            />
            {/* <FormHelperText>
              Use 8 or more characters with a mix of letters, numbers & symbols
            </FormHelperText> */}
          </FormControl>
        </Grid>
      </form>

      <input

        // accept='image/*'
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id='raised-button-file'
        type='file'
      />
      <label htmlFor='raised-button-file'>
        <Button variant='contained' component='span'>
          Escolher imagem
        </Button>
      </label>
      <div>{file && `${file.name} - ${file.type}`}</div>
      {image && <img width='150px' src={image} alt='teste' />}
    </>
  )
}

export default AddPrizeForm
