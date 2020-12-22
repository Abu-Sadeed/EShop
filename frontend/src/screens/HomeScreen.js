import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/Product'
import { Row, Col } from 'react-bootstrap'
import { listProducts } from '../action/productActions'
import Loader from '../components/loader'
import Message from '../components/message'


function HomeScreen() {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <>
            <h1>Latest Product</h1>
            {
                loading ? (
                    <Loader style={{margin: 'auto'}} />
                    ) : error ? (
                    <Message variant='danger'>{error}</Message>
                    ) : (
                        <Row>
                            {products.map(product => (
                            <Col key={product._id} sm ={12} md={6} lg={4} xl={3}>
                                <ProductCard product={product} />
                            </Col>
                             ))}
                        </Row>
                    ) 
            }
            
        </>
    )
}

export default HomeScreen
