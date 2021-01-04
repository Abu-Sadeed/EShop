import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import { listProductDetails } from '../action/productActions'
import FromContainer from '../components/FromContainer'

function ProductEditScreen({ match, history }) {
 
    const productId = match.params.id
    const  [name, setName] = useState('')
    const  [price, setPrice] = useState(0)
    const  [image, setImage] = useState('')
    const  [brand, setBrand] = useState('')
    const  [category, setCategory] = useState(0)
    const  [countInStock, setCountInStock] = useState('')
    const  [description, setDescription] = useState('')


    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)

    const { loading, error, product } = productDetails

    useEffect(() => {
       
            if(!product.name || product._id !== productId){
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
                
            }
        

        
    }, [dispatch, productId, product])

    const submitHandler = (e) => {
        e.preventDefault()
        //     
    }
     
    return (
        <>
            <Link to='/admin/productlist' className='btn btn-dark my-3'>
                Go back
            </Link>

            <FromContainer>
            <h1>Edit Product</h1>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>:(
                <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>
                        Product Name
                    </Form.Label>
                    <Form.Control type='name' placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='price'>
                    <Form.Label>
                        Price Address
                    </Form.Label>
                    <Form.Control type='number' placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                    <Form.Label>
                        Image
                    </Form.Label>
                    <Form.Control type='text' placeholder='Enter image url' value={image} onChange={(e) => setImage(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='brand'>
                    <Form.Label>
                        Brand
                    </Form.Label>
                    <Form.Control type='text' placeholder='Brand Name' value={brand} onChange={(e) => setBrand(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='countInStock'>
                    <Form.Label>
                        Stock
                    </Form.Label>
                    <Form.Control type='number' placeholder='Stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                    <Form.Label>
                       Category
                    </Form.Label>
                    <Form.Control type='text' placeholder='Enter Category' value={category} onChange={(e) => setCategory(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                    <Form.Label>
                       Description
                    </Form.Label>
                    <Form.Control type='text' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Button className='btn-dark' type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
            )}
            
        </FromContainer>
        </>
        
    )
}

export default ProductEditScreen
