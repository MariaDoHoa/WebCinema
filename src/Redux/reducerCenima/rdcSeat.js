import actSeat from "../actionCenima/actSeat";

const initialState = {
    lsData:[],
    lsSeat:[],
    lsSeat1:[],
    lsSold:[]
}

const rdcSeat = (state = initialState, {type, payload}) => {
    switch (type) {
        case actSeat.SET_SEAT:
            return {
                ...state,
                lsData:payload,
                lsSeat:payload.seatPlan.seatLayoutData.areas[0],
                lsSeat1:payload.seatPlan.seatLayoutData.areas[1]
            }

        case actSeat.SET_SOLD_SEAT:
            console.log('Payload for SET_SOLD_SEAT:', payload)
            return {
                ...state,
                lsSold: payload
            }
                
            
        default:
            return state;
    }
}

export default rdcSeat
