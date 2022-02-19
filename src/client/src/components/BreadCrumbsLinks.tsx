import React from 'react'
import { Breadcrumbs, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

interface LinkProps {
  text: string
  link?: string
}

const BreadCrumbsLinks: React.FC<LinkProps> = ({ text, link = '/' }) => {
  return (
    <>
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/">Home</Link>
          <Link to={link}>{text}</Link>
        </Breadcrumbs>
      </div>
    </>
  )
}

export default BreadCrumbsLinks
