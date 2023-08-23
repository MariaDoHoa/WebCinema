import actUser from "../actionCenima/actUser";

const initialState = {
    lsUser: [],
    lsTicket: [],
    lsCheck: [],
}
const rdcUser = (state = initialState, { type, payload }) => {
    switch (type) {
        case actUser.SET_USER:
            return {
                ...state,
                lsUser: payload
            }
        case actUser.SET_HISTORY:
            return {
                ...state,
                lsTicket: payload,
            }
        case actUser.SET_CHECK_BANK:
            return {
                ...state,
                lsCheck: payload,
            }

        default:
            return state
    }
}

export default rdcUser
