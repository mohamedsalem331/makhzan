import React from 'react'
import { Box } from '@mui/system'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'

interface SideMenuProps {
  isLoggedIn?: boolean
  logoutUser: () => void
}

const SideMenu: React.FC<SideMenuProps> = ({ isLoggedIn, logoutUser }) => {
  const [openSideMenu, setSideMenu] = React.useState<boolean>(false)

  const handleMenu = () => {
    setSideMenu(true)
  }

  const handleClose = () => {
    setSideMenu(false)
  }

  const handleLogout = () => {
    logoutUser()
    setSideMenu(false)
  }

  const MenuItems = isLoggedIn ? (
    <div>
      <MenuItem onClick={handleClose}>
        <Link to="/postwarehouse">PostWarehouse</Link>
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </div>
  ) : (
    <div>
      <MenuItem onClick={handleClose}>
        <Link to="/login">Login</Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Link to="/register">Register</Link>
      </MenuItem>
    </div>
  )

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
            open={openSideMenu}
            onClose={handleClose}
            keepMounted
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {MenuItems}
          </Menu>
        </div>
      </Box>
    </>
  )
}

export default SideMenu
