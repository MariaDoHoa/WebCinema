import React, { useEffect } from 'react'
import './Success.scss'
import { connect } from 'react-redux'
import actPayment from '../../Redux/actionCenima/actPayment'

function Success(props) {

    useEffect(() => {
        props.GetTicket()
        sessionStorage.setItem('lsTicket', JSON.stringify(props.dataTicket.lsTicket));
    }, [])
    const ticket = JSON.parse(sessionStorage.getItem("Ticket"));
    const selectedSeats = JSON.parse(sessionStorage.getItem("selectedSeats")) || {};

    const Printer = () => {
        window.print()
    }
    return (
        <>
            <div className='Success'>
                <div className='Container'>
                    <div className='selectionTicket'>
                        <div style={{ display: 'flex', justifyContent: 'center' }}><h1>THANH TOÁN THÀNH CÔNG</h1></div>
                        <div className='ticket'>
                            <div>
                                {/* <div className='success'><img src="img/success.png"/></div> */}
                                <hr />
                                <div className='infoTicket'>
                                    {/* {console.log(props.dataTicket.lsTicket)}           
                   {
                     
                        props.dataTicket.lsTicket.map((n,i) => {
                            if (i === props.dataTicket.lsTicket.length - 1) {
                                return <div key={i}>
                                {console.log({i})}
                                <p>{n.CinemaName}</p>
                                <p>{n.FilmName}</p>
                                const formattedDate = new Date({n.showTime}).toLocaleString();
                                <p>Thời gian: {formattedDate}</p>
                                <p>Rạp chiếu: {n.TheaterName}</p>
                                <p>Combo Name: {n.Combo}</p>
                                <p>Số ghế: {n.SeatCode}</p>
                                </div>
                                console.log(props.dataTicket.lsTicket.length)
                            } 
                        })
                    }  */}
                                    <div className='print-content'>
                                        <div className='posterTicket'>
                                            <img src={ticket.imgMovie} />
                                        </div>

                                        <div className='titleTicket'>
                                            <h2 className='name'>{ticket.nameMovie}</h2>
                                        </div>

                                        <div className='infoTicket'>
                                            <p><span>Rạp: </span>{ticket.CinemaName}</p>
                                            <p><span>Screen:</span>{ticket.ScreenName}</p>
                                            <p><span>Suất chiếu: </span>{ticket.Showtime} | {ticket.DateShow}, {ticket.DayOfWeek}</p>
                                            <p><span>Số lượng vé: </span>{ticket.ticketCount}</p>
                                            <p><span>Mã ghế:</span>
                                                {Object.values(selectedSeats).join(", ")}
                                            </p>
                                            <p><span>Combo:</span></p>
                                            <p><span>Tổng: </span>{ticket.totalSum.toLocaleString()}</p>
                                        </div>

                                        <div className='bnt'>
                                            <button onClick={Printer}>In vé</button>
                                            <button>Huỷ đặt vé</button>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

const mapStateToProps = (globalState) => {
    return {
        dataTicket: globalState.paymentManage
    }
}
const mapDispatchToProps = (dispath) => {
    return {
        GetTicket: () => {
            dispath({
                type: actPayment.GET_TICKET
            })
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Success);

