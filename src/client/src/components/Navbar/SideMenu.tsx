import React, { useState } from 'react'
import Logo from './Logo'
import { Box } from '@mui/system'
import {
  Avatar,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { Link } from 'react-router-dom'

import '../../styles/LandingNavbar.css'
import MenuIcon from '@mui/icons-material/Menu'

interface SideMenuProps {
  isLoggedIn?: boolean
  logoutUser?: () => Promise<void>
  error?: string
  loading?: boolean
}

const SideMenu: React.FC<SideMenuProps> = ({ isLoggedIn, logoutUser, loading, error }) => {
  const [openSideMenu, setSideMenu] = React.useState<boolean>(false)

  const handleMenu = () => {
    setSideMenu(true)
  }

  const handleClose = () => {
    setSideMenu(false)
  }
  return (
    <>
      <Box>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon color="primary" fontSize="large" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={null}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openSideMenu}
            onClose={handleClose}
          >
            {!!isLoggedIn ? (
              <div>
                <MenuItem onClick={handleClose}>PostWarehouse</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </div>
            ) : (
              <div>
                <MenuItem onClick={handleClose}>Login</MenuItem>
                <MenuItem onClick={handleClose}>Register</MenuItem>
              </div>
            )}
          </Menu>
        </div>
      </Box>
    </>
  )
}

export default SideMenu
