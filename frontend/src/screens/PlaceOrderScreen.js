import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message'
import CheckoutSteps from '../components/CheckoutSteps'
import { Link } from 'react-router-dom'
import { createOrder } from '../action/orderActions'

const PlaceOrderScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)

    const dispatch = useDispatch()

    const addDecimals = (num) => {
        return (Math.round(num*100) / 100).toFixed(2)
    }
    
    // calculate price
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)

    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))

    cart.totalPrice = addDecimals((Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2))

    const orderCreate = useSelector(state => state.orderCreate)

    const { order, success, error } = orderCreate

    useEffect(() => {
        if(success){
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            taxPrice: cart.taxPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice
        }))
    }
    
    return (
        <>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address},{'  '}
                                {cart.shippingAddress.city},{'  '}
                                {cart.shippingAddress.postalCode},{'  '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        
                        
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                        </ListGroup.Item>
                        
                        
                        <ListGroup.Item>
                            <h2>Orders</h2>
                            {cart.cartItems.length === 0 ? <Message>Your Cart is Empty</Message>:(
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link style={{textDecoration:'none', color:'black'}} to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${addDecimals((item.qty * item.price).toFixed(2))}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Col>Items</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Col>Shipping</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Col>Tax</Col>
                                <Col>${cart.taxPrice}</Col>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Col>Total</Col>
                                <Col>${cart.totalPrice}</Col>
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button type='button' className='btn-dark btn-block' disabled={cart.cartItems === 0} onClick={placeOrderHandler} variant='primary'>
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
