import React from 'react'
import products from '../products'
import ProductCard from '../components/Product'
import { Row, Col } from 'react-bootstrap'

function HomeScreen() {
    return (
        <>
            <h1>Latest Product</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm ={12} md={6} lg={4} xl={3}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen
