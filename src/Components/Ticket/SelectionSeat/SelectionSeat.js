/* eslint-disable no-lone-blocks */
import React from 'react'
import './SelectionSeat.scss'
import { connect } from 'react-redux';
import actSeat from '../../../Redux/actionCenima/actSeat';
import { useEffect } from 'react';
import { useState } from 'react';
import SeatButton from './SeatButton';
import SeatCoupleButton from './SeatCoupleButton';
import { useNavigate } from 'react-router-dom';
import Countdown from './Countdown';
import Popup from '../../Popup/Popup';
import actBanking from '../../../Redux/actionCenima/actBanking';
import actUser from '../../../Redux/actionCenima/actUser';


function SelectionSeat(props) {

  let ticket = JSON.parse(sessionStorage.getItem("Ticket"));
  let mail = (localStorage.getItem("Email"))
  let sessionID = ticket.SessionId
  const [isSold, setIsSold] = useState([]);
  const nav = useNavigate()
  const [showPopup, setShowPopup] = useState(false);
  const selectedSeats = JSON.parse(sessionStorage.getItem("selectedSeats")) || {};
  const [seatPairs, setSeatPairs] = useState([]);
  const [seatSelect, setSeatSelect] = useState([])

  const handleClosePopup = () => {
    setShowPopup(false);
  };


  useEffect(() => {
    props.GetSeat()
    props.CheckUser(mail)
    props.GetSoldSeat(sessionID)
  }, []);

  console.log(props.dataSeat.lsSold)
  //Get toàn bộ các ghế đã bán theo sessionID
  const getDisabledSeats = () => {
    if (props.dataSeat.lsSold) {
      const disabledSeatCodes = props.dataSeat.lsSold.map((item) =>
        item.SeatCode.split(',').map((code) => code.trim())
      )
      return disabledSeatCodes.flat();

    }
    return [];
  }



  const disabledSeats = getDisabledSeats();

  console.log('This is arr of sold seat', disabledSeats);

  const mapNumericPairsToSeatCodes = (numericPairs, seatName) => {
    return numericPairs.map(pair => pair.map(number => `${seatName}${number}`));
  }

  const handleSeatCode = (updatedSeats) => {
    setSeatSelect(updatedSeats);
  }

  //Tạo ra mảng chứa toàn bộ ghế đôi
  useEffect(() => {
    const newSeatPairs = [];
    if (props.dataSeat.lsSeat1.rows) {

      props.dataSeat.lsSeat1.rows.map((row, rowIndex) => (
        row.seats.map((seat) => {
          if (seat.seatsInGroup) {
            const pair = seat.seatsInGroup.map((groupSeat) => groupSeat.columnIndex);
            newSeatPairs.push(pair);
          }
        })));
    }

    console.log('This is newSeatPairs:', newSeatPairs);

    // Loại bỏ các bản sao khỏi danh sách chỗ ngồi
    const uniqueSeatPairs = newSeatPairs.filter((pair, index, self) => {
      return index === self.findIndex((p) => p[0] === pair[0] && p[1] === pair[1]);
    })
    setSeatPairs(uniqueSeatPairs);
  }, [props.dataSeat.lsSeat1]);

  console.log(seatPairs)

  // Kiểm tra order
  const checkOrder = (ticketSingle, ticketCouple) => {
    const selectedSeatsData = JSON.parse(sessionStorage.getItem("selectedSeatsData")) || { seats: [] };
    //const ticket = JSON.parse(sessionStorage.getItem("Ticket"));
    const seatsByMode = selectedSeatsData.seats.reduce((count, seat) => {
      count[seat.mode] = (count[seat.mode] || 0) + 1;
      return count;
    }, {});

    const mode1SeatsCount = seatsByMode[1] || 0;
    const mode2SeatsCount = seatsByMode[2] || 0;

    if (ticketSingle !== mode1SeatsCount || ticketCouple * 2 !== mode2SeatsCount) {
      //alert('Please check your ticket selection.');
      setShowPopup(true)
    } else {

      const official = {
        ...ticket,
        seatCode: Object.values(selectedSeats).join(", ")
      }

      sessionStorage.setItem('Ticket', JSON.stringify(official));
      if (props.dataCard.lsCheck.length === 0) {
        nav('/payment')
      } else {
        nav('/paymento')
      }
    }

  };

  const handlePageUnload = () => {
    sessionStorage.removeItem('selectedSeats');
    sessionStorage.removeItem('selectedSeatsData');
  };

  useEffect(() => {
    // Gắn hàm handlePageUnload vào sự kiện window.onbeforeunload
    window.onbeforeunload = handlePageUnload;

    // Dọn dẹp các event 
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const onTimeout = () => {
    // Khi countdown về 0 sẽ quay về trang chủ và dọn dẹp sessionStorage
    nav('/')
    sessionStorage.removeItem('selectedSeats');
    sessionStorage.removeItem('selectedSeatsData');
    sessionStorage.removeItem('Ticket');
    localStorage.removeItem('countdownTime');
  };
  const BackTo = () => {
    nav("/selectionticket")
    const Ticket = JSON.parse(sessionStorage.getItem("Ticket"))
    let ticketSingle = Ticket.ticketSingle
    let ticketCouple = Ticket.ticketCouple
    let ticketCount = Ticket.ticketCount
    let seatCode = Ticket.seatCode

    const ticket = {
      ...Ticket,
      ticketSingle: 0,
      ticketCouple: 0,
      ticketCount: 0,
      seatCode: ""
    }
    sessionStorage.setItem("Ticket", JSON.stringify(ticket))
    sessionStorage.removeItem("selectedSeats")
    sessionStorage.removeItem("selectedSeatsData")
  }


  return (
    <div className='SelectionSeat'>
      <div className='Container'>
        <div className='selectionTicket'>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1>CHỌN GHẾ</h1></div>
          <Countdown minutes={1} onTimeout={onTimeout} />
          <div className='loaive'>
            <h3>Màn Hình</h3>
            <div>
              {props.dataSeat.lsSeat.rows &&
                props.dataSeat.lsSeat.rows.map((row, i) => (
                  <div key={i} style={{ display: 'flex', gap: '5px', marginBottom: '5px', justifyContent: 'center' }}>
                    <span style={{ width: '20px', visibility: row.seats.length === 0 ? 'hidden' : 'visible', color: 'white', background: "#df4275", textAlign: "center" }}>
                      {row.physicalName}
                    </span>
                    {/* Kiểm tra xem chỗ ngồi ở vị trí hiện tại có nên được hiển thị không */}
                    {Array(props.dataSeat.lsSeat.width).fill(0).map((_, i2) => {
                      {/* Kiểm tra rowIndex của ghế s có khớp vời chỉ số hàng i hay không và columnIndex của ghế s có khớp với chỉ số cột i2 hay không  */ }
                      const isShow = row.seats.some(s => s.position.rowIndex === i && s.position.columnIndex === i2);
                      const seatCode = `${row.physicalName}${i2}`;
                      //const disabledSeats = getDisabledSeats();
                      //const isDisabled = disabledSeats.includes(seatCode);
                      const isDisabled = disabledSeats.includes(seatCode);
                      console.log('isDiabel seat code single seat:', isDisabled) // Get the disabledSeats array
                      return <SeatButton key={i2}
                        seatCode={seatCode}
                        isShow={isShow}
                        seatCodeSelect={handleSeatCode}
                        isDisabled={isDisabled}
                      />
                    })}
                  </div>
                ))}
            </div>
            <div>
              {
                props.dataSeat.lsSeat1.rows &&
                props.dataSeat.lsSeat1.rows.map((row, i) => {
                  const seatName = row.physicalName;
                  const seatCodes = mapNumericPairsToSeatCodes(seatPairs, seatName);
                  //const isDisabled = seatCodes.some(pairCodes => pairCodes.some(code => disabledSeats.includes(code)));
                  //const isDisabled1 = disabledSeats.includes(seatCode);
                  //const isDisabled = disabledSeats.includes(seatCodes);
                  //const disabledCodeIndex = seatCodes.findIndex(pairCodes => pairCodes.some(code => disabledSeats.includes(code)));

                  {/* Xác định các ghế sẽ bị disable (đã bán) */ }
                  const disabledIndex = disabledSeats.reduce((indices, disabledSeat) => {
                    const index = seatCodes.findIndex(pairCodes => pairCodes.includes(disabledSeat));
                    if (index !== -1 && !indices.includes(index)) {
                      indices.push(index);
                    }
                    return indices;
                  }, []);
                  //console.log('This is disabledCodeIndex', disabledCodeIndex)
                  return (
                    <div key={i} style={{ display: 'flex', gap: '5px', marginBottom: '5px', justifyContent: 'center', alignItems: "center" }}>
                      <span style={{ width: '20px', visibility: row.seats.length === 0 ? 'hidden' : 'visible', color: 'white', background: "#df4275", textAlign: "center" }}>
                        {row.physicalName}
                      </span>
                      <SeatCoupleButton
                        seatPairs={seatCodes}
                        seatCodeSelect={handleSeatCode}
                        disabledIndex={disabledIndex}
                      />
                    </div>
                  )
                })
              }
              <div class="seat-cinema">
                <span class="seat-cinema-selected">Ghế Đơn</span> <span class="seat-cinema-couple">Ghế Đôi</span> <span class="seat-cinema-unavailable">Ghế Đã Bán</span>
              </div>
            </div>
          </div>
        </div>

        <div className='infoTicket'>
          <div>
            <img src={ticket.imgMovie} alt='image movies' />
          </div>

          <div>
            <h2 className='name'>{ticket.nameMovie}</h2>
          </div>

          <div>
            <p><span>Rạp: </span>{ticket.CinemaName}</p>
            <p><span>Screen:</span>{ticket.ScreenName}</p>
            <p><span>Suất chiếu: </span>{ticket.Showtime} | {ticket.DateShow}, {ticket.DayOfWeek}</p>
            <p><span>Số lượng vé: </span>{ticket.ticketCount} | Ghế đơn: {ticket.ticketSingle} | Ghế đôi: {ticket.ticketCouple}</p>
            <p><span>Mã ghế:</span>
              {Object.values(selectedSeats).join(", ")}
            </p>
            <p><span>Combo:</span>{ticket.comboName}</p>
            <p><span>Tổng: </span>{ticket.totalSum.toLocaleString()}</p>
          </div>
          <div className='bnt'>
            <button onClick={BackTo}>Quay Lại</button>
            <button onClick={() => checkOrder(ticket.ticketSingle, ticket.ticketCouple)}>Tiếp tục</button>
          </div>
          {showPopup && <Popup noti="Vui lòng chọn đúng số lượng ghế" onClose={handleClosePopup} />}
        </div>

      </div>
    </div>
  )
}

const mapStateToProps = (globalState) => {
  return {
    dataSeat: globalState.seatManage,
    dataCard: globalState.historyManage,
  }
}
const mapDispatchToProps = (dispath) => {
  return {
    GetSeat: () => {
      dispath({
        type: actSeat.GET_SEAT
      })
    },
    CheckUser: (mail) => {
      //console.log(mail)
      dispath({
        type: actUser.GET_CHECK_BANK,
        payload: mail
      })
    },
    GetSoldSeat: (sessionID) => {

      dispath({
        type: actSeat.GET_SOLD_SEAT,
        payload: sessionID
      })
    },


  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectionSeat);