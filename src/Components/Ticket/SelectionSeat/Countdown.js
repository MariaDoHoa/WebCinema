import React, { useEffect, useState } from 'react';

const Countdown = ({ minutes, onTimeout }) => {
  const initialTime = minutes * 600;
  const [time, setTime] = useState(sessionStorage.getItem('countdownTime') || initialTime);

  useEffect(() => {
    let intervalId;

    const tick = () => {
      setTime((prevTime) => {
        const newTime = prevTime - 1
        sessionStorage.setItem('countdownTime', newTime) // Lưu thời gian cập nhật vào localStorage
        return newTime
      })
    }

  // Bắt đầu coutdown khi component chạy
    intervalId = setInterval(tick, 1000);

    // Chức năng dọn dẹp để xóa khoảng thời gian khi thành phần ngắt kết nối
    return () => {
      clearInterval(intervalId);
    }
  }, [])

  useEffect(() => {
    // Kiểm tra xem thời gian đã về 0 chưa
    if (time <= 0) {
      onTimeout();
    }
  }, [time, onTimeout]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  return (
    <div>
      <h1>Thời gian còn lại {formatTime(time)}</h1>
    </div>
  )
}

export default Countdown;
