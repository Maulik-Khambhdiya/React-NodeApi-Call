import { Box, Typography, Divider, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import PixIcon from '@mui/icons-material/Pix';

const Product = () => {
  const [hover, setHover] = useState(false);
  const [hover1, setHover1] = useState(false);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YjE4ZGE1ODRmZmM2MzNmOGIwZTQ2NSIsImlhdCI6MTc1NjQ2NjYzMn0.xqRJt7lc3SB0PssyoKz4tnvs7m6uDJI2kt2nx3fXCxk"

  const [ini, setIni] = useState({
    name: "",
    price: "",
    images: ""
  })
  const [list, setList] = useState([])

  useEffect(() => {
    viewData()
  }, [])

  const viewData = () => {
    axios.get("http://localhost:3000/product", {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        setList(res.data.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handleSubmit = (values, { resetForm }) => {
    axios.post("http://localhost:3000/product", values, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data"
      }
    })
      .then((res) => {
        console.log("Product Added Successfully");

        resetForm()
        setIni({
          images: ""
        })
        viewData()
      })
      .catch((error) => {
        console.log(error);

      })
  }






  return (
    <>
      <Box sx={{ textAlign: 'center', mt: 4, mb: 2 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            textTransform: 'uppercase',
            letterSpacing: 2
          }}
        >
          🔥 Trending Products
        </Typography>
        <Divider sx={{ mt: 1, mb: 2, width: '60%', mx: 'auto' }} />

        <Formik
          initialValues={ini}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form encType='multipart/form-data'>
              <Field name="name"></Field>
              <Field name="price"></Field>
              <input type="file" name="images" id="" onClick={(e) => setFieldValue("images", e.target.files[0])} />
              <button type="submit">Add</button>
            </Form>
          )}
        </Formik>

        <br /><br />
        <Box>

          <Typography variant="h5" gutterBottom>
            🧾 Product List
          </Typography>

          <TableContainer component={Paper} sx={{ maxWidth: 900, mx: 'auto', mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#1976d2' }}>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Price</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Image</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Remove Product</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Edit Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>₹{item.price}</TableCell>

                    <TableCell>
                      {
                        item.images
                          ? <img src={`http://localhost:3000/uploads/${item.images}`} alt="product" width={80} />
                          : <em>No Image</em>
                      }
                    </TableCell>
                    <TableCell><button className='hover'><DeleteIcon sx={{ fontSize: "28px" }} /></button></TableCell>

                    <TableCell><button onMouseEnter={() => setHover1(true)}
                      onMouseLeave={() => setHover1(false)}
                      style={{
                        color: '#002f96ff',
                        backgroundColor: hover1 ? 'rgba(0, 38, 255, 0.1)' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        transform: hover1 ? 'scale(1.2)' : 'scale(1)',
                        transition: 'all 0.3s ease',
                        padding: '8px',
                        borderRadius: '50%',
                      }}><PixIcon sx={{ fontSize: "28px" }} /></button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </Box>

        {/* <table border={1}>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Images</th>
          </tr>

          {
            list.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.images}</td>
              </tr>
            ))
          }
        </table> */}
      </Box>
    </>
  )
}

export default Product
