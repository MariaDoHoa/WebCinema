import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import actCenima from '../../Redux/actionCenima/actCenima'
import "./MovieTicketId.scss"
import { useNavigate } from 'react-router-dom'

function MovieTicketId(props) {
    const nav = useNavigate()
    const ticket = JSON.parse(sessionStorage.getItem("Ticket"));
    const MovieDetail = props.dataCenima.lsDataCenima.movieShowing?.find(n => n.id == ticket.idMovie)
    const createMarkup = (htmlString) => ({ __html: htmlString });
    console.log(ticket.idMovie)

    useEffect(() => {
        props.GetDataCenima()
        props.MovieIdTicket(MovieDetail.id)
    }, [])


    const SelectionTicket = (cinemaName, showTime, id, screenName, screenNumber, dateWeek, dateShow) => {
        const Ticket = {
            ...ticket,
            MovieName: MovieDetail.name,
            CinemaName: cinemaName,
            Showtime: showTime,
            SessionId: id,
            ScreenName: screenName,
            ScreenNumber: screenNumber,
            DayOfWeek: dateWeek,
            DateShow: dateShow,
        };

        sessionStorage.setItem('Ticket', JSON.stringify(Ticket));
        console.log('Ticket luồn Home:',Ticket);
        nav('/selectionticket')
    }
    const descriptionStyle = {
        color: 'white',
        backgroundColor: "red",
        //fontFamily: 'Arial, Helvetica, sans-serif',
        //fontSize: '14px',
    };
    return (
        <>
            <div className='MovieTicketId'>
                <div className='Container'>
                    {
                        MovieDetail ? <div className='infoMovie'>
                            <img src={MovieDetail.imageLandscape} />
                            <div className='content'>
                                <div> {/*{console.log(MovieDetail.startdate)}  */}
                                    <h2>{MovieDetail.name}</h2>
                                    <h3>{MovieDetail.subName}</h3>
                                    <p>Khởi chiếu: <span>{new Date(`${MovieDetail.startdate}`).toLocaleString()}</span></p>
                                    <p>Lượt xem: <span>{MovieDetail.views}</span></p>
                                    <div className="flex-grow">
                                        <span style={descriptionStyle} dangerouslySetInnerHTML={{ __html: MovieDetail.description }} />
                                    </div>

                                </div>
                            </div>
                        </div> : ""
                    }

                    {
                        props.dataCenima.lsMovieId?.map((n, i) => {
                            return (
                                <div key={i} className="infoCinema">
                                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                                        <summary
                                            className="title flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900"
                                        >
                                            <div className="font-medium">
                                                <h3>{n.name}</h3>
                                            </div>

                                            <svg
                                                className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </summary>

                                        <p className="content mt-1 px-4 leading-relaxed text-gray-700 ">
                                            {
                                                n.dates?.map((n1, i1) => {

                                                    return (
                                                        <div key={i1} className='suatchieu'>
                                                            <h2>{n1.dayOfWeekLabel} {n1.showDate}</h2>
                                                            <div className='phude'>
                                                                <p>{n1.bundles[0].version ? "2D" : ""} {n1.bundles[0].caption ? "Phụ đề" : ""}</p>
                                                                <div className='giochieu'>
                                                                    {n1.bundles[0].sessions.map((n2, i2) => {
                                                                        return <button key={i2} onClick={() => SelectionTicket(n.name,
                                                                            n2.showTime, n2.id, n2.screenName, n2.screenNumber, n2.showDate, n2.dayOfWeekLabel)}>{n2.showTime}</button>
                                                                    })}
                                                                </div>
                                                            </div>
                                                            <div className='longtieng'>
                                                                <p>{n1.bundles[1]?.version ? "2D" : ""} {n1.bundles[1]?.caption ? "LT" : ""}</p>
                                                                <div className='giochieu'>
                                                                    {n1.bundles[1]?.sessions.map((n3, i3) => {
                                                                        return <button key={i3} onClick={() => SelectionTicket(n.name,
                                                                            n3.showTime, n3.id, n3.screenName, n3.screenNumber, n3.showDate, n3.dayOfWeekLabel)}>{n3.showTime}</button>
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </p>
                                    </details>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
const mapStateToProps = (globalState) => {
    return {
        dataCenima: globalState.dataManage
    }
}
const mapDispatchToProps = (dispath) => {
    return {
        GetDataCenima: () => {
            dispath({
                type: actCenima.GET_DATA_CENIMA
            })
        },
        MovieIdTicket: (idMovie) => {
            dispath({
                type: actCenima.GET_MOVIE_ID,
                payload: idMovie
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieTicketId);
