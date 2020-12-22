import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import { register } from '../action/userAction'
import FromContainer from '../components/FromContainer'

function RegisterScreen({ location, history }) {
    const  [name, setName] = useState('')
    const  [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)

    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password do not match')
        } else{
            dispatch(register(name, email, password))
        }
        
    }
     
    return (
        <FromContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
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
                    Register
                </Button>
            </Form>

            <Row className='py-3'>
                Have an Account ? {' '}
                <Link style={{textDecoration:'none', color:'black'}} to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Log In
                </Link>
            </Row>
        </FromContainer>
    )
}

export default RegisterScreen
