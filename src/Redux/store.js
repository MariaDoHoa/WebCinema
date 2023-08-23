import { applyMiddleware, combineReducers, createStore } from "redux";
import rdcCenima from "./reducerCenima/rdcCenima";
import createSaga from "redux-saga";
import middleSaga from "./saga/middleSaga";
import rdcSeat from "./reducerCenima/rdcSeat";
import rdcBanking from "./reducerCenima/rdcBanking";
import rdcPayment from "./reducerCenima/rdcPayment";
import rdcMovieToCinema from "./reducerCenima/rdcMovieToCinema"
import rdcUser from "./reducerCenima/rdcUser";

const saga = createSaga()
const globalState = combineReducers({
    dataManage: rdcCenima,
    seatManage: rdcSeat,
    bankManage: rdcBanking,
    paymentManage: rdcPayment,
    userManage: rdcUser,
    movieManage: rdcMovieToCinema,
    historyManage: rdcUser,
})
const store = createStore(
    globalState,
    applyMiddleware(saga)
)
export default store;
saga.run(middleSaga)