import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import actCenima from '../../Redux/actionCenima/actCenima'
import "./TicketCenima.scss"
import { useNavigate } from 'react-router-dom'

function TicketCenima(props) {
    const [selectedCenimaId, setSelectedCenimaId] = useState(null);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const nav = useNavigate()
    useEffect(() => {
        sessionStorage.removeItem("selectedSeats")
        sessionStorage.removeItem("selectedSeatsData")
        //sessionStorage.clear()
        props.ResetCinemaId()
        props.GetBooking()
        props.GetCenimaAll()

    }, [])

    const cinemas = props.dataCenima.lsBooking.cinemas
    const HandleId = (idCenima, nameCenima) => {
        setSelectedCenimaId(idCenima)
        const Ticket = {
            CinemaName: nameCenima
        }

        sessionStorage.setItem("Ticket", JSON.stringify(Ticket))
        props.CenimaId(idCenima)
    }
    const HandleIdDates = (idCenima1, name, image) => {
        setSelectedMovieId(idCenima1)
        const ticket = JSON.parse(sessionStorage.getItem("Ticket"))

        const Ticket = {
            ...ticket,
            idMovie: idCenima1,
            MovieName: name,
            imgMovie: image
        }

        sessionStorage.setItem("Ticket", JSON.stringify(Ticket))
        props.MovieIdDates(idCenima1)
    }


    const SelectionTicket = (showTime, id, screenName, screenNumber, dateWeek, dateShow) => {
        const ticket = JSON.parse(sessionStorage.getItem("Ticket"));
        const Ticket = {
            ...ticket,
            Showtime: showTime,
            SessionId: id,
            ScreenName: screenName,
            ScreenNumber: screenNumber,
            DayOfWeek: dateWeek,
            DateShow: dateShow,
        };

        sessionStorage.setItem('Ticket', JSON.stringify(Ticket));

        nav('/selectionticket')
    }
    return (
        <div className='TicketCenima'>
            <div className='Container'>
                <div className='SelectionCenima'>
                    <table>
                        <thead>
                            <tr>
                                <th>CHỌN RẠP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cinemas?.map((n, i) => {
                                    let nameCenima = n.name
                                    let id = n.code
                                    return (
                                        <tr key={i}>
                                            <td style={{ backgroundColor: `${id === selectedCenimaId ? "#006a6a" : ""}`, color: `${id === selectedCenimaId ? "white" : ""}` }} onClick={() => HandleId(id, n.name)} >{n.name}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className='SelectionMovie'>
                    <table>
                        <thead>
                            <tr>
                                <th>CHỌN PHIM</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.dataCenima.lsCenimaID?.map((n, i) => {
                                    let idCenima = n.id
                                    return (
                                        <tr key={i} >
                                            <td style={{ backgroundColor: `${idCenima === selectedMovieId ? "#006a6a" : ""}`, color: `${idCenima === selectedMovieId ? "white" : ""}` }} onClick={() => { HandleIdDates(idCenima, n.name, n.imageLandscape) }}>
                                                <div className='im'>
                                                    <img src={n.imageLandscape} />
                                                </div>
                                                <div className='content'>
                                                    <p className='p1'>{n.name}</p>
                                                    <p>{n.subName}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <div className='SeclectionDates'>
                    <table>
                        <thead>
                            <tr>
                                <th>CHỌN SUẤT CHIẾU</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.dataCenima.lsDatesMovie.dates?.map((n, i) => {
                                    let sub = n.bundles.find(n => n.caption == "sub")
                                    let longtieng = n.bundles.find(n => n.caption == "voice")
                                    let date = n.showDate
                                    let days = n.dayOfWeekLabel
                                    return (
                                        <tr key={i}>
                                            <td>
                                                <h2 style={{ color: "salmon", fontWeight: "bold" }}>{n.dayOfWeekLabel} {n.showDate}</h2>
                                                <div className='phude'>
                                                    <p>{sub?.version ? "2D" : ""} {sub?.caption ? "Phụ đề" : ""}</p>
                                                    <div className='giochieu'>
                                                        {sub?.sessions.map((n3, i3) => {
                                                            let showtime = n3.showTime
                                                            return <button onClick={() => { SelectionTicket(n3.showTime, n3.id, n3.screenName, n3.screenNumber, n3.showDate, n3.dayOfWeekLabel) }} key={i3}>{n3.showTime}</button>
                                                        })}
                                                    </div>
                                                </div>
                                                <div className='longtieng'>
                                                    <p>{longtieng?.version ? "2D" : ""} {longtieng?.caption ? "L.Tiếng" : ""}</p>
                                                    <div className='giochieu'>
                                                        {longtieng?.sessions.map((n3, i3) => {
                                                            let showtime = n3.showTime
                                                            return <button onClick={() => { SelectionTicket(n3.showTime, n3.id, n3.screenName, n3.screenNumber, n3.showDate, n3.dayOfWeekLabel) }} key={i3}>{n3.showTime}</button>
                                                        })}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (globalState) => {
    return {
        dataCenima: globalState.dataManage
    }
}
const mapDispatchToProps = (dispath) => {
    return {
        GetBooking: () => {
            dispath({
                type: actCenima.GET_BOOKING
            })
        },
        GetCenimaAll: () => {
            dispath({
                type: actCenima.GET_CENIMA_ALL
            })
        },
        CenimaId: (idCenima) => {
            dispath({
                type: actCenima.GET_CENIMA_ID,
                payload: idCenima
            })
        },
        MovieIdDates: (idCenima1) => {
            dispath({
                type: actCenima.SET_MOVIE_DATES_1,
                payload: idCenima1
            })
        },
        ResetCinemaId: () => {
            dispath({
                type: actCenima.RESET_CINEMA_ID,
            })
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TicketCenima);
