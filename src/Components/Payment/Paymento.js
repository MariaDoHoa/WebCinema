import React, { useEffect, useState } from 'react'
import './Payment.scss'
import { connect } from 'react-redux';
import actBanking from '../../Redux/actionCenima/actBanking';
import { useNavigate } from 'react-router-dom';
import Countdown from '../Ticket/SelectionSeat/Countdown';
import Popupss from '../Popup/Popupss';
import actPayment from '../../Redux/actionCenima/actPayment';
import Popup from '../Popup/Popup';
import "./Paymento.scss"

const formatShowtime = (showtimeString, dayOfWeekString) => {
  const [day, month, year] = dayOfWeekString.split('/').map(Number);
  const [hours, minutes] = showtimeString.split(':').map(Number);

  const showtimeDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  const formattedShowtime = showtimeDate.toISOString();
  // State to track the success status

  return formattedShowtime;
};

function Paymento(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupss, setShowPopupss] = useState(false);
  const [isSuccess, setIsSuccess] = useState('');

  const ticket = JSON.parse(sessionStorage.getItem("Ticket"));
  const selectedSeats = JSON.parse(sessionStorage.getItem("selectedSeats")) || {};
  const nav = useNavigate()

  const [selectBank, setselectBank] = useState(null);
  const [CardNumber, setCardNumber] = useState('');
  const [CardName, setCardName] = useState('')
  const [ExpireDate, setExpDate] = useState('')
  const [CVV, setCVV] = useState('')

  const [CardNumberError, setCardNumberError] = useState("")
  const [CVVError, setCVVError] = useState("")


  useEffect(() => {
    props.GetCard()
  }, []);

  useEffect(() => {
    if (props.dataPayment.isSuccess === "200") {
      props.PostSucess()
      setShowPopupss(true)

    } else if (props.dataPayment.isSuccess === "404") {
      props.PostFail()
      setShowPopup(true);
    }
  }, [props.dataPayment.isSuccess])


  const handleClosePopupss = () => {
    setShowPopupss(false);
    nav('/history')
  };

  const handleClosePopup = () => {
    setShowPopup(false)
    setCardNumber('')
    setCVV('')

    nav('/paymento')
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const checkCard = (CardNumber) => {
      //console.log(CardNumber);
      const filteredCards = props.dataCard.lsCard.filter(
        (card) => card.CardNumber === CardNumber && card.CVV === CVV)

      if (filteredCards.length > 0) {
        return filteredCards[0];
      } else {
        return null;
      }
    }

    const filteredCards = checkCard(CardNumber);
    //console.log(filteredCards);

    const re = /^[0-9]{6,}$/;
    // const text = /^[\p{L}\s]+$/u;
    // const exp = /^(0[1-9]|1[0-2])([0-9]{2})$/;
    if (!re.test(CardNumber)) {
      setCardNumberError("Kiểm tra lại card number, là số có ít nhất 6 ký tự")
      return
    } else {
      setCardNumberError("")
      if (CVV.length !== 3) {
        setCVVError("Kiểm tra lại cvv, sau lưng thẻ có 3 ký tự")
        return
      }
      const formattedShowtime = formatShowtime(ticket.Showtime, ticket.DayOfWeek);
      //const idBank = `${selectBank}`
      const mail = (localStorage.getItem('Email'))

      // Prepare the form data to be submitted
      if (filteredCards) {
        const payTicket = {
          BankId: filteredCards.BankId,
          CardNumber: filteredCards.CardNumber,
          CardName: filteredCards.CardName,
          ExpireDate: filteredCards.ExpireDate,
          CVV: filteredCards.CVV,
          Price: ticket.totalSum,
          ShowCode: ticket.SessionId,
          Email: mail,
          CinemaName: ticket.CinemaName,
          TheaterName: ticket.ScreenName,
          FilmName: ticket.MovieName,
          ImageLandscape: ticket.imgMovie,
          ImagePortrait: ticket.imgMovie,
          Combo: ticket.comboName,
          SeatCode: ticket.seatCode,
          ShowTime: formattedShowtime,
        }
        //console.log(payTicket);

        await props.PostOrder(payTicket);
        await props.SetTicket(mail);
      } else {
        console.log("Card not found. Please check again.");
        setShowPopup(true)
      }
    }
  }


  const onTimeout = () => {
    nav('/')
    sessionStorage.removeItem('selectedSeats')
    sessionStorage.removeItem('selectedSeatsData')
    sessionStorage.removeItem('Ticket')
    localStorage.removeItem('countdownTime')
  };
  const BackToHome = () => {
    nav("/")
  }

  return (
    <div className='Paymento'>
      <div className='Container'>
        <div className='selectionTicket'>
          <div className='title'>
            <h1>VUI LÒNG THANH TOÁN</h1>
            <Countdown minutes={1} onTimeout={onTimeout} />
          </div>
          <div className='loaive'>
            <form onSubmit={handleSubmit} id="orderForm">
              <p>Vui lòng nhập Card Number và CVV</p>
              <div className='infoBank'>
                <div>
                  <input
                    placeholder='CardNumber'
                    className='input'
                    type="text"
                    value={CardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  /><br />
                  {CardNumberError && <span>{CardNumberError}</span>}
                  {showPopup && <Popup noti="Thanh toán thất bại" onClose={handleClosePopup} />}
                </div>
                <div>
                  <input
                    placeholder='CVV'
                    className='input'
                    type="text"
                    value={CVV}
                    onChange={(e) => setCVV(e.target.value)}
                  /><br />
                  {CVVError && <span>{CVVError}</span>}
                </div>
              </div>
              <div className='bnt'>
                <button type="submit" form='orderForm'>Thanh toán</button>
                <button onClick={BackToHome}>Huỷ đặt vé</button>
              </div>
            </form>
            {/* {showPopupss && <Popupss noti="Thanh toán thành công" onClose={handleClosePopupss} />} */}
          </div>
        </div>

        <div className='infoTicket'>
          <div>
            <img src={ticket.imgMovie} alt='poster of movie' />
          </div>

          <div>
            <h2 className='name'>{ticket.nameMovie}</h2>
          </div>

          {showPopup && <Popup noti="Thanh toán thất bại" onClose={handleClosePopup} />}
          <div>
            <p><span>Rạp: </span>{ticket.CinemaName}</p>
            <p><span>Screen:</span>{ticket.ScreenName}</p>
            <p><span>Suất chiếu: </span>{ticket.Showtime} | {ticket.DateShow}, {ticket.DayOfWeek}</p>
            <p><span>Số lượng vé: </span>{ticket.ticketCount}</p>
            <p><span>Mã ghế:</span>
              {Object.values(selectedSeats).join(", ")}
            </p>
            <p><span>Combo:</span></p>
            <p><span>Tổng: </span>{ticket.totalSum.toLocaleString()}</p>
            {showPopupss && <Popupss
              noti={`Thanh Toán Thành Công!!!
              Thông tin vé:
              Phim: ${ticket.MovieName}
              Rạp: ${ticket.CinemaName}
              Screen: ${ticket.ScreenName}
              Suất chiếu: ${ticket.Showtime} | ${ticket.DateShow}, ${ticket.DayOfWeek}
              Số lượng vé: ${ticket.ticketCount}
              Mã ghế: ${Object.values(selectedSeats).join(", ")}
              Combo: ${ticket.comboName}
            `}
              onClose={handleClosePopupss} />}
          </div>
        </div>

      </div>

    </div>
  )
}
const mapStateToProps = (globalState) => {
  return {
    dataCard: globalState.bankManage,
    dataPayment: globalState.paymentManage
  }
}
const mapDispatchToProps = (dispath) => {
  return {
    GetCard: () => {
      dispath({
        type: actBanking.GET_CARD
      })
    },
    PostOrder: (payTicket) => {
      dispath({
        type: actPayment.POST_PAYMENT,
        payload: payTicket
      })
    },
    PostSucess: () => {
      dispath({
        type: actPayment.SUCCESS_PAYMENT,
      })
    },
    PostFail: () => {
      dispath({
        type: actPayment.FAILED_PAYMENT
      })
    },
    SetTicket: (mail) => {
      dispath({
        type: actPayment.POST_TICKET,
        payload: mail
      })
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paymento) 
