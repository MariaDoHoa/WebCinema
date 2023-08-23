import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import "./Ticket.scss"
import { useNavigate } from 'react-router-dom'
import actMovieToCinema from '../../Redux/actionCenima/actMovieToCinema'
import Loading from '../Loading/Loading'

function Ticket(props) {

  const [infoDates, setInfoDates] = useState("")
  const [infoDays, setInfoDays] = useState("")
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedCenimaId, setSelectedCenimaId] = useState(null);


  const nav = useNavigate()
  useEffect(() => {
    sessionStorage.removeItem("selectedSeats")
    sessionStorage.removeItem("selectedSeatsData")
    //sessionStorage.clear()
    props.ResetMovieId();
    props.GetBooking()
  }, [])

  //const movie = props.dataCenima1.lsBooking1.movies
  //const MovieDetail = props.dataCenima1.lsBooking.movies?.find(n => n.id == ticket.idMovie)
  //console.log(props.dataCenima1.lsBooking1.movies)

  const HandleId = (id, name, image) => {
    setSelectedMovieId(id)
    const Ticket = {
      idMovie: id,
      MovieName: name,
      imgMovie: image
    }

    sessionStorage.setItem("Ticket", JSON.stringify(Ticket))
    props.MovieIdTicket(id)
  }

  const HandleIdDates = (idCenima, nameCenima) => {
    setSelectedCenimaId(idCenima)
    const ticket = JSON.parse(sessionStorage.getItem("Ticket"));
    const Ticket = {
      ...ticket,
      //idCinema: idCenima,
      CinemaName: nameCenima
    }
    sessionStorage.setItem("Ticket", JSON.stringify(Ticket))
    props.MovieIdDates(idCenima)

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
    console.log('Ticket luồn chọn rạp:', Ticket);
    nav('/selectionticket')
  }
  return (
    <div className='Ticket'>
      <div className='Container'>
        <div className='SelectionMovie'>
          <table>
            <thead>
              <tr>
                <th>CHỌN PHIM</th>
              </tr>
            </thead>
            <tbody>
              {
                props.dataCenima1.lsBooking1.movies ? (
                  props.dataCenima1.lsBooking1.movies?.map((n, i) => {
                    let id = n.id
                    return (
                      <tr key={i} >
                        <td style={{ backgroundColor: `${id === selectedMovieId ? "#006a6a" : ""}`, color: `${id === selectedMovieId ? "white" : ""}` }} onClick={() => HandleId(n.id, n.name, n.imageLandscape)}>
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
                  })) : (
                  <p><center><Loading /></center></p>
                )}

            </tbody>
          </table>
        </div>
        <div className='SelectionCenima'>
          <table>
            <thead>
              <tr>
                <th>CHỌN RẠP</th>
              </tr>
            </thead>
            {console.log("lsMovieId1: ", props.dataCenima1.lsMovieId1)}
            <tbody>
              {
                props.dataCenima1.lsMovieId1 ? (
                  props.dataCenima1.lsMovieId1?.map((n, i) => {
                    const idCenima = n.id
                    const nameCenima = n.name
                    return (
                      <tr key={i}>
                        <td style={{ backgroundColor: `${idCenima === selectedCenimaId ? "#006a6a" : ""}`, color: `${idCenima === selectedCenimaId ? "white" : ""}` }} onClick={() => HandleIdDates(n.id, n.name)}>{n.name}</td>
                      </tr>
                    )
                  })) : (
                  <p><center><Loading /></center></p>
                )}
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
                
                  props.dataCenima1.lsDates1.dates?.map((n, i) => {
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
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (globalState) => {
  return {
    dataCenima1: globalState.movieManage
  }
}
const mapDispatchToProps = (dispath) => {
  return {
    GetBooking: () => {
      dispath({
        type: actMovieToCinema.GET_BOOKING
      })
    },
    MovieIdTicket: (idMovies) => {
      dispath({
        type: actMovieToCinema.GET_MOVIE_ID_1,
        payload: idMovies
      })
    },
    MovieIdDates: (idCenima) => {
      dispath({
        type: actMovieToCinema.SET_MOVIE_DATES,
        payload: idCenima
      })
    },
    ResetMovieId: () => {
      dispath({
        type: actMovieToCinema.RESET_MOVIE_ID
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Ticket);

