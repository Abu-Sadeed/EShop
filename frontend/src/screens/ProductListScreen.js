import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import { listProducts, deleteProduct, createProduct } from '../action/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function ProductListScreen({ match, history }) {
 
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)

    const { loading, error, products } = productList

    
    const userLogin = useSelector((state) => state.userLogin)

    const { userInfo } = userLogin

    const productDelete = useSelector((state) => state.productDelete)

    const { loading:loadingDelete, error: errorDelete, success: productDeleteSuccess } = productDelete

    const productCreate = useSelector((state) => state.productCreate)

    const { loading:loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate



    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        if(!userInfo.data.isAdmin){
            history.push('/login')
        }

        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts())
        }
        
    }, [dispatch, history, userInfo, productDeleteSuccess, successCreate, createdProduct])

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure')){
            dispatch(deleteProduct(id))
        }
        
    }
     
    return (
            <>
                <Row className='align-items-centre'>
                    <Col>
                        <h1>Products</h1>
                    </Col>
                    <Col className='text-right'> 
                        <Button className='my-3 btn-dark' onClick={createProductHandler}>
                            Create Product
                        </Button>
                    </Col>
                </Row>
                {/* {loadingDelete && <Loader/>} */}
                {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
                {loadingCreate && <Loader/>}
                {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>: (
                <Table stripped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='dark' className='btn-sm'>
                                            <EditIcon />
                                        </Button>
                                    </LinkContainer>
                                </td>
                                <td>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                        <DeleteIcon style={{color:'darkred'}}/>
                                    </Button>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
        
    )
}

export default ProductListScreen
