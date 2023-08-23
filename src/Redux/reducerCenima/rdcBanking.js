import actBanking from "../actionCenima/actBanking";

const initialState = {
    lsBank:[],
    lsCard:[],
   


}

const rdcBanking = (state = initialState, {type, payload}) => {
    switch (type) {
        case actBanking.SET_BANK:
            return {
                ...state,
                lsBank:payload,
            }
        case actBanking.SET_CARD:
            return {
                ...state,
                lsCard:payload,
            }
            
        default:
            return state;
    }
}

export default rdcBanking
