import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, reviewProduct } from '../action/productActions'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating.component'
import Loader from '../components/loader'
import Message from '../components/message'
import { PRODUCT_REVIEW_RESET } from '../constants/productConstants'


const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const productReview = useSelector(state => state.productReview)
    const { error: reviewError, success: successReview } = productReview

    useEffect(() => {
        if(successReview){
            alert('Review Submitted')
            setRating(0)
            setComment('')
            dispatch({ type:PRODUCT_REVIEW_RESET })
        }
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match, successReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(reviewProduct(match.params.id, {rating, comment}))
    }

    return (
        <div>
            <Link className='btn btn-light my-3' to='/'>Go back</Link>
            {
                loading ? (
                    <Loader style={{margin: 'auto'}} />
                    ) : error ? (
                    <Message variant='danger'>{error}</Message>
                    ) : (<>
                        <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReview} reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>                    
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flash'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price: 
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status: 
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Qty: 
                                        </Col>
                                        <Col>
                                            <Form.Control as='select' value={qty} onChange={(e) =>
                                                setQty(e.target.value)
                                            }>{
                                                [...Array(product.countInStock).keys()].map(x => (
                                                    <option key={x + 1} value ={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button onClick={addToCartHandler} className='btn-block btn-dark' type='button' disabled={product.countInStock === 0}>
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h2>Reviews</h2>
                    {product.reviews.length === 0 && <Message>No reviews</Message>}
                    <ListGroup variant='flush'>
                        {product.reviews.map(review => (
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating value={review.rating}/>
                                <p>{review.createdAt.substring(0, 10)}</p>
                                <p>{review.comment}</p>

                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <h2>Write a Customer Review</h2>
                            {reviewError && <Message variant='danger'>{reviewError}</Message>}
                            {userInfo ? (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='rating'>
                                    <Form.Label>
                                        Rating
                                    </Form.Label>
                                    <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                        <option value=''>Select..</option>
                                        <option value='1'>1 -- Very Bad</option>
                                        <option value='2'>2 -- Bad</option>
                                        <option value='3'>3 -- Does the Job</option>
                                        <option value='4'>4 -- Solid</option>
                                        <option value='5'>5 -- Cracked and Goated</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='comment'>
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control as='textarea' value={comment} row='3' onChange={(e) => setComment(e.target.value)}>

                                    </Form.Control>

                                </Form.Group>
                                <Button type='submit' className='btn btn-block' variant='dark'>Submit</Button>
                            </Form>
                            ) : <Message>Please <Link to='/login'>Login</Link></Message>}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            </>
                    )
                    }
            
        </div>
        
    )
}

export default ProductScreen
