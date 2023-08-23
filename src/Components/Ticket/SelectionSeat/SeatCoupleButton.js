import React, { useEffect, useState } from 'react'

export default function SeatCoupleButton({ seatName, isShow, seatPairs, seatCodeSelect, disabledIndex }) {
  console.log('Disabled Couple Seats at disabledCodeIndex:', disabledIndex);
  const [seatStates, setSeatStates] = useState(seatPairs.map(() => ({ isHovered: false, isChecked: false })));

  const seatCodePairs = seatPairs.map(pair => pair.map(number => `${number}`));
  //console.log(seatCodePairs);



  const handleMouseEnter = (index) => {
    setSeatStates((prevSeatStates) => {
      const updatedSeatStates = [...prevSeatStates];
      updatedSeatStates[index] = { ...updatedSeatStates[index], isHovered: true };
      return updatedSeatStates;
    });
  };

  //Sử dụng hàm setSeatStates để cập nhật trạng thái ghế đôi,
  //thông qua việc truyền vào một hàm callback nhận trạng thái trước đó prevSeatStates.
  const handleMouseLeave = (index) => {
    setSeatStates((prevSeatStates) => {
      const updatedSeatStates = [...prevSeatStates] //Tạo một bản sao của mảng trạng thái prevSeatStates để thay đổi trạng thái ghế đôi mà không ảnh hưởng đến trạng thái gốc.
      updatedSeatStates[index] = { ...updatedSeatStates[index], isHovered: false }
      //Tại chỉ số index (ghế đôi cụ thể), cập nhật trạng thái bằng cách tạo một đối tượng mới có trạng thái isHovered (đang được di chuột vào) là false, nhưng giữ nguyên các thuộc tính khác của đối tượng ghế đôi.
      return updatedSeatStates;
    });
  };

  const handleClick = (index) => {
    setSeatStates((prevSeatStates) => {
      const updatedSeatStates = [...prevSeatStates];
      updatedSeatStates[index] = { ...updatedSeatStates[index], isChecked: !updatedSeatStates[index].isChecked };
      return updatedSeatStates;
    });

    const selectedSeats = JSON.parse(sessionStorage.getItem("selectedSeats")) || [];
    //const selectedSeatCodes = seatPairs[index].map(n => `${seatName}${n}`);
    const selectedSeatCodes = seatPairs[index]

    if (selectedSeatCodes) {
      // Kiểm tra tất cả các mã ghế của cặp này đã được chọn chưa
      const allSelected = selectedSeatCodes.every(code => selectedSeats.includes(code));

      if (allSelected) {
        // Các ghế trong cặp này đã được chọn, xóa chúng khỏi session
        const updatedSeats = selectedSeats.filter(code => !selectedSeatCodes.includes(code));
        sessionStorage.setItem("selectedSeats", JSON.stringify(updatedSeats));
        seatCodeSelect(updatedSeats);
      } else {
        // Các ghế chưa được chọn, hãy thêm chúng vào session
        const updatedSeats = [...selectedSeats, ...selectedSeatCodes];
        sessionStorage.setItem("selectedSeats", JSON.stringify(updatedSeats));
        seatCodeSelect(updatedSeats);
      }

      // Cập nhật dữ liệu vào selectedSeatsData 
      const selectedSeatsData = JSON.parse(sessionStorage.getItem("selectedSeatsData")) || { mode: 1, seats: [] };

      // Kiểm tra xem mã ghế của cặp này đã có trong SelectSeatsData chưa
      const seatCodesInData = selectedSeatCodes.every(code => selectedSeatsData.seats.some(seatData => seatData.seatCode === code));

      if (seatCodesInData) {
        // Các ghế đã có trong SelectSeatsData, xóa khỏi selectedSeatsData
        const updatedSeatsData = {
          ...selectedSeatsData,
          seats: selectedSeatsData.seats.filter(seatData => !selectedSeatCodes.includes(seatData.seatCode)),
        };
        sessionStorage.setItem("selectedSeatsData", JSON.stringify(updatedSeatsData));
      } else {
        // Các ghế chưa có trong SelectSeatsData, thêm vào selectedSeatsData, đánh dấu mode:2
        const updatedSeatsData = {
          ...selectedSeatsData,
          seats: [...selectedSeatsData.seats, ...selectedSeatCodes.map(seatCode => ({ mode: 2, seatCode }))],
        };
        sessionStorage.setItem("selectedSeatsData", JSON.stringify(updatedSeatsData));
      }
    }
  };


  const getBackgroundColor = (index) => {
    const seatState = seatStates[index];
    if (seatState && seatState.isChecked) {
      return 'blue'; //  màu khi được click
    } else if (seatState && seatState.isHovered) {
      return 'salmon'; //  màu khi được hover
    } else {
      return 'green'; //  màu default
    }
  };

  return (
    <div>
      {seatPairs.map((pair, index) => (
        <div
          key={index}
          style={{ display: 'inline-block', alignItems: 'center', margin: '5px' }}
        >
          <button
            onClick={() => handleClick(index)}

            style={{
              width: '35px',
              //backgroundColor: getBackgroundColor(index),
              backgroundColor: disabledIndex.includes(index) ? 'gray' : getBackgroundColor(index),
              textAlign: 'center',
              color: 'white',
              borderRight: '1px solid white',
              fontSize: '11px',
              padding: '5px'

            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            // disabled={disabledSeats}
            disabled={disabledIndex.includes(index)}

          >
            {pair[0]}
          </button>
          <button
            onClick={() => handleClick(index)}

            style={{
              width: '35px',
              //backgroundColor: getBackgroundColor(index),
              backgroundColor: disabledIndex.includes(index) ? 'gray' : getBackgroundColor(index),
              textAlign: 'center',
              color: 'white',
              fontSize: '11px',
              padding: '5px'
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            //disabled={disabledSeats}
            disabled={disabledIndex.includes(index)}


          >
            {pair[1]}
          </button>
        </div>
      ))}
    </div>
  );
}
