import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import { getUserDetails, editUser } from '../action/userAction'
import FromContainer from '../components/FromContainer'
import { USER_ADMIN_UPDATE_RESET } from '../constants/userConstants'

function UserEditScreen({ match, history }) {
 
    const userId = match.params.id
    const  [name, setName] = useState('')
    const  [email, setEmail] = useState('')
    const  [isAdmin, setIsAdmin] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)

    const { loading, error, user } = userDetails

    const userEdit = useSelector((state) => state.userEdit)

    const { loading: editLoading, error: editError, success: editSuccess } = userEdit

    useEffect(() => {
        if(editSuccess){
            dispatch({ type: USER_ADMIN_UPDATE_RESET })
            history.push('/admin/userlist')
        } else {
            if(!user.name || user._id !== userId){
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

        
    }, [dispatch, userId, user, history, editSuccess])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(editUser({ _id: userId, name, email, isAdmin }))        
    }
     
    return (
        <>
            <Link to='/admin/userlist' className='btn btn-dark my-3'>
                Go back
            </Link>

            <FromContainer>
            <h1>Edit User</h1>
            {editLoading && <Loader/>}
            {editError && <Message variant='danger'>{editError}</Message>}
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>:(
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

                <Form.Group controlId='isAdmin'>
                    <Form.Label>
                        Check Admin
                    </Form.Label>
                    <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}>

                    </Form.Check>
                </Form.Group>

                <Button className='btn-dark' type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
            )}
            
        </FromContainer>
        </>
        
    )
}

export default UserEditScreen
