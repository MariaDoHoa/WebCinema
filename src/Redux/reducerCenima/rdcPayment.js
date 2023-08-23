import actPayment from "../actionCenima/actPayment";

const initialState = {
    lsPayment:[],
    lsTicket:[],
    isSuccess:"",
}

const rdcPayment = (state = initialState, {type, payload}) => {
    switch (type) {
        case actPayment.SET_PAYMENT:
            return {
                ...state,
                lsPayment:payload,
            }
        case actPayment.SUCCESS_PAYMENT:
            console.log('payload success ne', payload)
            return {
                ...state,
                isSuccess: payload,
            }
        case actPayment.FAILED_PAYMENT:
            console.log('payload fails ne', payload)
            return {
                ...state,
                isSuccess: payload,
            }
        case actPayment.SET_TICKET:
            return {
                ...state,
                lsTicket: payload,
            }
            
        default:
            return state;
    }
}

export default rdcPayment
