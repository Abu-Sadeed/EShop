import { ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS, ORDER_CREATE_REQUEST } from '../constants/orderConstants'
import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {

    console.log(order)

    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.data.token}`
            }
        }


        const { data } = await axios.post(`/api/order`, order, config)


        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        })
        
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}