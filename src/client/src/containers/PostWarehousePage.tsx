import React, { useState } from 'react'
import {
  Button,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Fab,
  Badge,
  Select,
  MenuItem,
  ListItemText,
  OutlinedInput,
  CircularProgress,
} from '@mui/material'
import { Box } from '@mui/system'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios'

import { logout } from '../slices/UserLoginSlice'
import { formatRentValue } from '../utils/formatNumber'
import { services } from '../utils/constants'
import { postWarehouse } from '../slices/WarehouseCreationSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { IFormInput } from '../types'
import { RootState } from '../app/store'
import LandingNavbar from './LandingNavbar'
import CustomizedSnackBar from '../components/SnackBarComponent'

const initialState = {
  defaultValues: {
    title: '',
    description: '',
    size: 1000,
    rent: 100,
    governorate: 'Cairo',
    location: '6 October City',
    street: '112',
    services: [],
  },
}

const PostWarehouse: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { message, pending, error } = useAppSelector((state: RootState) => state.postWarehouse)

  // ===========================================================================
  // Actions
  // ===========================================================================

  const dispatch = useAppDispatch()

  const _logout = () => dispatch(logout())

  const _postWarehouse = (data: any) =>
    dispatch(postWarehouse(data))
      .unwrap()
      .then((originalPromiseResult) => {
        console.log(originalPromiseResult)
      })
      .catch((rejectedValue) => {
        if (rejectedValue.status === 401 || rejectedValue.status === 403) {
          _logout()
        }
      })

  // ===========================================================================
  // Hooks
  // ===========================================================================

  const [files, setFiles] = useState<Array<string>>([])
  const [images, setImages] = useState<Array<string>>([])

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>(initialState)

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const Myimages = await uploadImages()
    _postWarehouse({ ...data, images: Myimages })
  }

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let imgFile = event.target.files[0]

      setImages([...images, URL.createObjectURL(imgFile)])
      setFiles([...files, imgFile])
    }
  }

  const removeImage = (remImg: string): void => {
    const newImgs = images.filter((img) => {
      return img !== remImg
    })
    setImages(newImgs)
  }

  const uploadImages = async () => {
    try {
      const formData = new FormData()
      files.forEach((file) => formData.append('avatar', file))
      const response = await axios({
        method: 'post',
        url: `http://localhost:5000/uploads`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      })
      return response.data.myImages
    } catch (error) {
      console.log(error)
    }
  }

  const descLen = watch().description.length

  return (
    <>
      <LandingNavbar />
      {!!message && <CustomizedSnackBar AlertOn={true} Message={message} />}
      {!!error && <CustomizedSnackBar AlertOn={true} Message={error} Severity="error" />}
      {pending && <CircularProgress />}

      <Container maxWidth="sm" sx={{ marginY: '3rem' }}>
        <Box sx={{ height: '150vh' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction={'column'} spacing={4}>
              <Controller
                name="title"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors.title}
                    helperText={!!errors.title && 'Incorrect entry.'}
                    label="Title"
                    placeholder="Title"
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                rules={{ required: true, maxLength: 300 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    rows={8}
                    error={!!errors.description || descLen >= 300}
                    helperText={descLen + ' / 300'}
                    multiline
                    label="Description"
                    placeholder="Description"
                  />
                )}
              />
              <Controller
                name="size"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Tooltip title="This is the size of your warehouse in square meter">
                    <TextField
                      type="number"
                      {...field}
                      label="Size"
                      placeholder="Size"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Sqm</InputAdornment>,
                      }}
                      error={!!errors.size}
                      helperText={!!errors.size && 'Incorrect entry.'}
                    />
                  </Tooltip>
                )}
              />
              <Controller
                name="rent"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Tooltip title="This is the rent value you desire for your warehouse per month">
                    <TextField
                      {...field}
                      label="Rent"
                      placeholder="Rent"
                      onChange={(e) => field.onChange(formatRentValue(e.target.value))}
                      error={!!errors.rent}
                      helperText={!!errors.rent && 'Incorrect entry.'}
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
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Governorate"
                    placeholder="Governorate"
                    error={!!errors.governorate}
                    helperText={!!errors.governorate && 'Incorrect entry.'}
                  />
                )}
              />
              <Controller
                name="location"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Location"
                    placeholder="Location"
                    error={!!errors.location}
                    helperText={!!errors.location && 'Incorrect entry.'}
                  />
                )}
              />
              ``
              <Controller
                name="street"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Street"
                    placeholder="Street"
                    error={!!errors.street}
                    helperText={!!errors.street && 'Incorrect entry.'}
                  />
                )}
              />
              <Controller
                name="services"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    input={<OutlinedInput label="Name" />}
                    multiple
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {services.map(({ label, Icon }) => (
                      <MenuItem key={label} value={label}>
                        <Icon />
                        <ListItemText primary={label} sx={{ marginLeft: '1rem' }} />
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <Stack direction="row" spacing={3} justifyContent="center">
                {Array(3)
                  .fill('')
                  .map((_, indx) =>
                    images[indx] ? (
                      <div key={indx}>
                        <Badge
                          onClick={() => removeImage(images[indx])}
                          color="secondary"
                          badgeContent={<CloseIcon />}
                        >
                          <img src={images[indx]} width="150" alt="" />
                        </Badge>
                      </div>
                    ) : (
                      <div key={indx}>
                        <Fab size="large" color="secondary" aria-label="add">
                          <label htmlFor="files">
                            <AddPhotoAlternateIcon fontSize="large" />
                          </label>
                        </Fab>
                      </div>
                    )
                  )}
              </Stack>
            </Stack>
            <Button
              color="primary"
              variant="contained"
              sx={{ marginY: '3rem' }}
              type="submit"
              disabled={Object.keys(errors).length > 0 || images.length < 1}
            >
              Create Warehouse
            </Button>
          </form>
        </Box>
      </Container>
      <input
        style={{ display: 'none' }}
        id="files"
        type="file"
        name="avatar"
        onChange={onImageChange}
      />
    </>
  )
}

export default PostWarehouse
