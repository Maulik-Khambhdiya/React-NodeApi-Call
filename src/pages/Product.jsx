import { Box, Typography, Divider, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Product = () => {

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
          name: "",
          price: "",
          images: ""
        })
        viewData()
      })
      .catch((error) => {
        console.log(error);

      })
  }


  const deleteData = (deleteId) => {
    console.log("==>", deleteId);
    console.log("token my==> ", token);
    axios.delete(`http://localhost:3000/product/${deleteId}`, {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        console.log("Product Delete Successfully");
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
          enableReinitialize
          initialValues={ini}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <div className="form-page">
              <h2>Add Product</h2>
              <Form encType="multipart/form-data" className="form-container">

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <Field name="name" className="form-input" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <Field name="price" className="form-input" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="images">Image:</label>
                  <input
                    type="file"
                    name="images"
                    id=""

                    onClick={(e) => setFieldValue("images", e.target.files[0])}
                    className="form-input"
                  />
                </div>

                <button type="submit" className="submit-button">Add</button>
              </Form>
            </div>
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
                    <TableCell><button className='hover-bin' onClick={() => deleteData(item._id)}><DeleteIcon sx={{ fontSize: "28px" }} /></button></TableCell>

                    <TableCell><button className='hover-edit'><EditIcon sx={{ fontSize: "28px" }} /></button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </Box>


      </Box>
    </>
  )
}

export default Product
