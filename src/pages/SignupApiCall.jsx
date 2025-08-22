import React, { useState } from 'react'
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    Stack,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import axios from 'axios';


const SignupApiCall = () => {



    const [list, setList] = useState([])
    const [ini, setIni] = useState({
        name: "",
        email: "",
        password: "",
        profile: ""
    })



    const handleSubmit = (vaules) => {

        axios.post("localhost:3000/signup", vaules)
            .then((res) => {
                console.log(res.data);

            })
            .catch((error) => {
                console.log(error);

            })

    }


    return (
        <>
            <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
                <Paper
                    elevation={6}
                    sx={{
                        p: 4,
                        width: '100%',
                        borderRadius: 4,
                        background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                    }}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            color: '#0d47a1',
                        }}
                    >
                        Sign Up
                    </Typography>

                    <Box sx={{ textAlign: "center" }}>
                        <Formik

                            initialValues={ini}
                            onSubmit={handleSubmit}
                        >
                            <Form>

                                <Field name="name"
                                    as={TextField}
                                    label="Name"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"></Field><br />


                                <Field name="email"
                                    as={TextField}
                                    label="Email"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"></Field><br />



                                <Field name="password"
                                    as={TextField}
                                    label="Password"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"></Field><br />


                                <Field name="profile"

                                    type="file"

                                    label="Profile"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"></Field><br /><br />

                                <button type="submit" fullWidth


                                    style={{
                                        backgroundColor: '#0d47a1',
                                        color: '#fff',
                                        padding: "10px 30px",
                                        border: "none",
                                        borderRadius: "5px",
                                        fontSize: "20px",

                                    }}

                                >Create</button>


                            </Form>
                        </Formik>

                    </Box>


                </Paper>
            </Container>

        </>
    )
}

export default SignupApiCall
