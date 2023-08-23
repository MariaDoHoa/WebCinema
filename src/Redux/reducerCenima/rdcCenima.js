import actCenima from "../actionCenima/actCenima";

const initialState = {
    //danh sách tất cả phim đang chiếu và sắp chiếu
    lsDataCenima: [],

    //danh sách rạp phim 
    lsCenimaAll: [],

    //lấy ra dữ liệu của rạp phim theo ID
    lsCenimaID: [],

    //lấy ra dữ liệu của phim theo ID
     lsMovieId: [],

    //danh sách phim, rạp, suất chiếu đang được bán
    lsBooking: [],

    //lấy ra giờ chiếu theo ID của phim 
    lsDates: "",

    //lấy ra giờ chiếu theo id phim bên chọn rạp trước
    lsDatesMovie: "",

    //danh sách loại vé, combo, chỗ ngồi
    lsBookingDetail: [],
    lsBookingDetailCb: []
}
const rdcCenima = (state = initialState, { type, payload }) => {
    switch (type) {
        case actCenima.SET_DATA_CENIMA:
            return {
                ...state,
                lsDataCenima: payload,
            }
        case actCenima.SET_CENIMA_ALL:
            return {
                ...state,
                lsCenimaAll: payload,
            }
        case actCenima.SET_CENIMA_ID:
            return {
                ...state,
                lsCenimaID: payload,
            }
        case actCenima.SET_MOVIE_ID:
            console.log("Payload for SET_MOVIE_ID rdcCenima:", payload);
            return {
                ...state,
                lsMovieId: payload,
            }
        case actCenima.SET_BOOKING:
            return {
                ...state,
                lsBooking: payload,
            }
        case actCenima.SET_MOVIE_DATES:
            {
                let temp = state.lsMovieId.find(n => {
                    return n.id === payload
                })
                return {
                    ...state,
                    lsDates: temp
                }
            }
        case actCenima.SET_MOVIE_DATES_1:
            {
                let temp = state.lsCenimaID.find(n => {
                    return n.id === payload
                })
                return {
                    ...state,
                    lsDatesMovie: temp
                }
            }
        case actCenima.SET_BOOKING_DETAIL:
            return {
                ...state,
                lsBookingDetail: payload,
                lsBookingDetailCb: payload.consession[0].concessionItems
            }
        case actCenima.RESET_CINEMA_ID:
            return {
                ...state,
                lsCenimaID: [],
                lsDatesMovie:[] // Reset lsMovieId1 to an empty array
            };
            
        default:
            return state
    }
}
export default rdcCenima;