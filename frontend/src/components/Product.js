import React from 'react'
import { Card, Button } from 'react-bootstrap'
import '../index.css'
import Rating from './Rating.component'
import { Link } from 'react-router-dom'

function Product({ product }) {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img variant="top" src={product.image} />
            </Link>
            
            <Card.Body>
                <Link className='nameLink' to={`/product/${product._id}`}> 
                    <Card.Title style={{fontSize:'15px'}}>{product.name}</Card.Title>
                </Link>
                
                <Card.Text as='h3'>
                    ${product.price}
                </Card.Text>
                <Card.Text>
                    <Rating value={product.rating} text={`${product.numReview} reviews`} />
                </Card.Text>
                <Link className='nameLink' to={`/product/${product._id}`}> 
                    <Button variant="primary" className='btn-dark'>View Product</Button>
                </Link>
                
            </Card.Body>
        </Card>
    )
}

export default Product
