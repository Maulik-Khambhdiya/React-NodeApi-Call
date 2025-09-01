import React, { useState } from 'react'
import {
  Container,
  TextField,
  Typography,
  Paper,
  Divider,
  Link,
} from '@mui/material';

import { useHistory } from 'react-router-dom';

import { Field, Form, Formik } from 'formik';
import axios from 'axios';

const LoginApiCall = () => {

  const history = useHistory();
  const [ini, setIni] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = (values, { resetForm }) => {
    axios.post("http://localhost:3000/signup/login", values)
      .then((res) => {
        console.log("Login Successful");
        resetForm()
        history.push('/product');

      })

      .catch((error) => {
        console.log(error);

      })
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

        <Formik
          enableReinitialize
          initialValues={ini}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field name="email"
              as={TextField}
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"></Field><br />



            <Field name="password"
              as={TextField}
              label="Create Password"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"></Field><br />
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
