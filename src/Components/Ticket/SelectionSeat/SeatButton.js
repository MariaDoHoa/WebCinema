import React, { useState } from 'react'

export default function SeatButton({ seatCode, isShow, seatCodeSelect ,isDisabled  }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isSelected, setIsSelected] = useState(false);


  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // const handleClick = () => {
  //   setIsChecked((prevIsChecked) => !prevIsChecked);

  //   const selectedSeats = JSON.parse(sessionStorage.getItem("selectedSeats")) || [];

  //   if (isSelected) {
  //     // Seat is already selected, remove it from the session
  //     const updatedSeats = selectedSeats.filter((code) => code !== seatCode);
  //     sessionStorage.setItem("selectedSeats", JSON.stringify(updatedSeats));
  //     seatCodeSelect(updatedSeats)
  //     setIsSelected(false);

  //   } else {
  //     // Seat is not selected, add it to the session
  //     const updatedSeats = [...selectedSeats, seatCode];
  //     sessionStorage.setItem("selectedSeats", JSON.stringify(updatedSeats));
  //     seatCodeSelect(updatedSeats)
  //     setIsSelected(true);
  //   }


  // };

  // const handleClick = () => {
  //   setIsChecked((prevIsChecked) => !prevIsChecked);

  //   const selectedSeats = JSON.parse(sessionStorage.getItem("selectedSeats")) || [];
  //   const selectedSeatsData = JSON.parse(sessionStorage.getItem("selectedSeatsData")) || { mode: 1, seats: [] };

  //   if (isSelected) {
  //     // Seat is already selected, remove it from the session
  //     const updatedSeats = selectedSeats.filter((code) => code !== seatCode);
  //     sessionStorage.setItem("selectedSeats", JSON.stringify(updatedSeats));
  //     seatCodeSelect(updatedSeats);
  //     setIsSelected(false);

  //     // Remove the seat data from selectedSeatsData object
  //     const updatedSeatsData = {
  //       ...selectedSeatsData,
  //       seats: selectedSeatsData.seats.filter((seatData) => seatData[seatCode] !== true),
  //     };
  //     sessionStorage.setItem("selectedSeatsData", JSON.stringify(updatedSeatsData));
  //   } else {
  //     // Seat is not selected, add it to the session
  //     const updatedSeats = [...selectedSeats, { mode: 1, seatCodes: seatCode }];
  //     sessionStorage.setItem("selectedSeats", JSON.stringify(updatedSeats));
  //     seatCodeSelect(updatedSeats);
  //     setIsSelected(true);

  //     // Add the seat data to selectedSeatsData object with mode and seatCode properties
  //     // const updatedSeatsData = {
  //     //   ...selectedSeatsData,
  //     //   seats: [...selectedSeatsData.seats, { mode: 1, seatCodes:seatCode }],
  //     // };
  //     // sessionStorage.setItem("selectedSeatsData", JSON.stringify(updatedSeatsData));
  //   }
  // };

  const handleClick = () => {
    setIsChecked((prevIsChecked) => !prevIsChecked);

    //ấy danh sách các ghế đã được chọn từ session storage. 
    //Nếu danh sách này không tồn tại (chưa có ghế nào được chọn), thì mặc định là một mảng rỗng.
    const selectedSeats = JSON.parse(sessionStorage.getItem("selectedSeats")) || [];
    const selectedSeatsData = JSON.parse(sessionStorage.getItem("selectedSeatsData")) || { mode: 1, seats: [] };

    if (isSelected) {
      // Chỗ ngồi đã được chọn, xóa nó khỏi session
      const updatedSeats = selectedSeats.filter((code) => code !== seatCode);
      sessionStorage.setItem("selectedSeats", JSON.stringify(updatedSeats));
      seatCodeSelect(updatedSeats);
      setIsSelected(false);

      // Xóa dữ liệu chỗ ngồi khỏi SelectSeatsData
      const updatedSeatsData = {
        ...selectedSeatsData,
        seats: selectedSeatsData.seats.filter((seatData) => seatData.seatCodes !== seatCode),
      };
      sessionStorage.setItem("selectedSeatsData", JSON.stringify(updatedSeatsData));
    } else {
      // Chỗ ngồi chưa được chọn, hãy thêm nó vào session
      const updatedSeats = [...selectedSeats, seatCode];
      sessionStorage.setItem("selectedSeats", JSON.stringify(updatedSeats));
      seatCodeSelect(updatedSeats);
      setIsSelected(true);

      // Kiểm tra xem dữ liệu ghế đã tồn tại trong selectSeatsData chưa
      const existingSeatData = selectedSeatsData.seats.find((seatData) => seatData.seatCodes === seatCode);

      if (existingSeatData) {
        // Dữ liệu chỗ ngồi đã tồn tại, cập nhật mode: 1
        const updatedSeatsData = {
          ...selectedSeatsData,
          seats: selectedSeatsData.seats.map((seatData) =>
            seatData.seatCodes === seatCode ? { ...seatData, mode: 1 } : seatData
          ),
        };
        sessionStorage.setItem("selectedSeatsData", JSON.stringify(updatedSeatsData));
      } else {
        // Dữ liệu chỗ ngồi không tồn tại, thêm nó với chế độ 1
        const updatedSeatsData = {
          ...selectedSeatsData,
          seats: [...selectedSeatsData.seats, { mode: 1, seatCodes: seatCode }],
        };
        sessionStorage.setItem("selectedSeatsData", JSON.stringify(updatedSeatsData));
      }
    }
  }


  const getBackgroundColor = () => {
    if (isChecked) {
      return 'blue'; // màu khi click
    } else if (isHovered) {
      return 'salmon'; //  màu khi hover
    } else {
      return '#009d96'; //  màu default
    }
  };

  return (
    <button
      style={{
        //backgroundColor: getBackgroundColor(),
        backgroundColor: isDisabled ? 'gray' : getBackgroundColor(),
        color: 'white',
        width: '25px',
        visibility: isShow ? '' : 'hidden',
        textAlign: 'center',
        fontSize: '11px',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={isDisabled}

    >
      {seatCode}
    </button>
  );
}
