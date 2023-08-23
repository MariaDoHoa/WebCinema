import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import actUser from '../../Redux/actionCenima/actUser'
import './History.scss'
import { Link } from 'react-router-dom'



function History(props) {
    const mail = localStorage.getItem("Email")

    useEffect(() => {
        sessionStorage.clear()
        props.GetTicket(mail)
    }, [mail])



    return (
        <div>
            <div className='History'>
                <div className='Container'>
                    <div className='tab'>
                        <div className='tab1'>
                            <Link to={"/user"}>Thông Tin Thành Viên</Link>
                        </div>
                        <div className='tab2'>
                            <Link to={"/history"} style={{ color: "salmon" }}>Thông Tin Giao Dịch</Link>
                        </div>
                    </div>
                    <div className='Content'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Ngày</th>
                                    <th>Số giao dịch</th>
                                    <th>Mã vé</th>
                                    <th>Rạp</th>
                                    <th>Phim</th>
                                </tr>
                            </thead>
                            <tbody className='ticketType'>
                                {props.dataHistory.lsTicket
                                    .sort((a, b) => new Date(b.ShowTime) - new Date(a.ShowTime))
                                    .slice(0, 20)
                                    .map((ticket, index) => (
                                        <tr className={index === 0 ? 'bgFisrt' : ''} key={ticket.Id}>
                                        <td>{new Date(ticket.ShowTime).toLocaleString('en-US', { timeZone: 'UTC' })}</td>
                                        <td>{ticket.ShowCode}</td>
                                        <td>{ticket.Id}</td>
                                        <td>{ticket.CinemaName}</td>
                                        <td>{ticket.FilmName}</td>
                                        </tr>
                                    ))}
                                {/* {console.log(props.dataHistory.lsTicket)} */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (globalState) => {
    return {
        dataHistory: globalState.historyManage
    }
}
const mapDispatchToProps = (dispath) => {
    return {
        GetTicket: (mail) => {
            dispath({
                type: actUser.GET_HISTORY,
                payload: mail
            })
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(History);