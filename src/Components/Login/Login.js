import React, { useEffect, useState } from 'react'
import "./Login.scss"
import { Link, useNavigate } from 'react-router-dom'
import Popup from '../Popup/Popup'


export default function Login(props) {
    const nav = useNavigate()
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const Submit = () => {
        if (Email == "") {
            setEmailError("Vui lòng nhập Email")
            return
        }
        else {
            setEmailError("")
            if (Password == "") {
                setPasswordError("Vui lòng nhập Password")
                return
            }
            else {
                setPasswordError("")
            }
        }
        const requesLogin = {
            Email: Email,
            Password: Password
        }
        fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/user/Login", {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(requesLogin)
        }).then(res => {
            if (res.status === 200) {
                localStorage.setItem("Email", Email)
                //nav("/")
                //handle cho việc đăng nhập ở doạn nào 
                const Ticket = sessionStorage.getItem("Ticket")
                if (!Ticket) {
                    nav("/")
                }
                else {
                    nav("/selectionticket")
                }
            }
            else {
                setShowPopup(true);
            }
        })

    }
    const handleClosePopup = () => {
        setShowPopup(false);
    };
    return (
        <div className='Login'>
            <div className='Container'>
                <div className='tab'>
                    <div className='tab1'>
                        <Link to={"/login"} style={{ color: "salmon" }}>Đăng Nhập</Link>
                    </div>
                    <div className='tab2'>
                        <Link to={"/register"} style={{ color: "white" }}>Đăng Ký</Link>
                    </div>
                </div>
                <div className='Content'>
                    <p>Vui lòng đăng nhập trước khi mua vé để tích luỹ điểm, cơ hội nhận thêm nhiều ưu đãi từ chương trình thành viên Cinema.</p>
                    <input
                        value={Email}
                        onChange={(event) => { setEmail(event.target.value) }}
                        className='ip1'
                        placeholder='Email'
                        type='text' /><br />
                    {emailError && <span className="error" id="EmailError">{emailError}</span>}
                    <input
                        value={Password}
                        onChange={(event) => { setPassword(event.target.value) }}
                        className='ip2'
                        placeholder='Mật Khẩu'
                        type='password' /><br />
                    {passwordError && <span className="error" id="PasswordError">{passwordError}</span>}
                    <button onClick={Submit}>Đăng Nhập</button>
                </div>
                {showPopup && <Popup noti="Email hoặc password không đúng" onClose={handleClosePopup} />}
            </div>
        </div>
    )
}


