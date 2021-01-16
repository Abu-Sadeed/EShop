import React, {  useEffect } from 'react'
import { Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import CancelIcon from '@material-ui/icons/Cancel';
import { getOrder } from '../action/orderActions'


function OrderListScreen({ location, history }) {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)

    const { userInfo } = userLogin

    const orderList = useSelector(state => state.orderList)

    const { loading:loadingOrders, orders, error:errorOrders } = orderList

    console.log(orders)


    useEffect(() => {
        if(!userInfo && userInfo.data.isAdmin !== true){
            history.push('/login')
        } else {
                dispatch(getOrder())
        }
    }, [dispatch, history, userInfo])

    return (
        <Row>
            <Col md={9}>
                <h2>All Orders</h2>
                {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
                    <Table stripped bordered hover responsive className='table-sm'>
                        <thead>
                            <th>ID</th>
                            <th>Customer Name</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>Payment Method</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user.name}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.paymentMethod}</td>
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


export default OrderListScreen
