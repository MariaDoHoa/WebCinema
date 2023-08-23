const actCenima = {

    /******VÉ - TICKET******/

    // Danh sách phim, rạp, suất chiếu đang được bán
    GET_BOOKING: "GET_BOOKING",
    SET_BOOKING: "SET_BOOKING",

    //lấy ra giờ chiếu theo id phim bên chọn rạp trước
    SET_MOVIE_DATES_1: "SET_MOVIE_DATES_1",

    //danh sách loại vé, combo, chỗ ngồi
    GET_BOOKING_DETAIL: "GET_BOOKING_DETAIL",
    SET_BOOKING_DETAIL: "SET_BOOKING_DETAIL",

    RESET_CINEMA_ID: "RESET_CINEMA_ID",

    /******RẠP - CINEMA******/

    //danh sách rạp phim 
    GET_CENIMA_ALL: "GET_CENIMA_ALL",
    SET_CENIMA_ALL: "SET_CENIMA_ALL",

    //danh sách rạp phim  rạp phim theo ID (cinema)
    GET_CENIMA_ID: "GET_CENIMA_ID",
    SET_CENIMA_ID: "SET_CENIMA_ID",

    /******PHIM - MOVIE******/
 
    //danh sách tất cả phim đang chiếu và sắp chiếu
    GET_DATA_CENIMA: "GET_DATA_CENIMA",
    SET_DATA_CENIMA: "SET_DATA_CENIMA",

    //danh sách phim theo ID (movei)
    GET_MOVIE_ID: "GET_MOVIE_ID",
    SET_MOVIE_ID: "SET_MOVIE_ID",

    //lấy ra giờ chiếu theo ID của phim 
    SET_MOVIE_DATES: "SET_MOVIE_DATES",

}
export default actCenima;