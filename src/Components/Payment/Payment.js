import React, { useEffect, useState } from 'react'
import './Payment.scss'
import { connect } from 'react-redux';
import actBanking from '../../Redux/actionCenima/actBanking';
import { useNavigate } from 'react-router-dom';
import actPayment from '../../Redux/actionCenima/actPayment';
import Popup from '../Popup/Popup';
import Popupss from '../Popup/Popupss';
import Countdown from '../Ticket/SelectionSeat/Countdown';

const formatShowtime = (showtimeString, dayOfWeekString) => {
  const [day, month, year] = dayOfWeekString.split('/').map(Number);
  const [hours, minutes] = showtimeString.split(':').map(Number);

  const showtimeDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  const formattedShowtime = showtimeDate.toISOString();
  return formattedShowtime;
};

function Payment(props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupSuccess, setShowPopupSuccess] = useState(false);

  const [selectBank, setselectBank] = useState(null);
  const [CardNumber, setCardNumber] = useState('');
  const [CardName, setCardName] = useState('')
  const [ExpireDate, setExpDate] = useState('')
  const [CVV, setCVV] = useState('')
  const [Email, setEmail] = useState('')

  const [BankError, setBankError] = useState("")
  const [CardNumberError, setCardNumberError] = useState("")
  const [CardNameError, setCardNameError] = useState("")
  const [ExpireDateError, setExpireDateError] = useState("")
  const [CVVError, setCVVError] = useState("")
  const [EmailError, setEmailError] = useState("")

  const ticket = JSON.parse(sessionStorage.getItem("Ticket"));
  const selectedSeats = JSON.parse(sessionStorage.getItem("selectedSeats")) || {};
  const nav = useNavigate()

  useEffect(() => {
    props.GetBank()
  }, [])

  useEffect(() => {
    if (props.dataPayment.isSuccess === "200") {
      props.PostSucess()
      setShowPopupSuccess(true)

    } else if (props.dataPayment.isSuccess === "404") {
      props.PostFail()
      setShowPopup(true);
    }
  }, [props.dataPayment.isSuccess])

  const handleSelectBank = async (event) => {
    setselectBank(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const re = /^[0-9]{6,}$/;
    const text = /^[\p{L}\s]+$/u;
    const exp = /^(0[1-9]|1[0-2])([0-9]{2})$/;
    if (selectBank == null) {
      setBankError("Vui lòng chọn ngân hàng")
      return
    }
    else {
      setBankError("")
      if (re.test(CardNumber) == false) {
        setCardNumberError("Kiểm tra lại card number, là số có ít nhất 6 ký tự")
        return
      }
      else {
        setCardNumberError("")
        if (text.test(CardName) == false) {
          setCardNameError("Kiểm tra lại card name, là chữ không nhập số")
          return
        }
        else {
          setCardNameError("")
          if (!exp.test(ExpireDate)) {
            setExpireDateError("Kiểm tra lại ngày hết hạn, định dạng mmyy vd: 0823")
            return
          }
          else {
            setExpireDateError("")
            if (CVV.length !== 3) {
              setCVVError("Kiểm tra lại cvv, sau lưng thẻ có 3 ký tự")
              return
            }

            const today = new Date();
            const expirationYear = Number(`20${ExpireDate.substr(2)}`);
            const expirationMonth = Number(ExpireDate.substr(0, 2)) - 1; // Tháng được lập chỉ mục 0 (tháng 1 là 0)
            const expirationDate = new Date(expirationYear, expirationMonth);

            if (expirationDate <= today) {
              setExpireDateError('Ngày hết hạn không hợp lệ. Vui lòng kiểm tra lại.');
              return;
            }
          }
        }
      }
    }

    const formattedShowtime = formatShowtime(ticket.Showtime, ticket.DayOfWeek);
    const idBank = `${selectBank}`
    const mail = localStorage.getItem('Email')
    // Chuẩn bị data trước khi POST
    const payTicket = {
      BankId: idBank,
      CardNumber: CardNumber,
      CardName: CardName,
      ExpireDate: ExpireDate,
      CVV: CVV,
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
      ShowTime: formattedShowtime
    }
    //console.log(payTicket);
    await props.PostOrder(payTicket);
    await props.SetTicket(mail);

  }

  const onTimeout = () => {
    // Khi coutdown đếm ngược về 0 sẽ thực hiện
    nav('/')
    sessionStorage.removeItem('selectedSeats');
    sessionStorage.removeItem('selectedSeatsData');
    sessionStorage.removeItem('Ticket');
    localStorage.removeItem('countdownTime');
  }

  const handleClosePopupss = () => {
    setShowPopupSuccess(false)

    // Sau khi xử lý biểu mẫu, đặt lại các giá trị trạng thái
    setselectBank(null);
    setCardNumber('');
    setCardName('');
    setExpDate('');
    setCVV('');
    setEmail('');

    setCardNumberError('');
    setCardNameError('');
    setExpireDateError('');
    setCVVError('');
    setEmailError('');

    sessionStorage.clear()

    nav('/history')
  };

  const handleClosePopup = () => {
    setShowPopup(false)

    setselectBank(null);
    setCardNumber('');
    setCardName('');
    setExpDate('');
    setCVV('');
    setEmail('');

    setCardNumberError('');
    setCardNameError('');
    setExpireDateError('');
    setCVVError('');
    setEmailError('');

    nav('/payment')
    //sessionStorage.clear()

  };

  const BackToHome = () => {
    nav("/")
  }
  return (
    <div className='Payment'>
      <div className='Container'>
        <div className='selectionTicket'>
          <div className='title'>
            <h1>VUI LÒNG THANH TOÁN</h1>
            <Countdown minutes={1} onTimeout={onTimeout} />
          </div>
          <div className='loaive'>
            <form onSubmit={handleSubmit} id="orderForm">
              <div className='banking'>
                <div className='main'>
                  {
                    props.dataBank.lsBank.map((n) => (
                      <div key={n.Id}>
                        <input type="radio" name="bank" value={n.Id} onChange={handleSelectBank} />
                        <img style={{ width: '20px' }} src={n.Logo} alt='payment' />
                        <label>{n.Name}</label>
                      </div>
                    ))
                  }
                </div>
              </div>
              {BankError && <span style={{ color: "red" }}>{BankError}</span>}
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
                </div>
                <div>
                  <input
                    placeholder='CardName'
                    className='input'
                    type="text"
                    value={CardName}
                    onChange={(e) => setCardName(e.target.value)}
                  /><br />
                  {CardNameError && <span>{CardNameError}</span>}
                </div>
                <div>
                  <input
                    placeholder='Expiration Date'
                    className='input'
                    type="text"
                    value={ExpireDate}
                    onChange={(e) => setExpDate(e.target.value)}
                  /><br />
                  {ExpireDateError && <span>{ExpireDateError}</span>}
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
              {showPopup && <Popup noti="Thanh toán thất bại" onClose={handleClosePopup} />}
              {/* { showPopupSuccess && <Popup noti="Thanh toán thành công" onClose={handleClosePopupSucces} /> } */}

            </form>
          </div>
        </div>
        <div className='infoTicket'>
          <div>
            <img src={ticket.imgMovie} alt='poster of movie' />
          </div>

          <div>
            <h2 className='name'>{ticket.nameMovie}</h2>
          </div>

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
            {showPopupSuccess && <Popupss 
            noti={`Thanh toán thành công, thông tin vé:\nRạp: ${ticket.CinemaName}\nScreen: ${ticket.ScreenName}\nSuất chiếu: ${ticket.Showtime} | ${ticket.DateShow}, ${ticket.DayOfWeek}\n
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
    dataBank: globalState.bankManage,
    dataPayment: globalState.paymentManage
  }
}
const mapDispatchToProps = (dispath) => {
  return {
    GetBank: () => {
      dispath({
        type: actBanking.GET_BANK
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
        type: actPayment.SUCCESS_PAYMENT
      })
    },
    PostFail: () => {
      dispath({
        type: actPayment.FAILED_PAYMENT
      })
    },
    SetTicket: (Email) => {
      dispath({
        type: actPayment.POST_TICKET,
        payload: Email
      })
    }

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Payment);