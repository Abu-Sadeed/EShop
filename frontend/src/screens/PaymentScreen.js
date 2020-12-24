import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FromContainer from '../components/FromContainer'
import { savePaymentMethod } from '../action/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

function PaymentScreen({ history }) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if(!shippingAddress){
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FromContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                
                <Form.Group>
                    <Form.Label as='legend'>
                        Select Method
                    </Form.Label>
                
                <Col>
                    <Form.Check 
                        type='radio' 
                        label='PayPal or Card' 
                        id='PayPal' 
                        name='paymentMethod'
                        value='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >

                    </Form.Check>

                    <Form.Check 
                        type='radio' 
                        label='bKash' 
                        id='bKash' 
                        name='paymentMethod'
                        value='bKash'
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >

                    </Form.Check>
                </Col>
                </Form.Group>

                <Button className='btn-dark' type='submit' variant='primary'>Continue</Button>
            </Form>
        </FromContainer>
    )
}

export default PaymentScreen
