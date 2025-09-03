import React, { useEffect, useState } from 'react'
import {
    Container,
    TextField,
    Typography,
    Box,
    Paper,
    Button,
    Divider,
    Link,

} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const SignupApiCall = () => {

    const [fileName, setFileName] = useState('');

    const handleChange = (e) => {
        // console.log(e.target.files[0]);

        setFileName(e.target.files[0]);

    };

    const [isHovered, setIsHovered] = useState(false);
    const buttonStyle = {
        backgroundColor: isHovered ? '#15c03aff' : '#0da150ff', // darker on hover
        color: '#fff',
        padding: "10px 30px",
        border: "none",
        borderRadius: "5px",
        fontSize: "20px",
        cursor: "pointer",
        transition: "background-color 0.3s ease"
    };

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YjE4ZGE1ODRmZmM2MzNmOGIwZTQ2NSIsImlhdCI6MTc1NjQ2NjYzMn0.xqRJt7lc3SB0PssyoKz4tnvs7m6uDJI2kt2nx3fXCxk"

    const [list, setList] = useState([])
    const [ini, setIni] = useState({
        name: "",
        email: "",
        password: "",
        profile: ""
    })
    const [editId, setEditId] = useState(null)

    const history = useHistory()

    useEffect(() => {
        viewData()
    }, [])

    const viewData = () => {

        console.log("view data token ==> ", token);

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


    const handleSubmit = (values, { resetForm }) => {

        const { _id, ...rest } = values


        if (editId != null) {
            axios.patch(`http://localhost:3000/signup/${editId}`, rest, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'multipart/form-data'

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
                    setFileName('')

                })

                .catch((error) => {
                    console.log(error);

                })

            console.log("==>", rest);

        }

        else {

            values.profile = fileName

            axios.post("http://localhost:3000/signup", values, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(() => {
                    console.log("Data added successfully");
                    resetForm()
                    viewData()
                    setFileName('')
                    history.push('/loginPage');

                })

                .catch((error) => {
                    console.log(error);
                })
        }


    }

    const deleteData = (deleteId) => {

        console.log("token ==> ", token);


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
                            enableReinitialize
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
                                        label="Create Password"
                                        fullWidth
                                        variant="outlined"
                                        margin="normal"></Field><br />


                                    <label htmlFor="profile" style={{
                                        display: 'block',
                                        width: '100%',
                                        padding: '10px 20px',
                                        backgroundColor: '#70a3d7',
                                        color: 'black',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        marginTop: '16px',
                                        boxSizing: 'border-box'
                                    }}>
                                        Upload Profile
                                    </label>

                                    <input
                                        type="file"
                                        id="profile"
                                        style={{ display: 'none' }}
                                        //onChange={(e) => setFieldValue("profile", e.target.files[0])}
                                        onChange={handleChange}
                                    />


                                    {fileName.name && (
                                        <div style={{ marginTop: '10px' }}>
                                            Selected file: <strong>{fileName.name}</strong>
                                        </div>
                                    )}
                                    <br /><br />
                                    <button
                                        type="submit"
                                        style={buttonStyle}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                    >
                                        Create
                                    </button>


                                </Form>
                            )}

                        </Formik>

                        <Typography variant="h6" component="h2" sx={{ fontSize: "14px", margin: "15px 0" }}>
                            By clicking the sign up button, you agree to our <a href="">Terms and Conditions</a> and <a href="">Policy and Privacy</a>.
                        </Typography>
                    </Box>

                    <Box sx={{ margin: "15px 0" }}>

                        <Divider sx={{ fontSize: "14px" }}>Already have an account? <Link href="/loginPage" sx={{ color: "#0da150ff", fontSize: "16px" }}>Login here</Link></Divider>
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
                    <th>Edit</th>
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
