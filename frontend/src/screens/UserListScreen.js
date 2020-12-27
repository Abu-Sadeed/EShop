import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import { getAllUsers } from '../action/userAction'
import { LinkContainer } from 'react-router-bootstrap'
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const UserListScreen = () => {
    const dispatch = useDispatch()
    
    const userList = useSelector(state => state.userList)

    const { loading, error, users } = userList

    const deleteHandler = (id) => {
        //pass
    }

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])
    
    return(
        <>
            <h1>Users</h1>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>: (
                <Table stripped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a style={{color: 'black'}} href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>{user.isAdmin ? (<DoneIcon style={{color:'darkgreen'}}/>) : (<CancelIcon style={{color:'darkred'}}/>)}</td>
                                <td>
                                    <LinkContainer to={`/user/${user._id}/edit`}>
                                        <Button variant='dark' className='btn-sm'>
                                            <EditIcon />
                                        </Button>
                                    </LinkContainer>
                                </td>
                                <td>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
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

export default UserListScreen