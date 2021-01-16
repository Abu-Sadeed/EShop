import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/Product'
import { Row, Col } from 'react-bootstrap'
import { listProducts } from '../action/productActions'
import Loader from '../components/loader'
import Message from '../components/message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'


function HomeScreen({ match }) {
    const keyword = match.params.keyword
    const pageNumber = match.params.pagenumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
        <Meta/>
        {!keyword ? (<ProductCarousel/>) : (<Link to='/' className='btn btn-light'>Go back</Link>)}
            <h1>Latest Product</h1>
            {
                loading ? (
                    <Loader style={{margin: 'auto'}} />
                    ) : error ? (
                    <Message variant='danger'>{error}</Message>
                    ) : (
                        <>
                        <Row>
                            {products.map(product => (
                            <Col key={product._id} sm ={12} md={6} lg={4} xl={3}>
                                <ProductCard className='productCard' product={product} />
                            </Col>
                             ))}
                        </Row>

                        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                        </>

                    ) 
            }
            
        </>
    )
}

export default HomeScreen
