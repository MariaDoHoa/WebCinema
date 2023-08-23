import React, { useEffect, useState } from 'react'
import "./SelectionTicket.scss"
import { connect } from "react-redux";
import actCenima from '../../../Redux/actionCenima/actCenima';
import { useNavigate } from 'react-router-dom';
import Popup from '../../Popup/Popup';


function SelectionTicket(props) {
    const nav = useNavigate()
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup1, setShowPopup1] = useState(false);
    const [counts, setCounts] = useState({});
    //Khởi tạo một state counts với giá trị ban đầu là một đối tượng rỗng ({}).
    //Biến counts sẽ chứa thông tin về số lượng vé của từng loại thông qua index 
    const [Combo, setCombo] = useState({});


    const ticket = JSON.parse(sessionStorage.getItem("Ticket"));
    let totalSum = 0
    let ticketCount = 0
    let comboCount = 0
    let ticketCouple = 0
    let ticketSingle = 0
    let combo = ""

    useEffect(() => {
        props.GetBookingDetail()
    }, [])

    useEffect(() => {
    // Khởi tạo counts với các giá trị ban đầu nhỏ hơn 8 tại đây
        const initialCounts = {};
        props.dataCenima.lsBookingDetail.ticket?.forEach((_, index) => {
            initialCounts[index] = 0 // Đặt giá trị ban đầu của counts tại mỗi index là 0
        });
        setCounts(initialCounts) //Cập nhật state counts với giá trị ban đầu

        props.GetBookingDetail()
       
    }, [])
   
    //Hàm thực hiện kiểm tra xem giá trị hiện tại của counts[index] 
    //có thỏa mãn điều kiện (nhỏ hơn 8 hoặc lớn hơn 0) trước khi thay đổi giá trị.

    const Up = (index) => {
        if (counts[index] < 8) {
            setCounts(prevCounts => ({
                ...prevCounts,
                [index]: (prevCounts[index] || 0) + 1
            }))
        }
    }
    
    const Down = (index) => {
        if (counts[index] > 0) {
            setCounts(prevCounts => ({
                ...prevCounts,
                [index]: (prevCounts[index] || 0) - 1
            }));
        }
    };

    const UpCombo = (index) => {
        setCombo(prevCombo => ({
            ...prevCombo,
            [index]: (prevCombo[index] || 0) + 1
        }));
    };
    const DownCombo = (index) => {
        if (Combo[index] > 0) {
            setCombo(prevCombo => ({
                ...prevCombo,
                [index]: (prevCombo[index] || 0) - 1
            }));
        }
    }

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    const calculateTotal = () => {
        let ticketTotal = 0;
        let concessionTotal = 0;
        props.dataCenima.lsBookingDetail.ticket?.forEach((n, i) => {
            // lặp qua mảng ticket
            const count = counts[i] || 0; //tại vị trí x, có số lượng vé là đã chọn 
            ticketTotal += count * n.displayPrice; //số lượng vé x giá vé 
        });

        props.dataCenima.lsBookingDetail.consession?.forEach((consession) => {
            consession.concessionItems.forEach((n1, i1) => {
                const count = Combo[i1] || 0; // Lấy số lượng của combo dựa vào item.id
                concessionTotal += count * n1.displayPrice; // Tính tổng giá trị của combo dựa vào item.displayPrice
            });
        });
        const total = ticketTotal + concessionTotal
        return total
    };

    
    const Confirm = (totalSum, ticketCount, comboCount, ticketCouple, ticketSingle, combo, counts, Combo) => {
        if (ticketCount === 0) {
            setShowPopup(true);
        } else
            if (ticketCount > 0 && ticketCount > 8) {
                setShowPopup1(true)
            }
            else {

                const Ticket = {
                    ...ticket,
                    totalSum: totalSum,
                    ticketCount: ticketCount,
                    comboCount: comboCount,
                    ticketCouple: ticketCouple,
                    ticketSingle: ticketSingle,
                    comboName: combo
                };
                setShowPopup(false);

                sessionStorage.setItem('Ticket', JSON.stringify(Ticket));
                nav('/selectionseat')
            }
    }

    const handleClosePopup = () => {
        setShowPopup(false);
        setShowPopup1(false);
    }

    const BackTo = () => {
        nav("/movieticketid")
    }
    return (

        <div className='SelectionTicket'>
            <div className='Container'>
                <div className='selectionTicket'>
                    <h1>CHỌN VÉ/THỨC ĂN</h1>
                    <div className='loaive'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Loại vé</th>
                                    <th>Số lượng </th>
                                    <th>Giá(VNĐ)</th>
                                    <th>Tổng(VNĐ)</th>
                                </tr>
                            </thead>
                            <tbody className='ticketType'>
                                {
                                    props.dataCenima.lsBookingDetail.ticket?.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <p>{item.name}</p>
                                                    <p>{item.description}</p>
                                                    <p>{item.extendedDescription}</p>
                                                </td>

                                                <td>
                                                    <button onClick={() => { Down(index) }} style={{ padding: "5px", fontWeight: "bold", margin: "5px" }}>-</button>
                                                    <input
                                                        style={{ width: "40px", textAlign: "center" }}
                                                        type='number'
                                                        value={counts[index] || 0}
                                                        onChange={(e) => {
                                                            const newValue = parseInt(e.target.value) || 0; //lấy giá trị mới của ô input thông qua e.target.value. Sử dụng parseInt để chuyển giá trị đó thành số nguyên
                                                            setCounts(prevCounts => ({
                                                                ...prevCounts,
                                                                index: newValue
                                                            })); //cập nhật giá trị của loại vé tương ứng bằng giá trị mới newValue.
                                                        }}
                                                    />
                                                    <button onClick={() => { Up(index) }} style={{ padding: "5px", fontWeight: "bold", margin: "5px" }}>+</button>
                                                </td>

                                                <td>{item.displayPrice.toLocaleString()}</td>
                                                <td>{numberWithCommas((counts[index] || 0) * item.displayPrice)}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            <thead>
                                <tr>
                                    <th>Combo</th>
                                    <th>Số lượng </th>
                                    <th>Giá(VNĐ)</th>
                                    <th>Tổng(VNĐ)</th>
                                </tr>
                            </thead>
                            <tbody className='Combo'>
                                {
                                    props.dataCenima.lsBookingDetailCb?.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <p>{item.name}</p>
                                                    <p>{item.description}</p>
                                                    <p>{item.extendedDescription}</p>
                                                </td>
                                                <td>
                                                    <button onClick={() => { DownCombo(index) }} style={{ padding: "5px", fontWeight: "bold", margin: "5px" }}>-</button>
                                                    <input
                                                        style={{ width: "40px", textAlign: "center" }}
                                                        value={Combo[index] || 0}
                                                        type='number'
                                                        onChange={(e) => {
                                                            const newValue = parseInt(e.target.value) || 0;
                                                            setCombo(prevCounts => ({
                                                                ...prevCounts,
                                                                index: newValue
                                                            }));
                                                        }}
                                                    />
                                                    <button onClick={() => { UpCombo(index) }} style={{ padding: "5px", fontWeight: "bold", margin: "5px" }}>+</button>
                                                </td>

                                                <td>{item.displayPrice.toLocaleString()}</td>
                                                <td>{numberWithCommas((Combo[index] || 0) * item.displayPrice)}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='infoTicket'>
                    <div>
                        <img src={ticket.imgMovie} alt='poster movie'/>
                    </div>
                    <div>
                        <h2 className='name'>{ticket.nameMovie}</h2>
                    </div>
                    <div>
                        <p><span>Rạp: </span>{ticket.CinemaName}</p>
                        <p><span>Screen:</span>{ticket.ScreenName}</p>
                        <p><span>Suất chiếu: </span>{ticket.Showtime} | {ticket.DateShow}, {ticket.DayOfWeek}</p>
                        <p><span>Vé: </span>
                            {
                                props.dataCenima.lsBookingDetail.ticket?.map((item, index) => {
                                    const quantity = counts[index] || 0; //lấy giá trị tại vị trí này gán vào biến quantity(số lượng vé)
                                    if (quantity > 0) { //nếu giá trị lớn hơn 0 (số lượng vé lớn hơn 0)
                                        totalSum += ((counts[index] || 0) * item.displayPrice); //tổng bằng số lượng vé nhân cho giá vé 
                                        ticketCount += quantity //số lượng vé gán vào tickeCount
                                        if (index === 2) {// chỗ này là ghế đôi 
                                            ticketCouple += quantity;// số lượng ghế gán vào ticketCouple 
                                        } if (index === 1 || index === 0) {//chỗ này là ghế đơn 
                                            ticketSingle += quantity //số lượng ghế gán vào ticketSingle
                                        }
                                        return (
                                            <li key={index}>
                                                {quantity} x {item.name}
                                                {/* : {calculateTotalPrice(quantity, item.displayPrice).toLocaleString()} */}
                                            </li>
                                        )
                                    }
                                    return null;

                                })
                            }
                        </p>
                        <p><span>Combo: </span>
                            {
                                props.dataCenima.lsBookingDetail.consession?.map((n) => {
                                    return n.concessionItems.map((item, index) => {
                                        const quantity = Combo[index] || 0;
                                        if (quantity > 0) {
                                            totalSum += ((Combo[index] || 0) * item.displayPrice);
                                            comboCount += quantity
                                            combo += item.extendedDescription + ', '
                                            return (
                                                <li key={index}>
                                                    {quantity} x {item.description}<br />({item.extendedDescription})
                                                    {/* : {calculateTotalPrice(quantity, item.displayPrice).toLocaleString()} */}
                                                </li>
                                            )
                                        }
                                        return null
                                    })
                                })
                            }
                        </p>
                        <p><span>Tổng: {numberWithCommas(calculateTotal())}</span></p>
                    </div>
                    <div className='bnt'>
                        <button onClick={BackTo}>Quay Lại</button>
                        <button onClick={() => Confirm(totalSum, ticketCount, comboCount, ticketCouple, ticketSingle, combo)}>Tiếp Tục</button>
                    </div>
                    {showPopup && <Popup noti="Vui lòng chọn số lượng vé" onClose={handleClosePopup} />}
                    {showPopup1 && <Popup noti="Quý khách vui lòng chỉ được mua giới hạn 8 vé" onClose={handleClosePopup} />}
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (globalState) => {
    return {
        dataCenima: globalState.dataManage,
        dataSeat: globalState.seatManage,

    }
}
const mapDispatchToProps = (dispath) => {
    return {
        GetBookingDetail: () => {
            dispath({
                type: actCenima.GET_BOOKING_DETAIL
            })
        },


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectionTicket);
