import { Box, Container, ImageListItem, Grid } from '@mui/material'
import React from 'react'
import BreadCrumbsLinks from '../BreadCrumbsLinks'
import Image1 from '../../Assets/image1.jpeg'
import Image2 from '../../Assets/image2.jpeg'
import Image3 from '../../Assets/image3.jpeg'
import LandingNavbar from '../Navbar/NavbarComponent'
import WarehouseDescription from './WarehouseDescription'

const WarehouseDetailsComponent: React.FC = () => {
  return (
    <>
      <LandingNavbar Position="relative" />
      <Container>
        <BreadCrumbsLinks text="fds" link="/" />
        <Box sx={{ height: '100vh' }}>
          <Grid columnSpacing={{ xs: 1, sm: 2, md: 1 }} container>
            <Grid item xs={8}>
              <ImageListItem>
                <img src={Image1} srcSet={Image1} alt={'fdsdsfds'} loading="lazy" />
              </ImageListItem>
            </Grid>
            <Grid item xs={4}>
              <ImageListItem>
                <img src={Image2} srcSet={Image2} alt={'fdsdsfds'} loading="lazy" />
              </ImageListItem>
              <ImageListItem>
                <img src={Image3} srcSet={Image3} alt={'fdsdsfds'} loading="lazy" />
              </ImageListItem>
            </Grid>
          </Grid>
          <WarehouseDescription />
        </Box>
        v
      </Container>
    </>
  )
}

export default WarehouseDetailsComponent
