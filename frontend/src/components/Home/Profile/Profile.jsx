import React from 'react'
import { Container, Typography } from "@mui/material";

const Profile = () => {
  return (
    <>
      <Container sx={{ textAlign: "center" }}>
        <h1>Profile</h1>
        <Typography variant="body1">
          This is the Profile page
        </Typography>
      </Container>
    </>
  )
}

export default Profile