import React from 'react'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Divider,
  Link,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Field, Form, Formik } from 'formik';

const LoginApiCall = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    // Handle login logic here
    console.log({ email, password });







  }
  return (
    
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8, background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', }}>
        <Typography sx={{
          fontSize: "35px", fontWeight: 'bold',
          color: '#0d47a1',
        }} component="h1" variant="h5" align="center" gutterBottom>
          Login
        </Typography>



        <Formik>
          <Form>
            <Field name="email" component={TextField}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"

              type="email"
              autoComplete="email"
              autoFocus></Field>
            <Field
              component={TextField}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"></Field>
            <br /><br />

            <button type="submit" style={{ borderRadius: "5px", fontWeight: "500", backgroundColor: "#1d85eb", border: "none", width: "100%", padding: "10px", fontSize: "16px" }} >Submit</button>
          </Form>
        </Formik>



        <br /><br />
        <Divider sx={{ fontSize: "14px" }}>Not a member ? <Link href="/">Signup Now</Link></Divider>
      </Paper>
    </Container>
  )
}

export default LoginApiCall
