import {
  Button,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Autocomplete,
  Fab,
  TextareaAutosize,
  Badge,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useRef, useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import LandingNavbar from '../components/Navbar/NavbarComponent'
import { formatRentValue } from '../utils/formatNumber'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import CloseIcon from '@mui/icons-material/Close'
interface IFormInput {
  title: string
  description: string
  size: number
  rent: number
  governorate: string
  location: string
  street: string
  Services: string
}

import { services } from '../utils/constants'

const PostWarehouse: React.FC = () => {
  const [images, setImages] = useState<Array<string>>([])

  const { control, handleSubmit } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data)
  }
  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0]
      setImages([...images, URL.createObjectURL(img)])
    }

    // render snacbar componenet with error if images more than 3
  }

  const removeImage = (remImg: string): void => {
    const newImgs = images.filter((img) => {
      return img !== remImg
    })
    setImages(newImgs)
  }

  return (
    <>
      <LandingNavbar Position="relative" />

      <Container maxWidth="sm" sx={{ marginY: '3rem' }}>
        <Box sx={{ height: '150vh' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction={'column'} spacing={4}>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField {...field} label="Title" placeholder="Title" />}
              />
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    rows={8}
                    helperText="Some important text"
                    multiline
                    {...field}
                    label="Description"
                    placeholder="Description"
                  />
                )}
              />
              <Controller
                name="size"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <TextField type="number" {...field} label="Size" placeholder="Size" />
                )}
              />
              <Controller
                name="rent"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <Tooltip title="This is the rent value you desire for your warehouse per month">
                    <TextField
                      {...field}
                      label="Rent"
                      placeholder="Rent"
                      onChange={(e) => field.onChange(formatRentValue(e.target.value))}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">E£</InputAdornment>,
                      }}
                    />
                  </Tooltip>
                )}
              />
              <Controller
                name="governorate"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="Governorate" placeholder="Governorate" />
                )}
              />
              <Controller
                name="location"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="Location" placeholder="Location" />
                )}
              />
              ``
              <Controller
                name="street"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField {...field} label="Street" placeholder="Street" />}
              />
              <Controller
                name="Services"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={services}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => <TextField {...params} {...field} label="Services" />}
                  />
                )}
              />
              <Stack direction="row" spacing={3} justifyContent="center">
                {Array(3)
                  .fill('')
                  .map((_, indx) =>
                    images[indx] ? (
                      <Badge
                        onClick={() => removeImage(images[indx])}
                        color="secondary"
                        badgeContent={<CloseIcon />}
                      >
                        <img src={images[indx]} width="150" height="150" alt="" />
                      </Badge>
                    ) : (
                      <Fab size="large" color="secondary" aria-label="add">
                        <label htmlFor="files">
                          <AddPhotoAlternateIcon fontSize="large" />
                        </label>
                      </Fab>
                    )
                  )}
              </Stack>
            </Stack>
            <Button color="primary" variant="contained" sx={{ marginY: '3rem' }} type="submit">
              Create Warehouse
            </Button>
          </form>
        </Box>
      </Container>
      <input
        style={{ display: 'none' }}
        id="files"
        type="file"
        name="myImage"
        onChange={onImageChange}
      />
    </>
  )
}

{
  /* <Button variant="contained" component="label">
        Upload File
        <input onChange={onChange} type="file" hidden />
      </Button>
      <img width={100} src={img} /> */
}

export default PostWarehouse
