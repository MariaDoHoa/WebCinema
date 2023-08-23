import actMovieToCinema from "../actionCenima/actMovieToCinema"

const initialState = {
   
    //danh sách phim, rạp, suất chiếu đang được bán
    lsBooking1: [],

    //lấy ra giờ chiếu theo ID của phim 
    lsDates1: "",

    //lấy ra dữ liệu của phim theo ID
    lsMovieId1: [],
}
const rdcMovieToCinema = (state = initialState, { type, payload }) => {
    switch (type) {
        case actMovieToCinema.SET_BOOKING:
            console.log("Payload for SET_BOOKING rdcMvToCinema:", payload);
            return {
                ...state,
                lsBooking1: payload,
            }

        case actMovieToCinema.SET_MOVIE_ID_1:
            console.log("Payload for SET_MOVIE_ID rdcMvToCinema:", payload);
            return {
                ...state,
                lsMovieId1: payload,
            }

        case actMovieToCinema.SET_MOVIE_DATES:
            {
                let temp = state.lsMovieId1.find(n => {
                    return n.id === payload
                })
                return {
                    ...state,
                    lsDates1: temp
                }
            }
        case actMovieToCinema.RESET_MOVIE_ID:
            return {
                ...state,
                lsMovieId1: [],
                lsDates1:[] // Reset lsMovieId1 to an empty array
        };
        default:
            return state
    }
}
export default rdcMovieToCinema