import { Box } from '@mui/material'
import React from 'react'
import MyLogo from '../../Assets/logo.png'

interface ILogoProps {
  ImgSize?: number
}

const Logo: React.FC<ILogoProps> = ({ ImgSize = 3.5 }) => {
  return (
    <Box sx={{ cursor: 'pointer' }}>
      <img style={{ height: `${ImgSize}rem` }} src={MyLogo} alt="my logo" />
    </Box>
  )
}

export default Logo
