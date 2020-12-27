import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import CancelIcon from '@material-ui/icons/Cancel';
import { getUserDetails, updateUserProfile } from '../action/userAction'
import { myOrder } from '../action/orderActions'


function ProfileScreen({ location, history }) {
    const  [name, setName] = useState('')
    const  [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)

    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)

    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)

    const myOrderList = useSelector(state => state.myOrderList)

    const { loading:loadingOrders, orders, error:errorOrders } = myOrderList


    const { success } = userUpdateProfile


    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        } else {
            if(!user.name){
                dispatch(getUserDetails('profile'))
                dispatch(myOrder())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password do not match')
        } else{
            dispatch(updateUserProfile({ id:user._id, name, email, password }))
        }
        
    }
    return (
        <Row>
            <Col md={3}>
            <h1>User Profile</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>
                        User Name
                    </Form.Label>
                    <Form.Control type='name' placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>
                        Confirm Password
                    </Form.Label>
                    <Form.Control type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Button className='btn-dark' type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
                    <Table stripped bordered hover responsive className='table-sm'>
                        <thead>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                        <CancelIcon style={{color:'darkred'}}/>
                                    )}
                                    </td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                        <CancelIcon style={{color:'darkred'}}/>
                                    )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm' variant='dark'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>

    )
}


export default ProfileScreen
