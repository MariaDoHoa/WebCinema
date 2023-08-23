import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import actCenima from "../actionCenima/actCenima";
import actSeat from "../actionCenima/actSeat";
import actBanking from "../actionCenima/actBanking";
import actPayment from "../actionCenima/actPayment";
import actMovieToCinema from "../actionCenima/actMovieToCinema";
import actUser from "../actionCenima/actUser";



//danh sách loại vé, combo, chỗ ngồi
async function GetBookDetailAPI(params) {
    let res = await fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/booking/detail")
    let data = await res.json()
    return data
}
function* GetBookingDetail({ type, payload }) {
    let data = yield call(GetBookDetailAPI)
    yield put({
        type: actCenima.SET_BOOKING_DETAIL,
        payload: data
    })
}


//danh sách tất cả rạp phim 
async function GetCenimaAllAPI(params) {
    let res = await fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/cinemas")
    let data = await res.json()
    return data
}
function* GetCenimaAll({ type, payload }) {
    let data = yield call(GetCenimaAllAPI)
    yield put({
        type: actCenima.SET_CENIMA_ALL,
        payload: data
    })
}

async function GetCenimaIdAPI(idCenima) {
    let res = await fetch(`https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/cinemas/${idCenima}`)
    let data = await res.json()
    return data
}
function* GetCenimaId({ type, payload }) {
    let data = yield call(GetCenimaIdAPI, payload)
    yield put({
        type: actCenima.SET_CENIMA_ID,
        payload: data
    })
}

//danh sách phim, rạp, suất chiếu đang được bán
async function GetAPIBooking(params) {
    let res = await fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/booking")
    let data = await res.json()
    return data
}
function* GetBooking({ type, payload }) {
    let data = yield call(GetAPIBooking)
    yield put({
        type: actCenima.SET_BOOKING,
        payload: data
    })
}

function* GetBooking1({ type, payload }) {
    let data = yield call(GetAPIBooking)
    yield put({
        type: actMovieToCinema.SET_BOOKING,
        payload: data
    })
}

//lấy ra dữ liệu của phim theo ID
async function GetIdAPI(id) {
    let res = await fetch(`https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/movie/${id}`)
    let data = await res.json()
    return data
}
function* GetMovieId({ type, payload }) {
    let data = yield call(GetIdAPI, payload)
    yield put({
        type: actCenima.SET_MOVIE_ID,
        payload: data
    })
    console.log(data)
}

function* GetMovieIDToCinema({ type, payload }) {
    let data = yield call(GetIdAPI, payload)
    yield put({
        type: actMovieToCinema.SET_MOVIE_ID_1,
        payload: data
    })
    console.log(data)
}


//danh sách người dùng đăng nhập 
async function GetAPIUser(params) {
    let res = await fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/user/user")
    let data = await res.json()
    return data
}
function* GetUser({ type, payload }) {
    let data = yield call(GetAPIUser)
    yield put({
        type: actUser.SET_USER,
        payload: data
    })
}

//danh sách tất cả phim đang chiếu và sắp chiếu
async function GetAPI(params) {
    let res = await fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/nowAndSoon")
    let data = await res.json()
    return data;

}
function* GetDataCenima({ type, payload }) {
    let data = yield call(GetAPI)
    yield put({
        type: actCenima.SET_DATA_CENIMA,
        payload: data
    })
}


//danh sach ghế
async function GetAPISeat(params) {
    let res = await fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/booking/detail")
    let data = await res.json()
    return data
}

function* GetSeat({ type, payload }) {
    let data = yield call(GetAPISeat)
    yield put({
        type: actSeat.SET_SEAT,
        payload: data
    })
}

// check ghế

async function GetAPISoldSeat(sessionId) {
    let res = await fetch(`https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/TicketByShowCode/${sessionId}`)
    let data = await res.json()
    return data
}

function* GetSoldSeat({ type, payload }) {
    let data = yield call(GetAPISoldSeat, payload)
    yield put({
        type: actSeat.SET_SOLD_SEAT,
        payload: data
    })
   
}

//danh sach bank
async function GetAPIBank(params) {
    let res = await fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/Bank/Bank")
    let data = await res.json()
    return data
}

function* GetBank({ type, payload }) {
    let data = yield call(GetAPIBank)
    yield put({
        type: actBanking.SET_BANK,
        payload: data
    })
}

//POST
function* postPayment(action) {
    const response = yield call(fetch, 'https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/Ticket', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.payload),
    });
    if (response.status === 200) {
        // Dispatch an action to handle successful response (status code 200)
        yield put({ type: actPayment.SUCCESS_PAYMENT, payload:"200"});
        
        // Show an alert for "ok"
        //alert('Payment Successful!');
    } else if (response.status === 404) {
        // Dispatch an action to handle failed response (status code 404)
        yield put({ type: actPayment.FAILED_PAYMENT,  payload:"404"});
        
        // Show an alert for "fail"
        //alert('Payment Failed. Please try again.');
    }
}

//Get ticket mail
async function GetAPITicket(email) {
    let res = await fetch(`https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/TicketByEmail/${email}`)
    let data = await res.json()
    return data
}

function* GetTicket({ type, payload }) {
    let data = yield call(GetAPITicket, payload)
    yield put({
        type: actPayment.SET_TICKET,
        payload: data
    })
    //console.log(data)
}

function* GetHistory({ type, payload }) {
    let data = yield call(GetAPITicket, payload)
    yield put({
        type: actUser.SET_HISTORY,
        payload: data
    })
    console.log(data)
}

//Get all card
async function GetAPICard() {
    let res = await fetch(`https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/Bank/BankCard`)
    let data = await res.json()
    return data
}

function* GetCard({ type, payload }) {
    let data = yield call(GetAPICard)
    yield put({
        type: actBanking.SET_CARD,
        payload: data
    })
    console.log(data)
}


//Get check new/old user
async function GetAPICheck(email) {
    let res = await fetch(`https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/Bank/CardRef/${email}`)
    let data = await res.json()
    return data
}

function* GetCheckBank({ type, payload }) {
    let data = yield call(GetAPICheck, payload)
    yield put({
        type: actUser.SET_CHECK_BANK,
        payload: data
    })
    console.log(data)
}


function* mySaga(params) {
    yield takeEvery(actCenima.GET_DATA_CENIMA, GetDataCenima)
    yield takeEvery(actCenima.GET_MOVIE_ID, GetMovieId)
    yield takeEvery(actCenima.GET_BOOKING, GetBooking)
    yield takeEvery(actCenima.GET_CENIMA_ALL, GetCenimaAll)
    yield takeEvery(actCenima.GET_CENIMA_ID, GetCenimaId)
    yield takeEvery(actCenima.GET_BOOKING_DETAIL, GetBookingDetail)
    yield takeEvery(actSeat.GET_SEAT, GetSeat)
    yield takeEvery(actBanking.GET_BANK, GetBank)
    yield takeLatest(actPayment.POST_PAYMENT, postPayment)
    yield takeEvery(actPayment.POST_TICKET, GetTicket)
    yield takeEvery(actUser.GET_USER, GetUser)
    yield takeEvery(actMovieToCinema.GET_MOVIE_ID_1, GetMovieIDToCinema)
    yield takeEvery(actMovieToCinema.GET_BOOKING, GetBooking1)
    yield takeEvery(actUser.GET_HISTORY, GetHistory)
    yield takeEvery(actBanking.GET_CARD, GetCard)
    yield takeEvery(actUser.GET_CHECK_BANK, GetCheckBank)
    yield takeEvery(actSeat.GET_SOLD_SEAT, GetSoldSeat)




}
export default mySaga;