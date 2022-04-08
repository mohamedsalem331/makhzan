import React from 'react'
import { Box } from '@mui/system'
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import { deepOrange } from '@mui/material/colors'
import { stringAvatar } from '../../utils/avatar-initials'

interface SideMenuProps {
  isLoggedIn?: boolean
  logoutUser: () => void
  userName?: string
}

const SideMenu: React.FC<SideMenuProps> = ({
  isLoggedIn,
  logoutUser,
  userName = 'jack nelson',
}) => {
  const [openSideMenu, setSideMenu] = React.useState<boolean>(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMenu = (e: React.MouseEvent<HTMLElement>) => {
    setSideMenu(true)
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setSideMenu(false)
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logoutUser()
    setSideMenu(false)
  }

  const MenuItems = isLoggedIn ? (
    <div>
      <MenuItem onClick={handleClose}>
        <Link to="/postwarehouse">Post Warehouse</Link>
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
            {isLoggedIn ? (
              <Avatar sx={{ bgcolor: deepOrange[500] }}>{stringAvatar(userName)}</Avatar>
            ) : (
              <MenuIcon color="primary" fontSize="large" />
            )}
          </IconButton>

          <Menu
            id="menu-appbar"
            open={openSideMenu}
            anchorEl={anchorEl}
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
