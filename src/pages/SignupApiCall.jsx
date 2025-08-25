import React, { useEffect, useState } from 'react'
import {
    Container,
    TextField,
    Typography,
    Box,
    Paper,

} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import axios from 'axios';


const SignupApiCall = () => {

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTcwNTk0YTE0OWFmMjY1OTBjN2E5NyIsImlhdCI6MTc1NTc3NjU2Nn0.gqEW6zR7Guo9As3AAY_nwSaVCbHuz8KOFbkLTlVweg8"

    const [list, setList] = useState([])
    const [ini, setIni] = useState({
        name: "",
        email: "",
        password: "",
        profile: ""
    })
    const [editId, setEditId] = useState(null)


    useEffect(() => {
        viewData()
    }, [])

    const viewData = () => {
        axios.get("http://localhost:3000/signup", {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {

                setList(res.data.data)
                //console.log(res.data.data);


            })
            .catch((error) => {
                console.log(error);

            })
    }


    const handleSubmit = (vaules, { resetForm }) => {

        const { _id, ...rest } = vaules


        if (editId != null) {
            axios.patch(`https://localhost:3000/signup/${editId}`, rest, {
                headers: {
                    Authorization: token
                }
            })
                .then((res) => {
                    viewData()
                    setEditId(null)
                    setIni({
                        name: "",
                        email: "",
                        password: "",
                        profile: ""

                    })
                })
        }

        else {
            axios.post("http://localhost:3000/signup", vaules, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(() => {
                    console.log("Data added successfully");

                    resetForm()
                    viewData()
                })

                .catch((error) => {
                    console.log(error);
                })
        }


    }

    const deleteData = (deleteId) => {
        axios.delete(`http://localhost:3000/signup/${deleteId}`, {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                console.log("Data Deleted Successfully");
                viewData()

            })
            .catch((error) => {
                console.log(error);

            })
    }

    const editData = (item) => {
        setIni(item)
        setEditId(item._id)
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

                            {({ setFieldValue }) => (
                                <Form encType='multipart/form-data'>

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


                                    <label htmlFor="profile" style={{
                                        display: 'flex',
                                        padding: '15px 20px',
                                        backgroundColor: '#1976d2',
                                        color: 'white',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        marginTop: '10px',

                                    }}>
                                        Upload Profile
                                    </label>

                                    <input
                                        type="file"
                                        name="profile"
                                        id="profile"
                                        style={{ display: 'none' }}
                                        onChange={(e) => setFieldValue("profile", e.target.files[0])}
                                    />
                                    <br /><br />

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
                            )}

                        </Formik>


                    </Box>


                </Paper>


            </Container>

            <table border={1}>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Profile</th>
                    <th>Delete</th>
                </tr>

                {
                    list.map((item, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.password}</td>
                            <td>{item.profile}</td>
                            <td><button onClick={() => deleteData(item._id)}>Delete</button></td>
                            <td><button onClick={() => editData(item)}>Edit</button></td>

                        </tr>
                    ))
                }
            </table>


        </>
    )
}

export default SignupApiCall
